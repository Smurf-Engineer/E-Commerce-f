/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import cart from '../../assets/cart.svg'
import Menu from '../MobileMenu'
import { Container, Logo, Icon } from './styledComponents'

interface Props {
  history: any
  loginButton: React.ReactNode
}

const MenuBarMobile = ({ history, loginButton }: Props) => {
  return (
    <Container>
      <Menu {...{ history, loginButton }} />
      <Logo src={logo} />
      <Icon src={cart} />
    </Container>
  )
}

export default MenuBarMobile
