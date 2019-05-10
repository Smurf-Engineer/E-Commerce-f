/**
 * Admin Screen - Created by eduardoquintero on 28/03/19.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import queryString from 'query-string'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import { RouteComponentProps } from 'react-router-dom'
import {
  restoreUserSession,
  saveUserSession
} from '../../components/MainLayout/api'
import { Login } from './Login'
import logo from '../../assets/jakroo_logo.svg'
import AdminLayout from '../../components/AdminLayout'
import ProductCatalog from '../../components/ProductCatalog'
import OrderHistoryAdmin from '../../components/OrderHistoryAdmin'
// import Menu from 'antd/lib/menu'
import message from 'antd/lib/message'
import * as adminActions from './actions'
import messages from './messages'
import { mailLogin } from './data'
import { ORDER_STATUS, PRODUCT_CATALOG } from './constants'
// import red_logo from '../../assets/Jackroologo.svg'

import {
  AdminContainer,
  Header,
  ContentHeader,
  LogoIcon,
  DesignerLink,
  Content,
  LoadingContainer
} from './styledComponents'
import { UserType } from '../../types/common'

// const { SubMenu } = Menu

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  screen: string
  defaultScreen: string
  user: UserType
  history: any
  loading: boolean
  client: any
  forgotPasswordOpen: boolean
  // Redux actions
  logoutAction: () => void
  setDefaultScreenAction: (screen: string, openCreations?: boolean) => void
  setCurrentScreenAction: (screen: string) => void
  clearReducerAction: () => void
  restoreUserSessionAction: () => void
  saveUserSessionAction: (user: object) => void
  requestClose: () => void
  loginWithEmail: (variables: {}) => void
  setLoadingAction: (loading: boolean) => void
  openForgotPasswordAction: () => void
}

export class Admin extends React.Component<Props, {}> {
  componentDidMount() {
    const { setLoadingAction } = this.props
    setLoadingAction(false)
  }
  componentWillUnmount() {
    const { clearReducerAction } = this.props
    clearReducerAction()
  }

  componentWillMount() {
    const {
      user,
      setDefaultScreenAction,
      location: { search }
    } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSessionAction } = this.props
      restoreUserSessionAction()
      setDefaultScreenAction(ORDER_STATUS)
    }
    const queryParams = queryString.parse(search)
    const { option } = queryParams
    if (option) {
      setDefaultScreenAction(option)
      return
    }
    setDefaultScreenAction(ORDER_STATUS)
  }

  onLogout = () => {
    const {
      logoutAction: logout,
      client: { cache }
    } = this.props
    cache.reset()
    logout()
    window.location.replace('/')
  }
  login = async (user: any) => {
    await saveUserSession(user)
  }

  getScreenComponent = (screen: string) => {
    const {
      intl: { formatMessage },
      user,
      openForgotPasswordAction,
      intl,
      history,
      loading,
      forgotPasswordOpen
    } = this.props
    if (loading) {
      return (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      )
    }
    if (!user || !user.administrator) {
      return (
        <Content>
          <Login
            {...{ formatMessage, forgotPasswordOpen, loading }}
            login={this.handleLogin}
            loginWithEmail={this.handleMailLogin}
            handleOpenForgotPassword={openForgotPasswordAction}
          />
        </Content>
      )
    }
    let currentScreen
    switch (screen) {
      case ORDER_STATUS:
        currentScreen = <OrderHistoryAdmin {...{ history, formatMessage }} />
        break
      case PRODUCT_CATALOG:
        currentScreen = <ProductCatalog {...{ history, formatMessage }} />
        break
      default:
        break
    }
    return <AdminLayout {...{ history, intl }}>{currentScreen}</AdminLayout>
  }
  handleLogin = (userData: any) => {
    const { saveUserSessionAction, setLoadingAction } = this.props
    saveUserSessionAction(userData)
    setLoadingAction(false)
  }
  handleMailLogin = async (email: string, password: string) => {
    const {
      loginWithEmail,
      intl: { formatMessage },
      saveUserSessionAction,
      setLoadingAction
    } = this.props
    setLoadingAction(true)
    try {
      const loginData = await loginWithEmail({ variables: { email, password } })
      const data = get(loginData, 'data.login', false)
      if (data) {
        const userData = {
          id: get(data, 'user.shortId', ''),
          token: get(data, 'token', ''),
          name: get(data, 'user.name', ''),
          lastName: get(data, 'user.lastName'),
          email: get(data, 'user.email'),
          administrator: get(data, 'user.administrator', false)
        }
        if (data.user.administrator) {
          message.success(
            formatMessage(messages.welcomeMessage, {
              name: get(data, 'user.name', '')
            }),
            5
          )
          saveUserSessionAction(userData)
        } else {
          message.error(formatMessage(messages.forbidden))
        }
      }
      setLoadingAction(false)
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
      setLoadingAction(false)
    }
  }

  render() {
    const { screen } = this.props

    const currentScreen = this.getScreenComponent(screen)
    return (
      <AdminContainer>
        <Header>
          <ContentHeader>
            <LogoIcon src={logo} />
            <DesignerLink>
              <FormattedMessage {...messages.adminTitle} />
            </DesignerLink>
          </ContentHeader>
        </Header>
        {currentScreen}
      </AdminContainer>
    )
  }
}

const mapStateToProps = (state: any) => {
  const admin = state.get('admin').toJS()
  const app = state.get('app').toJS()
  return {
    ...app,
    ...admin
  }
}

const AdminEnhance = compose(
  withApollo,
  injectIntl,
  mailLogin,
  connect(
    mapStateToProps,
    {
      ...adminActions,
      restoreUserSessionAction: restoreUserSession,
      saveUserSessionAction: saveUserSession
    }
  )
)(Admin)

export default AdminEnhance
