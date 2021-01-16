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
export const MY_STORES = 'myStores'
export const AFFILIATES = 'affiliate'
export const AFFILIATES_ABOUT = 'affiliateAbout'
export const AFFILIATES_ORDERS = 'affiliateOrders'
export const AFFILIATES_PAYOUTS = 'affiliatePayouts'
export const RESELLER = 'reseller'
export const RESELLER_ABOUT = 'resellerAbout'
export const RESELLER_PAYOUTS = 'resellerPayouts'
export const RESELLER_ORDERS = 'resellerOrders'
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
    titleLabel: RESELLER,
    options: [RESELLER_ABOUT]
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

export const resellerOptions = [
  {
    titleLabel: ORDER_HISTORY,
    options: []
  },
  {
    titleLabel: PROFILE_MENU,
    options: [PROFILE_SETTINGS, ADDRESSES, CREDIT_CARDS]
  },
  {
    titleLabel: RESELLER,
    options: [RESELLER_ABOUT, MY_STORES, RESELLER_ORDERS, RESELLER_PAYOUTS]
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

export const resellerShortOptions = [
  {
    titleLabel: ADDRESSES,
    options: []
  },
  {
    titleLabel: CREDIT_CARDS,
    options: []
  },
  {
    titleLabel: PROFILE_SETTINGS,
    options: []
  },
  {
    titleLabel: RESELLER,
    options: [RESELLER_ABOUT]
  }
]