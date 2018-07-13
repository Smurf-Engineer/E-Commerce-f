/**
 * Account Types - Created by david on 05/04/18.
 */
const namespace = 'src/Account'

export const OVERVIEW = 'overview'
export const ORDER_HISTORY = 'orderHistory'
export const ADDRESSES = 'addresses'
export const CREDIT_CARDS = 'creditCards'
export const PROFILE_SETTINGS = 'profileSettings'
export const TEAMSTORES = 'myTeamStores'
export const CREATIONS = 'myCreations'
export const MY_FILES = 'myFiles'
export const SCREEN_LOCKER = 'myLocker'

// USE UNIQUE KEYS
export const options = [
  {
    title: OVERVIEW,
    options: []
  },
  {
    title: ORDER_HISTORY,
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
    title: TEAMSTORES,
    options: []
  },
  {
    title: CREATIONS,
    options: [SCREEN_LOCKER, MY_FILES]
  }
]

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const SET_OPEN_KEYS = `${namespace}/SET_OPEN_KEYS`
export const SET_CURRENT_SCREEN = `${namespace}/SET_CURRENT_SCREEN`
export const CLEAR_REDUCER = `${namespace}/CLEAR_REDUCER`
export const SET_IS_MOBILE = `${namespace}/SET_IS_MOBILE`
export const OPEN_SIDEBAR_MOBILE = `${namespace}/OPEN_SIDEBAR_MOBILE`
