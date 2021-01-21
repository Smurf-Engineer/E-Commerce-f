/**
 * MenuBarMobile Component - Created by david on 02/04/18.
 */
import * as React from 'react'
import logo from '../../assets/jakroo_logo.svg'
import pro_design_logo from '../../assets/Jakroo_Pro_White.png'
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
  approvedReseller?: boolean
  notifications?: Notification[]
  updatingNotifications?: boolean
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
