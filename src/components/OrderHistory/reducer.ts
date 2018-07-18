/**
 * OrderHistory Reducer - Created by miguelcanobbio on 06/16/18.
 */

import { fromJS } from 'immutable'
import { SET_ORDER_BY, SET_CURRENT_PAGE, RESET_DATA } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc'
})

const accountReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_BY:
      return state.merge({ orderBy: action.orderBy, sort: action.sort })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default accountReducer
