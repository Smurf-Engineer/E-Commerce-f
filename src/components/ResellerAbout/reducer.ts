/**
 * ResellerAbout Reducer - Created by Jesús Apodaca on 30/06/20.
 */
import { fromJS } from 'immutable'
import {
  RESET_REDUCER_DATA,
  SET_PAYPAL_CURRENCY,
  SET_PAYPAL_CHECK,
  SET_LOADING,
  SET_FILE,
  OPEN_AFFILIATE,
  SUCCESS_REQUEST
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  paypalCurrency: 'usd',
  paypalCheck: false,
  loading: false,
  file: '',
  openModal: false,
})

const resellerAboutReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYPAL_CURRENCY:
      return state.set('paypalCurrency', action.value)
    case SET_PAYPAL_CHECK:
      return state.set('paypalCheck', action.value)
    case OPEN_AFFILIATE:
      return state.set('openModal', action.value)
    case SET_LOADING:
      return state.set('loading', action.value)
    case SET_FILE:
      return state.merge({ file: action.value, loading: false })
    case SUCCESS_REQUEST:
      return state.merge({
        file: '',
        openModal: false,
        loading: false,
        paypalCheck: false,
      })
    case RESET_REDUCER_DATA:
      return initialState
    default:
      return state
  }
}

export default resellerAboutReducer
