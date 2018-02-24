/**
 * MenuBar Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import DropdownList from '../DropdownList'
import Support from '../MenuSupport'
import {
  Container,
  TopText,
  Region,
  Row,
  Divider,
  TopRow,
  BottomRow,
  LogoIcon,
  CartIcon,
  SearchIcon
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import caFlag from '../../assets/CA.svg'
import cart from '../../assets/cart.svg'
import search from '../../assets/search.svg'
import SearchBar from '../SearchBar'
import Login from '../Login'

interface Props {
  history: any
  searchFunc: (param: string) => void
  openLogin?: boolean
  openLoginAction: (open: boolean) => void
}

interface StateProps {
  openLogin: boolean
}

class MenuBar extends React.Component<Props, StateProps> {
  state = {
    openLogin: false
  }

  render() {
    const { history, searchFunc, openLogin } = this.props
    // const { openLogin } = this.state
    let user
    if (typeof window !== 'undefined') {
      console.log('window')
      user = JSON.parse(localStorage.getItem('user') as string)
      console.log(user)
    }

    const loggedUser = !user ? (
      <TopText onClick={this.handleOpenLogin}>LOGIN</TopText>
    ) : (
      <TopText>{`${String(user.name).toUpperCase()}`}</TopText>
    )
    return (
      <Container>
        <Row>
          <Support />
          <TopRow>
            <Region>
              <img src={caFlag} />
              <TopText>$USD</TopText>
            </Region>
            <CartIcon src={cart} />
            {loggedUser}
          </TopRow>
        </Row>
        <Divider />
        <BottomRow>
          <LogoIcon src={logo} />
          <DropdownList {...{ history }} />
          <SearchBar search={searchFunc} onHeader={true} />
        </BottomRow>
        <Login open={openLogin} requestClose={this.handleCloseLogin} />
      </Container>
    )
  }

  handleOpenLogin = () => {
    const { openLoginAction } = this.props
    openLoginAction(true)
    // this.setState({ openLogin: true })
  }
  handleCloseLogin = () => {
    const { openLoginAction } = this.props
    openLoginAction(false)
    //  this.setState({ openLogin: false })
  }
}

export default MenuBar
