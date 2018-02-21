/**
 * MenuBar Component - Created by david on 07/02/18.
 */
import * as React from 'react'
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
import SearchBar from '../SearchBar'

interface Props {
  history: any
  searchFunc: (param: string) => void
  onChangeLocation: (locale: string) => void
}

const MenuBar = ({ history, searchFunc, onChangeLocation }: Props) => {
  return (
    <Container>
      <Row>
        <MenuSupport />
        <TopRow>
          <MenuRegion {...{ onChangeLocation }} />
          <CartIcon src={cart} />
          <TopText>LOGIN</TopText>
        </TopRow>
      </Row>
      <Divider />
      <BottomRow>
        <LogoIcon src={logo} />
        <DropdownList {...{ history }} />
        <SearchBar search={searchFunc} onHeader={true} />
      </BottomRow>
    </Container>
  )
}

export default MenuBar
