/**
 * OrderHistoryAdmin Reducer - Created by eduardoquintero on 07/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_ORDER_ID,
  SET_SEARCH_TEXT,
  SET_FILTERS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  orderId: '',
  searchText: '',
  status: '',
  orderPoint: '',
  startDate: null,
  endDate: null
})

const orderHistoryAdminReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_ORDER_BY:
      return state.merge({ orderBy: action.orderBy, sort: action.sort })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case SET_ORDER_ID:
      return state.set('orderId', action.orderId)
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.set('searchText', action.searchText)
    case SET_FILTERS:
      return state.merge({
        status: action.status,
        orderPoint: action.orderPoint,
        startDate: action.startDate,
        endDate: action.endDate
      })
    default:
      return state
  }
}

export default orderHistoryAdminReducer
