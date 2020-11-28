/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import pro_design_logo from '../../assets/Jakroo_Pro_White.png'
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
  hide?: boolean
  buyNowHeader?: boolean
  proDesign?: boolean
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
  designHasChanges,
  hide,
  openWithoutSaveModalAction,
  formatMessage,
  buyNowHeader,
  saveAndBuy,
  handleOnGoHome,
  proDesign = false
}: Props) => {
  const handleOnSaveAndBuy = () => {
    saveAndBuy(true)
  }
  return (
    <Container darkMode={proDesign} {...{ hide }}>
      {!buyNowHeader && <Menu {...{ history, loginButton, formatMessage, proDesign }} />}
      <Logo
        src={proDesign ? pro_design_logo : logo}
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
            openWithoutSaveModalAction,
          }}
          darkMode={proDesign}
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
