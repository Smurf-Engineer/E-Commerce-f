/**
 * DesignSearch Screen - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Search from 'antd/lib/input/Search'
import Spin from 'antd/lib/spin'
import * as designSearchActions from './actions'
import { restoreUserSession } from '../../components/MainLayout/api'
import messages from './messages'
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
import { orderSearchQuery } from './data'
import config from '../../config/index'

interface Props {
  history: any
  client: any
  loading: boolean
  order?: OrderSearchResult
  notFound: boolean
  user: UserType
  // redux actions
  restoreUserSessionAction: () => void
  resetDataAction: () => void
  setLoadingAction: () => void
  setNotFoundAction: () => void
  setOrderAction: (order: OrderSearchResult) => void
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
    const { loading, notFound, order } = this.props

    let loadErrContent = <Spin />
    if (notFound) {
      loadErrContent = <FormattedMessage {...messages.notFound} />
    }
    const orderContent = order && (
      <OrderFiles {...{ order }} downloadFile={this.downloadFile} />
    )
    const content =
      loading || notFound ? (
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

  handleOnSearch = async (code: string) => {
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
    } catch (e) {
      setNotFoundAction()
    }
  }

  downloadFile = async (code: string) => {
    const { user } = this.props
    const fileResponse = await fetch(
      `${config.graphqlUriBase}design-files?designCode=${code}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    const blobFile = await fileResponse.blob()
    console.log(blobFile)
    const url = window.URL.createObjectURL(blobFile)
    const a = document.createElement('a')
    a.href = url
    a.download = `${code}.zip`
    a.click()
  }
}

const mapStateToProps = (state: any) => {
  const designSearch = state.get('designSearch').toJS()
  const app = state.get('app').toJS()
  return { ...designSearch, ...app }
}

const DesignSearchEnhance = compose(
  connect(
    mapStateToProps,
    { ...designSearchActions, restoreUserSessionAction: restoreUserSession }
  ),
  withApollo
)(DesignSearch)

export default DesignSearchEnhance
