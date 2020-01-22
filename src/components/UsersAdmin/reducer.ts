/**
 * UsersAdmin Reducer - Created by eduardoquintero on 29/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_ORDER_ID,
  SET_SEARCH_TEXT,
  ON_SELECT_USER
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  orderId: '',
  searchText: '',
  userId: '',
  userName: ''
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
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case ON_SELECT_USER: {
      const { id, name } = action
      return state.merge({ userId: id, userName: name })
    }
    default:
      return state
  }
}

export default orderHistoryAdminReducer
