/**
 * Admin Screen - Created by eduardoquintero on 28/03/19.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { RouteComponentProps } from 'react-router-dom'
import {
  restoreUserSession,
  saveUserSession
} from '../../components/MainLayout/api'
import { Login } from './Login'
import logo from '../../assets/jakroo_logo.svg'

// import Menu from 'antd/lib/menu'
import message from 'antd/lib/message'
import * as adminActions from './actions'
import messages from './messages'
import { mailLogin } from './data'
import { OVERVIEW } from './constants'
// import red_logo from '../../assets/Jackroologo.svg'

import {
  Container,
  Header,
  ContentHeader,
  LogoIcon,
  DesignerLink,
  Content
} from './styledComponents'
import { UserType } from '../../types/common'

// const { SubMenu } = Menu

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  screen: string
  defaultScreen: string
  user: UserType
  // Redux actions
  logoutAction: () => void
  setDefaultScreenAction: (screen: string, openCreations?: boolean) => void
  setCurrentScreenAction: (screen: string) => void
  clearReducerAction: () => void
  restoreUserSessionAction: () => void
  saveUserSessionAction: (user: object) => void
  requestClose: () => void
  loginWithEmail: (variables: {}) => void
}

export class Admin extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { clearReducerAction } = this.props
    clearReducerAction()
  }

  componentWillMount() {
    const { user, setDefaultScreenAction } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSessionAction } = this.props
      restoreUserSessionAction()
      setDefaultScreenAction(OVERVIEW)
    }
  }

  handleOnGoToScreen = (screen: string) => {
    const { setCurrentScreenAction } = this.props
    setCurrentScreenAction(screen)
  }

  handleOpenSidebar = () => {
    const { openSidebar, openSidebarMobile } = this.props
    openSidebarMobile(!openSidebar)
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
      saveUserSessionAction
    } = this.props
    if (!user) {
      return (
        <Login
          {...{ formatMessage }}
          login={saveUserSessionAction}
          loginWithEmail={this.handleMailLogin}
        />
      )
    }
    if (!user.administrator) {
      return null
    }
    switch (screen) {
      case OVERVIEW:
        return <p>Hello</p>
      default:
        return null
    }
  }
  handleMailLogin = async (email: string, password: string) => {
    const {
      loginWithEmail,
      intl: { formatMessage },
      saveUserSessionAction
    } = this.props
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
        message.success(
          formatMessage(messages.welcomeMessage, {
            name: get(data, 'user.name', '')
          }),
          5
        )
        saveUserSessionAction(userData)
      }
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    }
  }

  render() {
    const { screen } = this.props

    const currentScreen = this.getScreenComponent(screen)

    return (
      <Container>
        <Header>
          <ContentHeader>
            <LogoIcon src={logo} />
            <DesignerLink>
              <FormattedMessage {...messages.adminTitle} />
            </DesignerLink>
          </ContentHeader>
        </Header>
        <Content>{currentScreen}</Content>
      </Container>
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
