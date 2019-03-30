/**
 * Admin Screen - Created by eduardoquintero on 28/03/19.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { restoreUserSession } from '../../components/MainLayout/api'
import { Login } from './Login'
import logo from '../../assets/jakroo_logo.svg'
// import Menu from 'antd/lib/menu'
import * as adminActions from './actions'
import messages from './messages'
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

  getScreenComponent = (screen: string) => {
    const {
      intl: { formatMessage },
      user
    } = this.props
    if (!user) {
      return <Login formatMessage={formatMessage} />
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
  connect(
    mapStateToProps,
    { ...adminActions, restoreUserSessionAction: restoreUserSession }
  )
)(Admin)

export default AdminEnhance
