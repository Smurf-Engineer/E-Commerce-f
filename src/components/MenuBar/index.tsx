/**
 * MenuBar Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage, InjectedIntl } from 'react-intl'
import Responsive from 'react-responsive'
import DropdownList from '../DropdownList'
import MenuSupport from '../MenuSupport'
import MenuRegion from '../MenuRegion'
import {
  Container,
  TopText,
  Row,
  Divider,
  TopRow,
  BottomRow,
  LogoIcon,
  CartIcon
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import cart from '../../assets/cart.svg'
import messages from './messages'
import SearchBar from '../SearchBar'
import Login from '../Login'
import Logout from '../Logout'
import ForgotPassword from '../ForgotPassword'
import { RegionConfig } from '../../types/common'

const Desktop = (props: any) => <Responsive {...props} minWidth={992} />
const Tablet = (props: any) => (
  <Responsive {...props} minWidth={768} maxWidth={991} />
)
const Mobile = (props: any) => <Responsive {...props} maxWidth={767} />

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
      saveUserToLocal
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
      />
    )

    return (
      <div>
        <Desktop>
          <Container>
            <Row>
              <MenuSupport />
              <TopRow>
                <MenuRegion
                  {...{
                    onChangeLocation,
                    currentRegion,
                    currentLanguage,
                    currentCurrency
                  }}
                />
                <CartIcon src={cart} />
                {loggedUser}
              </TopRow>
            </Row>
            <Divider />
            {!hideBottom && (
              <BottomRow>
                <LogoIcon src={logo} onClick={this.handleOnGoHome} />
                <DropdownList {...{ history }} />
                <SearchBar
                  search={searchFunc}
                  onHeader={true}
                  formatMessage={intl.formatMessage}
                />
              </BottomRow>
            )}
          </Container>
        </Desktop>
        <Tablet>
          <div style={{ height: 40, lineHeight: 2 }}>HEADER</div>
        </Tablet>
        <Mobile>
          <div style={{ height: 40, lineHeight: 2 }}>HEADER</div>
        </Mobile>
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
