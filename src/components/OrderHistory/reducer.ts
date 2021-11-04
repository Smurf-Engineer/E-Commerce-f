/**
 * OrderHistory Reducer - Created by miguelcanobbio on 06/16/18.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_ORDER_ID
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'created_at',
  sort: 'desc',
  orderId: '',
  isService: false
})

const accountReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_BY:
      return state.merge({ orderBy: action.orderBy, sort: action.sort })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case SET_ORDER_ID:
      return state.merge({ orderId: action.orderId, isService: action.isService })
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default accountReducer
