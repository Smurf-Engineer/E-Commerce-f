/**
 * Admin Types - Created by eduardoquintero on 28/03/19.
 */
const namespace = 'src/Admin'

export const ORDER_STATUS = 'orderStatus'
// USE UNIQUE KEYS
export const options = [
  {
    title: ORDER_STATUS,
    options: []
  }
]

export const SET_DEFAULT_SCREEN = `${namespace}/SET_DEFAULT_SCREEN`
export const CLEAR_REDUCER = `${namespace}/CLEAR_REDUCER`
