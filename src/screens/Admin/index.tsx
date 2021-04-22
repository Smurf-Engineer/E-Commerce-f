/**
 * Admin Screen - Created by eduardoquintero on 28/03/19.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import { RouteComponentProps, Route } from 'react-router-dom'
import {
  restoreUserSession,
  saveUserSession,
  deleteUserSession,
} from '../../components/MainLayout/api'
import { Login } from './Login'
import { MAIN_TITLE } from '../../constants'
import logo from '../../assets/jakroo_logo.svg'
import AdminLayout from '../../components/AdminLayout'
import ProductCatalog from '../../components/ProductCatalog'
import ProductInternalsAdmin from '../../components/ProductInternalsAdmin'
import OrderHistoryAdmin from '../../components/OrderHistoryAdmin'
import UsersAdmin from '../../components/UsersAdmin'
import RoleList from '../../components/RoleList'
import SalesRep from '../../components/SalesRep'
import Affiliates from '../../components/Affiliates'
import AffiliatesPayouts from '../../components/AffiliatesPayouts'
import ResellerPayouts from '../../components/ResellerPayouts'
import Resellers from '../../components/Resellers'
import TeamStoresAdmin from '../../components/TeamStoresAdmin'
import HomepageAdmin from '../../components/HomepageAdmin'
import DesignLabAdmin from '../../components/DesignLabAdmin'
import DiscountsAdmin from '../../components/DiscountsAdmin'
import DesignSearchAdmin from '../../components/DesignSearch'
import EditNavigationAdmin from '../../components/EditNavigationAdmin'
import Notifications from '../../components/Notifications'
import ProAssist from '../../components/ProAssist'

// import Menu from 'antd/lib/menu'
import message from 'antd/lib/message'
import * as adminActions from './actions'
import messages from './messages'
import { mailLogin } from './data'
import { keys } from './constants'
// import red_logo from '../../assets/Jackroologo.svg'

import {
  AdminContainer,
  Header,
  ContentHeader,
  LogoIcon,
  DesignerLink,
  Content,
  LoadingContainer,
} from './styledComponents'
import { UserType } from '../../types/common'
import Helmet from 'react-helmet'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'

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
  setDefaultScreenAction: (screen: string, openCreations?: boolean) => void
  setCurrentScreenAction: (screen: string) => void
  clearReducerAction: () => void
  restoreUserSessionAction: (client: any) => void
  saveUserSessionAction: (user: object, client: any) => void
  deleteUserSessionAction: () => void
  requestClose: () => void
  loginWithEmail: (variables: {}) => void
  setLoadingAction: (loading: boolean) => void
  openForgotPasswordAction: () => void
  setNotificationsPageAction: (page: number) => void
}

export class Admin extends React.Component<Props, {}> {
  componentDidMount() {
    const { setLoadingAction } = this.props
    LoadScripts(threeDScripts)
    setLoadingAction(false)
  }

  componentWillMount() {
    const {
      user,
      client,
      setDefaultScreenAction,
      location: { pathname },
    } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSessionAction } = this.props
      restoreUserSessionAction(client)
      setDefaultScreenAction(keys[pathname])
    }
  }

  onLogout = () => {
    const {
      client: { cache },
      deleteUserSessionAction,
    } = this.props
    cache.reset()
    deleteUserSessionAction()
  }
  login = async (user: any) => {
    const { client } = this.props
    await saveUserSession(user, client)
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
          <Helmet defaultTitle={MAIN_TITLE} />
          <Login
            {...{ formatMessage, forgotPasswordOpen, loading }}
            login={this.handleLogin}
            loginWithEmail={this.handleMailLogin}
            handleOpenForgotPassword={openForgotPasswordAction}
          />
        </Content>
      )
    }
    const { permissions = {} } = user
    return (
      <AdminLayout
        {...{ history, intl, permissions }}
        onLogout={this.onLogout}
        screen={screen}
      >
        <Route
          exact={true}
          path="/admin"
          render={() => (
            <Notifications
              fromAdmin={true}
              {...{ history, formatMessage, permissions }}
            />
          )}
        />
        <Route
          exact={true}
          path="/admin/orders"
          render={() => (
            <OrderHistoryAdmin {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          exact={true}
          path="/admin/discounts"
          render={() => (
            <DiscountsAdmin {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          exact={true}
          path="/admin/pro-assist"
          render={() => (
            <ProAssist {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path={['/admin/products', '/admin/product']}
          render={() => (
            <ProductCatalog {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/products-internal"
          render={() => (
            <ProductInternalsAdmin
              {...{ history, formatMessage, permissions }}
            />
          )}
        />
        <Route
          path="/admin/design-lab"
          render={() => (
            <DesignLabAdmin {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/design-search"
          render={() => (
            <DesignSearchAdmin {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/edit-navigation"
          render={() => <EditNavigationAdmin {...{ history, permissions }} />}
        />
        <Route
          path="/admin/users"
          render={() => (
            <UsersAdmin {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/roles"
          render={() => (
            <RoleList {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/reps"
          render={() => (
            <SalesRep {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/reseller-payouts"
          render={() => (
            <ResellerPayouts {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/reseller-orders"
          render={() => (
            <Resellers {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/affiliates-payouts"
          render={() => (
            <AffiliatesPayouts {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/affiliates"
          render={() => (
            <Affiliates {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/team-stores"
          render={() => (
            <TeamStoresAdmin {...{ history, formatMessage, permissions }} />
          )}
        />
        <Route
          path="/admin/homepage/:sportName?"
          render={() => (
            <HomepageAdmin {...{ history, formatMessage, permissions }} />
          )}
        />
      </AdminLayout>
    )
  }
  handleLogin = (userData: any) => {
    const { saveUserSessionAction, setLoadingAction, client } = this.props
    saveUserSessionAction(userData, client)
    setLoadingAction(false)
  }
  handleMailLogin = async (email: string, password: string) => {
    const {
      loginWithEmail,
      client,
      intl: { formatMessage },
      saveUserSessionAction,
      setLoadingAction,
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
          administrator: get(data, 'user.administrator', false),
        }
        if (data.user.administrator) {
          message.success(
            formatMessage(messages.welcomeMessage, {
              name: get(data, 'user.name', ''),
            }),
            5
          )
          saveUserSessionAction(userData, client)
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
    ...admin,
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
      saveUserSessionAction: saveUserSession,
      deleteUserSessionAction: deleteUserSession,
    }
  )
)(Admin)

export default AdminEnhance
