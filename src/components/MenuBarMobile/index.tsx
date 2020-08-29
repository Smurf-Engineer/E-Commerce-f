/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import Cart from '../CartForHeader'
import Notifications from '../NotificationHeader'
import Menu from '../MobileMenu'
import messages from './messages'
import { Notification } from '../../types/common'
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
  notifications?: Notification[]
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
  notifications = [],
  saveAndBuy,
  handleOnGoHome
}: Props) => {
  const handleOnSaveAndBuy = () => {
    saveAndBuy(true)
  }
  return (
    <Container {...{ hide }}>
      {!buyNowHeader && <Menu {...{ history, loginButton, formatMessage }} />}
      <Logo
        src={logo}
        onClick={handleOnGoHome}
        className={buyNowHeader ? 'alignLeft' : ''}
      />
      {regionButton}
      {!buyNowHeader && (
        <>
          <Notifications
            {...{
              notifications,
              history,
              formatMessage
            }}
            isMobile={true}
          />
          <Cart
            {...{
              totalItems,
              history,
              designHasChanges,
              openWithoutSaveModalAction
            }}
          />
        </>
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
