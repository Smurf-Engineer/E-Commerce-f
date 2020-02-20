/**
 * DesignSearch Screen - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import { withApollo, compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import queryString from 'query-string'
import GoogleFontLoader from 'react-google-font-loader'
import message from 'antd/lib/message'
import Search from 'antd/lib/auto-complete'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import { SelectValue } from 'antd/lib/select'
import Spin from 'antd/lib/spin'
import * as designSearchActions from './actions'
import { restoreUserSession } from '../MainLayout/api'
import messages from './messages'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { uploadProDesign } from './api'
import {
  Container,
  Content,
  Title,
  Subtitle,
  LoadErrContainer
} from './styledComponents'
import OrderFiles from './OrderFiles'
import {
  OrderSearchResult,
  UserType,
  StitchingColor,
  Font,
  DesignSearchCode,
  MessagePayload
} from '../../types/common'
import {
  orderSearchQuery,
  uploadThumbnailMutation,
  updateDesignMutation,
  getDesignSearchCode,
  getFonts,
  generatePdfMutation,
  addNoteMutation
} from './data'
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
  colorAccessories: any
  stitchingValue: string
  fontsData: any
  designSearchCodes: string[]
  creatingPdf: boolean
  openNotes: boolean
  addingNote: boolean
  note: string
  // redux actions
  addNoteAction: (variables: {}) => Promise<MessagePayload>
  setNoteAction: (text: string) => void
  openNoteAction: (openNotes: boolean) => void
  setLoadingNote: (loading: boolean) => void
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
  setStitchingColorAction: (stitchingColor: StitchingColor) => void
  setColorAction: (color: string, id: string) => void
  updateDesign: (variables: {}) => Promise<Thumbnail>
  generatePdf: (variables: {}) => Promise<MessagePayload>
  resetChangesAction: () => void
  setSearchCodesAction: (codes: DesignSearchCode) => void
  creatingPdfAction: (creating: boolean) => void
  setPdfAction: (url: string) => void
}

export class DesignSearchAdmin extends React.Component<Props, {}> {
  debounceSearchCode = debounce(value => this.handleOnchange(value), 300)
  componentWillMount() {
    const { user } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSessionAction } = this.props
      restoreUserSessionAction()
    }
  }
  componentDidMount() {
    const {
      history: {
        location: { search }
      }
    } = this.props
    const queryParams = queryString.parse(search)
    const { code } = queryParams
    if (code) {
      this.handleOnSearch(code)
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
      changes,
      setStitchingColorAction,
      colorAccessories,
      openNotes,
      addingNote,
      note,
      setNoteAction,
      openNoteAction,
      setColorAction,
      fontsData,
      designSearchCodes,
      creatingPdf
    } = this.props

    let loadErrContent = <Spin />
    if (notFound) {
      loadErrContent = <FormattedMessage {...messages.notFound} />
    } else if (noAdmin) {
      loadErrContent = <FormattedMessage {...messages.unauthorized} />
    }
    const fontList = get(fontsData, 'fonts', [])

    const fonts = fontList.reduce((fontObject: any, { family }: Font) => {
      fontObject.push({ font: family })
      return fontObject
      // tslint:disable-next-line: align
    }, [])
    const orderContent = order && (
      <OrderFiles
        {...{
          order,
          uploadingFile,
          actualSvg,
          uploadingThumbnail,
          setUploadingThumbnailAction,
          changes,
          openNotes,
          addingNote,
          note,
          setNoteAction,
          openNoteAction,
          colorAccessories,
          creatingPdf
        }}
        handleSaveNote={this.saveNote}
        onSelectStitchingColor={setStitchingColorAction}
        onSelectColor={setColorAction}
        formatMessage={formatMessage}
        downloadFile={this.downloadAllFiles}
        onUploadFile={uploadProDesignAction}
        onSaveThumbnail={this.saveDesign}
        onGeneratePdf={this.handleGeneratePdf}
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
        {fonts.length ? <GoogleFontLoader {...{ fonts }} /> : null}
        <Content>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Subtitle>
            <FormattedMessage {...messages.addCode} />
          </Subtitle>
          <Search
            placeholder="Product Code"
            onChange={this.debounceSearchCode}
            size="large"
            dataSource={designSearchCodes}
            onSelect={this.handleOnSearch}
          >
            <Input
              suffix={
                <Button className="search-btn" size="large" type="primary">
                  <Icon type="search" />
                </Button>
              }
            />
          </Search>
          {content}
        </Content>
      </Container>
    )
  }

  saveNote = async () => {
    const {
      addNoteAction,
      note,
      order: { shortId, code },
      setLoadingNote
    } = this.props
    try {
      setLoadingNote(true)
      const response = await addNoteAction({
        variables: {
          designId: shortId,
          text: note
        }
      })
      this.handleOnSearch(code)
      message.success(get(response, 'data.addDesignNote.message', ''))
    } catch (e) {
      setLoadingNote(false)
      message.error(e.message)
    }
  }

  goToDesignerTool = () => {
    const { history } = this.props
    history.push('designer-tool')
  }

  handleOnSearch = async (productCode: SelectValue) => {
    const code = productCode.toString().trim()
    const {
      client: { query },
      setLoadingAction,
      setNotFoundAction,
      setOrderAction,
      resetDataAction
    } = this.props
    resetDataAction()
    setLoadingAction()
    try {
      const { data } = await query({
        query: orderSearchQuery,
        variables: { code },
        fetchPolicy: 'network-only'
      })
      setOrderAction(data.order)
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
  saveDesign = async (image: string) => {
    const {
      uploadThumbnail,
      setUploadingThumbnailAction,
      order,
      actualSvg,
      colorAccessories,
      updateDesign,
      resetChangesAction
    } = this.props
    try {
      const thumbnailResponse = await uploadThumbnail({
        variables: { image }
      })
      const thumbnail = get(thumbnailResponse, 'data.style.image', '')
      setUploadingThumbnailAction(false)

      await updateDesign({
        variables: {
          code: get(order, 'code'),
          accessories: colorAccessories,
          svg: actualSvg,
          thumbnail
        }
      })
      resetChangesAction()
      message.success('Design has been successfully saved!')
    } catch (e) {
      setUploadingThumbnailAction(false)
      message.error(e.message)
    }
  }

  handleOnchange = async (value: SelectValue) => {
    const {
      client: { query },
      setSearchCodesAction
    } = this.props
    try {
      const parsedValue = value.toString()
      if (parsedValue.length > 4) {
        const { data } = await query({
          query: getDesignSearchCode,
          variables: { pattern: parsedValue.trim() },
          fetchPolicy: 'network-only'
        })

        const searchCodes = data.getDesignSearchCode.map(
          (item: DesignSearchCode) => item.code
        )
        setSearchCodesAction(searchCodes)
      }
    } catch (error) {
      Message.error(error.message)
    }
  }

  handleGeneratePdf = async () => {
    const { order, generatePdf, creatingPdfAction, setPdfAction } = this.props
    try {
      creatingPdfAction(true)
      const pdf = await generatePdf({
        variables: {
          code: get(order, 'code')
        }
      })
      const url = get(pdf, 'data.generatePdf.message')
      const a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.download = url
      a.click()
      setPdfAction(url)
      creatingPdfAction(false)
    } catch (error) {
      creatingPdfAction(false)
      Message.error(error.message)
    }
  }
}

const mapStateToProps = (state: any) => {
  const designSearch = state.get('designSearchAdmin').toJS()
  const app = state.get('app').toJS()
  return { ...designSearch, ...app }
}

const DesignSearchAdminEnhance = compose(
  injectIntl,
  graphql(addNoteMutation, { name: 'addNoteAction' }),
  graphql(uploadThumbnailMutation, { name: 'uploadThumbnail' }),
  graphql(updateDesignMutation, { name: 'updateDesign' }),
  graphql(generatePdfMutation, { name: 'generatePdf' }),
  connect(mapStateToProps, {
    ...designSearchActions,
    uploadProDesignAction: uploadProDesign,
    restoreUserSessionAction: restoreUserSession
  }),
  getFonts,
  withApollo
)(DesignSearchAdmin)

export default DesignSearchAdminEnhance
