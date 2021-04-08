/**
 * MobileAccount Menu - Created by Jesús on 27/08/20.
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
export const PRO_DESIGN = 'proDesign'
export const PRO_DESIGN_PROJECTS = 'proDesignProjects'

// USE UNIQUE KEYS
export const menuOptions = [
  {
    title: ORDER_HISTORY,
    options: []
  },
  {
    title: PROFILE_MENU,
    options: [PROFILE_SETTINGS, ADDRESSES, CREDIT_CARDS]
  },
  {
    title: TEAMSTORES,
    options: []
  },
  {
    title: RESELLER,
    options: [RESELLER_ABOUT]
  },
  {
    title: AFFILIATES,
    options: [AFFILIATES_ABOUT, AFFILIATES_ORDERS, AFFILIATES_PAYOUTS]
  },
  {
    title: PRO_DESIGN,
    options: [PRO_DESIGN_PROJECTS]
  },
  {
    title: SCREEN_LOCKER,
    options: []
  },
  {
    title: MY_FILES,
    options: []
  },
]

export const resellerOptions = [
  {
    title: ORDER_HISTORY,
    options: []
  },
  {
    title: PROFILE_MENU,
    options: [PROFILE_SETTINGS, ADDRESSES, CREDIT_CARDS]
  },
  {
    title: RESELLER,
    options: [RESELLER_ABOUT, MY_STORES, RESELLER_ORDERS, RESELLER_PAYOUTS]
  },
  {
    title: PRO_DESIGN,
    options: [PRO_DESIGN_PROJECTS]
  },
  {
    title: SCREEN_LOCKER,
    options: []
  },
  {
    title: MY_FILES,
    options: []
  }
]

export const resellerShortOptions = [
  {
    title: ADDRESSES,
    options: []
  },
  {
    title: CREDIT_CARDS,
    options: []
  },
  {
    title: PROFILE_SETTINGS,
    options: []
  },
  {
    title: RESELLER,
    options: [RESELLER_ABOUT]
  }
]