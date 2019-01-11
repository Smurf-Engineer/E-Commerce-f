/**
 * DesignSearch Screen - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import { withApollo, compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import message from 'antd/lib/message'
import Search from 'antd/lib/input/Search'
import Spin from 'antd/lib/spin'
import * as designSearchActions from './actions'
import { restoreUserSession } from '../../components/MainLayout/api'
import messages from './messages'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { uploadProDesign } from './api'
import {
  Container,
  Header,
  LogoIcon,
  DesignerLink,
  Content,
  Title,
  ContentHeader,
  Subtitle,
  LoadErrContainer
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import OrderFiles from './OrderFiles'
import { OrderSearchResult, UserType } from '../../types/common'
import { orderSearchQuery, uploadThumbnailMutation } from './data'
import { downloadFile } from './api'
import Message from 'antd/lib/message'

type Thumbnail = {
  style: {
    image: string
  }
}

interface Props {
  history: any
  client: any
  loading: boolean
  order?: OrderSearchResult
  notFound: boolean
  noAdmin?: boolean
  user: UserType
  intl: InjectedIntl
  uploadingFile: boolean
  actualSvg: string
  uploadingThumbnail: boolean
  data: any
  changes: boolean
  // redux actions
  uploadFileSuccessAction: (url: string) => void
  uploadFileSuccessFailure: () => void
  restoreUserSessionAction: () => void
  formatMessage: (messageDescriptor: any) => string
  uploadProDesignAction: (file: any, code: string) => void
  resetDataAction: () => void
  setLoadingAction: () => void
  setNotFoundAction: (admin?: boolean) => void
  setOrderAction: (order: OrderSearchResult) => void
  uploadThumbnail: (variables: {}) => Promise<Thumbnail>
  setUploadingThumbnailAction: (uploading: boolean) => void
  updateThumbnailAction: (thumbnail: string) => void
}

export class DesignSearch extends React.Component<Props, {}> {
  componentWillMount() {
    const { user } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSessionAction } = this.props
      restoreUserSessionAction()
    }
  }

  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const {
      loading,
      notFound,
      order,
      noAdmin,
      uploadProDesignAction,
      uploadingFile,
      intl: { formatMessage },
      actualSvg,
      uploadingThumbnail,
      setUploadingThumbnailAction,
      changes
    } = this.props

    let loadErrContent = <Spin />
    if (notFound) {
      loadErrContent = <FormattedMessage {...messages.notFound} />
    } else if (noAdmin) {
      loadErrContent = <FormattedMessage {...messages.unauthorized} />
    }
    const orderContent = order && (
      <OrderFiles
        {...{
          order,
          uploadingFile,
          actualSvg,
          uploadingThumbnail,
          setUploadingThumbnailAction,
          changes
        }}
        formatMessage={formatMessage}
        downloadFile={this.downloadAllFiles}
        onUploadFile={uploadProDesignAction}
        onSaveThumbnail={this.handleUploadThumbnail}
      />
    )
    const content =
      loading || notFound || noAdmin ? (
        <LoadErrContainer>{loadErrContent}</LoadErrContainer>
      ) : (
        orderContent
      )
    return (
      <Container>
        <Header>
          <ContentHeader>
            <LogoIcon src={logo} />
            <DesignerLink onClick={this.goToDesignerTool}>
              <FormattedMessage {...messages.designerTool} />
            </DesignerLink>
          </ContentHeader>
        </Header>
        <Content>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Subtitle>
            <FormattedMessage {...messages.addCode} />
          </Subtitle>
          <Search
            placeholder="Product Code"
            onSearch={this.handleOnSearch}
            enterButton={true}
            size="large"
          />
          {content}
        </Content>
      </Container>
    )
  }

  goToDesignerTool = () => {
    const { history } = this.props
    history.push('designer-tool')
  }

  handleOnSearch = async (productCode: string) => {
    const code = productCode.trim()
    const {
      client: { query },
      setLoadingAction,
      setNotFoundAction,
      setOrderAction
    } = this.props

    setLoadingAction()
    try {
      const data = await query({
        query: orderSearchQuery,
        variables: { code },
        fetchPolicy: 'network-only'
      })
      setOrderAction(data.data.order)
    } catch (error) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors.map((x: any) => x.message)) ||
        error.message

      const unauthorizedExp = /\bunauthorized\b/
      const unauthorized = unauthorizedExp.test(errorMessage)

      setNotFoundAction(unauthorized)
    }
  }

  downloadAllFiles = async (code: string) => {
    try {
      const { user } = this.props
      const blobFile = await downloadFile(user, code)
      const url = window.URL.createObjectURL(blobFile)
      const a = document.createElement('a')
      a.href = url
      a.download = `${code}.zip`
      a.click()
    } catch (e) {
      Message.error(messages.errorDownload.defaultMessage)
    }
  }
  handleUploadThumbnail = async (image: string) => {
    const {
      uploadThumbnail,
      setUploadingThumbnailAction,
      updateThumbnailAction
    } = this.props
    try {
      const thumbnailResponse = await uploadThumbnail({
        variables: { image }
      })
      const thumbnail = get(thumbnailResponse, 'data.style.image', '')
      updateThumbnailAction(thumbnail)
      message.success('Your thumbnail has been successfully saved!')
      setUploadingThumbnailAction(false)
    } catch (e) {
      setUploadingThumbnailAction(false)
      message.error(e.message)
    }
  }
}

const mapStateToProps = (state: any) => {
  const designSearch = state.get('designSearch').toJS()
  const app = state.get('app').toJS()
  return { ...designSearch, ...app }
}

const DesignSearchEnhance = compose(
  injectIntl,
  graphql(uploadThumbnailMutation, { name: 'uploadThumbnail' }),
  connect(
    mapStateToProps,
    {
      ...designSearchActions,
      uploadProDesignAction: uploadProDesign,
      restoreUserSessionAction: restoreUserSession
    }
  ),
  withApollo
)(DesignSearch)

export default DesignSearchEnhance
