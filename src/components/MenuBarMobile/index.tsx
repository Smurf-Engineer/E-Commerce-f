/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import cart from '../../assets/cart.svg'
import menu from '../../assets/Menu.svg'
import { Container, Logo, Icon } from './styledComponents'

interface Props {}

const MenuBarMobile = (props: Props) => {
  return (
    <Container>
      <Icon src={menu} />
      <Logo src={logo} />
      <Icon src={cart} />
    </Container>
  )
}

export default MenuBarMobile
