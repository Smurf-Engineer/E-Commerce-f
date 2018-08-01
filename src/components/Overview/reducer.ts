/**
 * Overview Reducer - Created by jorge on 30/07/18.
 */

import { fromJS } from 'immutable'
import { SET_ORDER_ID } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  orderId: ''
})

const overviewReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_ID:
      return state.set('orderId', action.orderId)
    default:
      return state
  }
}

export default overviewReducer
