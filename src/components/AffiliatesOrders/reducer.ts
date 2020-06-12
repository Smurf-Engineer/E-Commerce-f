/**
 * AffiliatesOrders Reducer - Created by Jesús Apodaca on 26/05/20.
 */

import { fromJS } from 'immutable'
import {
  SET_CURRENT_PAGE,
  RESET_DATA,
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
})

const affiliatesOrdersReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default affiliatesOrdersReducer
