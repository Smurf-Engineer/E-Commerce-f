/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import Cart from '../CartForHeader'
import Menu from '../MobileMenu'
import messages from './messages'
import { Container, Logo, Button } from './styledComponents'
import { History } from 'history'

interface Props {
  history: History
  loginButton: React.ReactNode
  regionButton: React.ReactNode
  totalItems: number
  designHasChanges: boolean
  openMenu: boolean
  hide?: boolean
  buyNowHeader?: boolean
  affiliateEnabled?: boolean
  resellerPending?: boolean
  resellerEnabled?: boolean
  approvedReseller?: boolean
  saveAndBuy: (buy: boolean) => void
  openWithoutSaveModalAction: (open: boolean, route?: string) => void
  formatMessage: (messageDescriptor: any) => string
  handleOnGoHome: () => void
}

export const MenuBarMobile = ({
  history,
  loginButton,
  regionButton,
  totalItems,
  affiliateEnabled,
  resellerEnabled,
  resellerPending,
  openMenu,
  designHasChanges,
  hide,
  approvedReseller,
  openWithoutSaveModalAction,
  formatMessage,
  buyNowHeader,
  saveAndBuy,
  handleOnGoHome
}: Props) => {
  const handleOnSaveAndBuy = () => {
    saveAndBuy(true)
  }
  return (
    <Container {...{ hide }}>
      {!buyNowHeader &&
        <Menu 
          {...{
            history,
            resellerEnabled,
            loginButton,
            openMenu,
            formatMessage,
            affiliateEnabled,
            approvedReseller,
            resellerPending
          }}
        />
      }
      <Logo
        src={logo}
        onClick={handleOnGoHome}
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
