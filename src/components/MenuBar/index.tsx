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
  CartIcon,
  TeamStoresMenuContainer,
  TeamStoresMenuTitle
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import cart from '../../assets/cart.svg'
import messages from './messages'
import SearchBar from '../SearchBar'
import Login from '../Login'
import Logout from '../Logout'
import ForgotPassword from '../ForgotPassword'
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
}

interface StateProps {
  openForgotPassword: boolean
}

class MenuBar extends React.Component<Props, StateProps> {
  static defaultProps = {
    hideBottom: false
  }
  state = {
    openForgotPassword: false
  }

  handleOnGoHome = () => window.location.replace('/')

  handleMyAccount = () => {
    const { history } = this.props
    history.push('account')
  }

  render() {
    const { openForgotPassword } = this.state
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
      teamStoresHeader
    } = this.props
    let user
    if (typeof window !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user') as string)
    }

    const loggedUser = !user ? (
      <TopText onClick={this.handleOpenLogin}>
        <FormattedMessage {...messages.title} />
      </TopText>
    ) : (
      <Logout
        title={`${String(user.name).toUpperCase()}`}
        logout={logoutAction}
        account={this.handleMyAccount}
      />
    )

    const menuRegion = (
      <MenuRegion
        {...{
          onChangeLocation,
          currentRegion,
          currentLanguage,
          currentCurrency
        }}
      />
    )

    const bottomRowContent = teamStoresHeader ? (
      <BottomRow>
        <LogoIcon src={logo} onClick={this.handleOnGoHome} />
        <TeamStoresMenuContainer>
          <TeamStoresMenuTitle>
            {intl.formatMessage(messages.teamStoresTitle)}
          </TeamStoresMenuTitle>
        </TeamStoresMenuContainer>
        <div />
      </BottomRow>
    ) : (
      <BottomRow>
        <LogoIcon src={logo} onClick={this.handleOnGoHome} />
        <DropdownList {...{ history }} />
        <SearchBar
          search={searchFunc}
          onHeader={true}
          formatMessage={intl.formatMessage}
        />
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
                    <MenuSupport />
                    <TopRow>
                      {menuRegion}
                      <CartIcon src={cart} />
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
                  {...{ history }}
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
          formatMessage={intl.formatMessage}
          handleForgotPassword={this.handleOpenForgotPassword}
          login={saveUserToLocal}
        />
        <ForgotPassword
          open={openForgotPassword}
          formatMessage={intl.formatMessage}
          requestClose={this.handleOpenForgotPassword}
          openLogin={this.handleOpenLogin}
        />
      </div>
    )
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
