/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import pro_design_logo from '../../assets/pro-design-beta-logo.png'
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
  openMenu: boolean
  hide?: boolean
  buyNowHeader?: boolean
  proDesign?: boolean
  affiliateEnabled?: boolean
  resellerPending?: boolean
  resellerEnabled?: boolean
  showProDesign?: boolean
  approvedReseller?: boolean
  onBehalf?: boolean
  notifications?: Notification[]
  updatingNotifications?: boolean
  saveAndBuy: (buy: boolean) => void
  onPressNotification?: (id: number, url: string) => void
  onDeleteNotification?: (id: number) => void
  onPressMarkAllAsRead: () => void
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
  showProDesign,
  resellerPending,
  openMenu,
  designHasChanges,
  hide,
  onBehalf,
  approvedReseller,
  openWithoutSaveModalAction,
  formatMessage,
  buyNowHeader,
  onPressNotification,
  onDeleteNotification,
  onPressMarkAllAsRead,
  notifications = [],
  saveAndBuy,
  handleOnGoHome,
  proDesign = false,
  updatingNotifications
}: Props) => {
  const handleOnSaveAndBuy = () => {
    saveAndBuy(true)
  }
  return (
    <Container darkMode={proDesign} {...{ hide }}>
      {!buyNowHeader &&
        <Menu
          {...{
            history,
            resellerEnabled,
            showProDesign,
            loginButton,
            openMenu,
            formatMessage,
            affiliateEnabled,
            approvedReseller,
            resellerPending,
            proDesign
          }}
        />
      }
      <Logo
        src={proDesign ? pro_design_logo : logo}
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
              onBehalf,
              onPressNotification,
              onDeleteNotification,
              onPressMarkAllAsRead,
              formatMessage
            }}
            isMobile={true}
            updating={updatingNotifications}
          />
          <Cart
            {...{
              totalItems,
              history,
              designHasChanges,
              openWithoutSaveModalAction
            }}
            darkMode={proDesign}
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
