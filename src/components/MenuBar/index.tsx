/**
 * MenuBar Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import { FormattedMessage, InjectedIntl } from 'react-intl'
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
  CartIcon,
  SearchIcon
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import cart from '../../assets/cart.svg'
import search from '../../assets/search.svg'
import messages from './messages'
import SearchBar from '../SearchBar'
import Login from '../Login'
import { RegionConfig } from '../../types/common'

interface Props {
  history: any
  searchFunc: (param: string) => void
  openLogin?: boolean
  openLoginAction: (open: boolean) => void
  onChangeLocation: (payload: RegionConfig) => void
  currentRegion: number
  currentLanguage: number
  currentCurrency: number
  intl: InjectedIntl
  hideBottom?: boolean
}

class MenuBar extends React.Component<Props, {}> {
  static defaultProps = {
    hideBottom: false
  }
  render() {
    const {
      history,
      searchFunc,
      openLogin,
      onChangeLocation,
      currentRegion,
      currentLanguage,
      currentCurrency,
      hideBottom,
      intl
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
      <TopText>{`${String(user.name).toUpperCase()}`}</TopText>
    )
    return (
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
            <LogoIcon src={logo} />
            <DropdownList {...{ history }} />
            <SearchBar
              search={searchFunc}
              onHeader={true}
              formatMessage={intl.formatMessage}
            />
          </BottomRow>
        )}
        <Login open={openLogin} requestClose={this.handleCloseLogin} />
      </Container>
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
}

export default MenuBar
