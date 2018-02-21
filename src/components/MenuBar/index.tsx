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
}

interface StateProps {
  openLogin: boolean
}

class MenuBar extends React.Component<Props, StateProps> {
  state = {
    openLogin: false
  }
  render() {
    const { history, searchFunc } = this.props
    const { openLogin } = this.state
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
            <TopText onClick={this.handleOpenLogin}>LOGIN</TopText>
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
    this.setState({ openLogin: true })
  }
  handleCloseLogin = () => {
    this.setState({ openLogin: false })
  }
}

export default MenuBar
