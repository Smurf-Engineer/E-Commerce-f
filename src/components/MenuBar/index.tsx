/**
 * MenuBar Component - Created by david on 07/02/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/Menu'
import Support from '../MenuSupport'
import DropdownList from '../DropdownList'
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

interface Props {}

const MenuBar = (props: Props) => {
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
          <TopText>LOGIN</TopText>
        </TopRow>
      </Row>
      <Divider />
      <BottomRow>
        <LogoIcon src={logo} />
        <DropdownList />
        <SearchIcon src={search} />
      </BottomRow>
    </Container>
  )
}

export default MenuBar
