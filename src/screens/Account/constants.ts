/**
 * Account Types - Created by david on 05/04/18.
 */
const namespace = 'src/Account'

export const OVERVIEW = 'overview'
export const ORDER_HISTORY = 'orderHistory'
export const ADDRESSES = 'addresses'
export const CREDIT_CARDS = 'creditCards'
export const PROFILE_SETTINGS = 'profileSettings'
export const PROFILE_MENU = 'profileMenu'
export const NOTIFICATIONS = 'notifications'
export const TEAMSTORES = 'myTeamStores'
export const MY_STORES = 'myStores'
export const RESELLER = 'reseller'
export const RESELLER_ABOUT = 'resellerAbout'
export const RESELLER_PAYOUTS = 'resellerPayouts'
export const RESELLER_ORDERS = 'resellerOrders'
export const AFFILIATES = 'affiliate'
export const AFFILIATES_ABOUT = 'affiliateAbout'
export const AFFILIATES_ORDERS = 'affiliateOrders'
export const AFFILIATES_PAYOUTS = 'affiliatePayouts'
export const CREATIONS = 'myCreations'
export const MY_FILES = 'myFiles'
export const SCREEN_LOCKER = 'myLocker'
export const PRO_DESIGN = 'proDesign'
export const PRO_DESIGN_PROJECTS = 'proDesignProjects'

// USE UNIQUE KEYS
export const options = [
  {
    title: OVERVIEW,
    options: []
  },
  {
    title: NOTIFICATIONS,
    options: []
  },
  {
    title: ORDER_HISTORY,
    options: []
  },
  {
    title: PROFILE_MENU,
    options: [PROFILE_SETTINGS, ADDRESSES, CREDIT_CARDS]
  },
  // TODO: hide teamstores for phase I
  {
    title: TEAMSTORES,
    options: []
  },
  {
    title: RESELLER,
    options: [RESELLER_ABOUT, RESELLER_ORDERS, RESELLER_PAYOUTS]
  },
  {
    title: AFFILIATES,
    options: [AFFILIATES_ABOUT, AFFILIATES_ORDERS, AFFILIATES_PAYOUTS]
  },
  {
    title: PRO_DESIGN,
    beta: true,
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

export const resellerOptions = [
  {
    title: OVERVIEW,
    options: []
  },
  {
    title: ORDER_HISTORY,
    options: []
  },
  {
    title: NOTIFICATIONS,
    options: []
  },
  {
    title: PROFILE_MENU,
    options: [PROFILE_SETTINGS, ADDRESSES, CREDIT_CARDS]
  },
  {
    title: PRO_DESIGN,
    beta: true,
    options: [PRO_DESIGN_PROJECTS]
  },
  {
    title: RESELLER,
    options: [RESELLER_ABOUT, MY_STORES, RESELLER_ORDERS, RESELLER_PAYOUTS]
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
    title: NOTIFICATIONS,
    options: []
  },
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

export const excludeBack = {
  [PRO_DESIGN_PROJECTS]: true
}

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const SET_OPEN_KEYS = `${namespace}/SET_OPEN_KEYS`
export const SET_CURRENT_SCREEN = `${namespace}/SET_CURRENT_SCREEN`
export const SET_DEFAULT_SCREEN = `${namespace}/SET_DEFAULT_SCREEN`
export const CLEAR_REDUCER = `${namespace}/CLEAR_REDUCER`
export const SET_IS_MOBILE = `${namespace}/SET_IS_MOBILE`
export const OPEN_SIDEBAR_MOBILE = `${namespace}/OPEN_SIDEBAR_MOBILE`
export const SET_CURRENT_SHARE = `${namespace}/SET_CURRENT_SHARE`
export const OPEN_ADD_TOTEAMSTORE = `${namespace}/ADD_TOTEAMSTORE`
export const SET_ITEM_TOADD = `${namespace}/SET_ITEM_TOADD`
