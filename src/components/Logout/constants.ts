/**
 * Logout Menu - Created by Jesús on 27/08/20.
 */

export const OVERVIEW = 'overview'
export const ORDER_HISTORY = 'orderHistory'
export const ADDRESSES = 'addresses'
export const CREDIT_CARDS = 'creditCards'
export const PROFILE_SETTINGS = 'profileSettings'
export const PROFILE_MENU = 'profileMenu'
export const TEAMSTORES = 'myTeamStores'
export const AFFILIATES = 'affiliate'
export const AFFILIATES_ABOUT = 'affiliateAbout'
export const AFFILIATES_ORDERS = 'affiliateOrders'
export const AFFILIATES_PAYOUTS = 'affiliatePayouts'
export const CREATIONS = 'myCreations'
export const MY_FILES = 'myFiles'
export const SCREEN_LOCKER = 'myLocker'

// USE UNIQUE KEYS
export const menuOptions = [
  {
    titleLabel: ORDER_HISTORY,
    options: []
  },
  {
    titleLabel: PROFILE_MENU,
    options: [PROFILE_SETTINGS, ADDRESSES, CREDIT_CARDS]
  },
  {
    titleLabel: TEAMSTORES,
    options: []
  },
  {
    titleLabel: AFFILIATES,
    options: [AFFILIATES_ABOUT, AFFILIATES_ORDERS, AFFILIATES_PAYOUTS]
  },
  {
    titleLabel: SCREEN_LOCKER,
    options: []
  },
  {
    titleLabel: MY_FILES,
    options: []
  }
]