/**
 * PayModal Reducer - Created by eduardoquintero on 16/01/20.
 */

import { fromJS } from 'immutable'
import {
  RESET_DATA,
  SET_PAYMENT,
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  loading: false,
  paymentMethod: ''
})

const payModalReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT:
      return state.set('paymentMethod', action.value)
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default payModalReducer
