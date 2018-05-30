/**
 * Account Types - Created by david on 05/04/18.
 */
const namespace = 'src/Account'

export const SCREEN_LOCKER = 'locker'
export const ADDRESSES = 'addresses'
export const CREDIT_CARDS = 'creditCards'

// USE UNIQUE KEYS
export const options = [
  {
    title: 'overview',
    options: []
  },
  {
    title: 'orderHistory',
    options: []
  },
  {
    title: 'addresses',
    options: []
  },
  {
    title: 'creditCards',
    options: []
  },
  {
    title: 'profileSettings',
    options: []
  },
  {
    title: 'teamStores',
    options: []
  },
  {
    title: 'creations',
    options: [SCREEN_LOCKER, 'files']
  }
]

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const SET_OPEN_KEYS = `${namespace}/SET_OPEN_KEYS`
export const SET_CURRENT_SCREEN = `${namespace}/SET_CURRENT_SCREEN`
export const CLEAR_REDUCER = `${namespace}/CLEAR_REDUCER`
