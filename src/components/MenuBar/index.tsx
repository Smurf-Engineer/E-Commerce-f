/**
 * MenuBar Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage, InjectedIntl } from 'react-intl'
import MediaQuery from 'react-responsive'

import DropdownList from '../DropdownList'
import MenuSupport from '../MenuSupport'
import MenuRegion from '../MenuRegion'
import MenuMobile from '../MenuBarMobile'
import {
  Container,
  TopText,
  Row,
  Divider,
  TopRow,
  BottomRow,
  LogoIcon,
  TeamStoresMenuContainer,
  TeamStoresMenuTitle
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import messages from './messages'
import SearchBar from '../SearchBar'
import Login from '../Login'
import Logout from '../Logout'
import ForgotPassword from '../ForgotPassword'
import Cart from '../CartForHeader'
import { RegionConfig } from '../../types/common'

interface Props {
  history: any
  searchFunc: (param: string) => void
  openLogin?: boolean
  openLoginAction: (open: boolean) => void
  onChangeLocation: (payload: RegionConfig) => void
  saveUserToLocal: (user: object) => void
  logoutAction: () => void
  currentRegion: number
  currentLanguage: number
  currentCurrency: number
  intl: InjectedIntl
  hideBottom?: boolean
  fakeWidth: number
  teamStoresHeader?: boolean | undefined
  itemsInCart: number
  designHasChanges: boolean
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
}

interface StateProps {
  openForgotPassword: boolean
  isMobile: boolean
}

class MenuBar extends React.Component<Props, StateProps> {
  static defaultProps = {
    hideBottom: false
  }
  state = {
    openForgotPassword: false,
    isMobile: false
  }

  componentDidMount() {
    const isMobile = window.matchMedia(
      '(min-width: 320px) and (max-width: 480px)'
    ).matches
    this.setState({ isMobile })
  }

  handleOnGoHome = () => {
    const { history } = this.props
    history.replace('/us?lang=en&currency=usd')
  }

  handleGoTo = (path: string) => {
    this.handleOnGoTo(path)
  }

  handleOnGoTo = (route: string) => {
    const {
      history: { location, push },
      designHasChanges,
      openWithoutSaveModalAction
    } = this.props
    if (
      (location.pathname as String).includes('design-center') &&
      designHasChanges
    ) {
      openWithoutSaveModalAction(true, route)
      return
    }
    push(route)
  }

  render() {
    const { openForgotPassword, isMobile } = this.state
    const {
      history,
      searchFunc,
      openLogin,
      onChangeLocation,
      currentRegion,
      currentLanguage,
      currentCurrency,
      hideBottom,
      intl,
      logoutAction,
      saveUserToLocal,
      fakeWidth,
      teamStoresHeader,
      itemsInCart,
      designHasChanges,
      openWithoutSaveModalAction
    } = this.props
    let user: any
    if (typeof window !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user') as string)
    }

    const loggedUser = !user ? (
      <TopText onClick={this.handleOpenLogin}>
        <FormattedMessage {...messages.title} />
      </TopText>
    ) : (
      <Logout
        {...{ history }}
        title={`${String(user.name).toUpperCase()}`}
        logout={logoutAction}
        goTo={this.handleOnGoTo}
      />
    )

    const menuRegion = (
      <MenuRegion
        {...{
          onChangeLocation,
          currentRegion,
          currentLanguage,
          currentCurrency,
          isMobile
        }}
      />
    )

    const { formatMessage } = intl

    const bottomRowContent = teamStoresHeader ? (
      <BottomRow>
        <LogoIcon src={logo} onClick={this.handleOnGoHome} />
        <TeamStoresMenuContainer>
          <TeamStoresMenuTitle onClick={this.gotoTeamStores}>
            {formatMessage(messages.teamStoresTitle)}
          </TeamStoresMenuTitle>
        </TeamStoresMenuContainer>
        <div />
      </BottomRow>
    ) : (
      <BottomRow>
        <LogoIcon src={logo} onClick={this.handleOnGoHome} />
        <DropdownList {...{ history, formatMessage }} />
        <SearchBar search={searchFunc} onHeader={true} {...{ formatMessage }} />
      </BottomRow>
    )

    return (
      <div>
        <MediaQuery
          minWidth={992}
          values={{ width: fakeWidth, deviceWidth: fakeWidth }}
        >
          {matches => {
            if (matches) {
              return (
                <Container>
                  <Row>
                    <MenuSupport
                      {...{
                        designHasChanges,
                        openWithoutSaveModalAction
                      }}
                    />
                    <TopRow>
                      {menuRegion}
                      <Cart
                        totalItems={itemsInCart}
                        {...{
                          history,
                          designHasChanges,
                          openWithoutSaveModalAction
                        }}
                      />
                      {loggedUser}
                    </TopRow>
                  </Row>
                  <Divider />
                  {!hideBottom && bottomRowContent}
                </Container>
              )
            } else {
              return (
                <MenuMobile
                  {...{
                    history,
                    designHasChanges,
                    openWithoutSaveModalAction,
                    formatMessage
                  }}
                  totalItems={itemsInCart}
                  loginButton={loggedUser}
                  regionButton={menuRegion}
                />
              )
            }
          }}
        </MediaQuery>
        <Login
          open={openLogin}
          requestClose={this.handleCloseLogin}
          handleForgotPassword={this.handleOpenForgotPassword}
          login={saveUserToLocal}
          {...{ formatMessage }}
        />
        <ForgotPassword
          open={openForgotPassword}
          requestClose={this.handleOpenForgotPassword}
          openLogin={this.handleOpenLogin}
          {...{ formatMessage }}
        />
      </div>
    )
  }

  gotoTeamStores = () => {
    const { history } = this.props
    history.push('/search-teamstores')
  }

  handleOpenLogin = () => {
    const { openLoginAction } = this.props
    openLoginAction(true)
  }

  handleCloseLogin = () => {
    const { openLoginAction } = this.props
    openLoginAction(false)
  }
  handleOpenForgotPassword = () => {
    this.handleCloseLogin()
    const { openForgotPassword } = this.state
    this.setState({ openForgotPassword: !openForgotPassword })
  }
}

export default MenuBar
