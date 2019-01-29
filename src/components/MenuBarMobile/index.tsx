/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import Cart from '../CartForHeader'
import Menu from '../MobileMenu'
import messages from './messages'
import { Container, Logo, Button } from './styledComponents'

interface Props {
  history: any
  loginButton: React.ReactNode
  regionButton: React.ReactNode
  totalItems: number
  designHasChanges: boolean
  hide?: boolean
  buyNowHeader?: boolean
  saveAndBuy: (buy: boolean) => void
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
  formatMessage: (messageDescriptor: any) => string
}

export const MenuBarMobile = ({
  history,
  loginButton,
  regionButton,
  totalItems,
  designHasChanges,
  hide,
  openWithoutSaveModalAction,
  formatMessage,
  buyNowHeader,
  saveAndBuy
}: Props) => {
  const handleGoHome = () => window.location.replace('/')
  const handleOnSaveAndBuy = () => {
    saveAndBuy(true)
  }
  return (
    <Container {...{ hide }}>
      {!buyNowHeader && <Menu {...{ history, loginButton, formatMessage }} />}
      <Logo
        src={logo}
        onClick={handleGoHome}
        className={buyNowHeader ? 'alignLeft' : ''}
      />
      {regionButton}
      {!buyNowHeader && (
        <Cart
          {...{
            totalItems,
            history,
            designHasChanges,
            openWithoutSaveModalAction
          }}
        />
      )}
      {buyNowHeader ? (
        <Button onClick={handleOnSaveAndBuy} type="primary">
          {formatMessage({ ...messages.buyNow })}
        </Button>
      ) : null}
    </Container>
  )
}

export default MenuBarMobile
