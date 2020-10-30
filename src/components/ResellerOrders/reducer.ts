/**
 * ResellerOrders Reducer - Created by Jesús Apodaca on 26/05/20.
 */

import { fromJS } from 'immutable'
import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SHOW,
  SET_STATUS,
  SET_ORDER_POINT,
  SET_DATE,
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  startDate: '',
  endDate: '',
  end: '',
  start: '',
  orderPoint: '',
  orderValue: '',
  statusValue: '',
  status: '',
})

const resellerOrdersReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW: {
      const start = state.get('startDate')
      const end = state.get('endDate')
      const orderPoint = state.get('orderValue')
      const status = state.get('statusValue')
      return state.merge({
        start,
        end,
        orderPoint,
        status,
        currentPage: 1
      })
    }
    case SET_STATUS:
      return state.set('statusValue', action.value)
    case SET_ORDER_POINT:
      return state.set('orderValue', action.value)
    case SET_DATE:
      return state.merge({
        startDate: action.startDate,
        endDate: action.endDate,
      })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default resellerOrdersReducer
