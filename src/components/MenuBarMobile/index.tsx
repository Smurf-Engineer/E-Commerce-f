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
  regionButton: React.ReactNode
}

export const MenuBarMobile = ({
  history,
  loginButton,
  regionButton
}: Props) => {
  const handleGoHome = () => window.location.replace('/')

  return (
    <Container>
      <Menu {...{ history, loginButton, regionButton }} />
      <Logo src={logo} onClick={handleGoHome} />
      <Icon src={cart} />
    </Container>
  )
}

export default MenuBarMobile
