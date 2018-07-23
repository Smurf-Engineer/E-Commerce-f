/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import Cart from '../CartForHeader'
import Menu from '../MobileMenu'
import { Container, Logo } from './styledComponents'

interface Props {
  history: any
  loginButton: React.ReactNode
  regionButton: React.ReactNode
  totalItems: number
  designHasChanges: boolean
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
  formatMessage: (messageDescriptor: any) => string
}

export const MenuBarMobile = ({
  history,
  loginButton,
  regionButton,
  totalItems,
  designHasChanges,
  openWithoutSaveModalAction,
  formatMessage
}: Props) => {
  const handleGoHome = () => window.location.replace('/')

  return (
    <Container>
      <Menu {...{ history, loginButton, regionButton, formatMessage }} />
      <Logo src={logo} onClick={handleGoHome} />
      <Cart
        {...{
          totalItems,
          history,
          designHasChanges,
          openWithoutSaveModalAction
        }}
      />
    </Container>
  )
}

export default MenuBarMobile
