/**
 * DiscountsAdmin Reducer - Created by eduardoquintero on 24/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_DISCOUNT_ID,
  SET_SEARCH_TEXT,
  SET_DISCOUNT_TEXT,
  ON_SELECT_DISCOUNT_TYPE,
  ON_CHANGE_RATE,
  ON_ACTIVATE_DISCOUNT,
  OPEN_DISCOUNT_MODAL,
  RESET_DISCOUNT_DATA,
  SET_LOADING,
  ON_SELECT_DATE,
  SET_DISCOUNT_TO_UPDATE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  discountId: -1,
  searchText: '',
  discountTypes: ['%', 'flat'],
  discountType: '%',
  couponCode: '',
  discountItemId: '',
  expiry: '',
  rate: 1,
  discountActive: false,
  discountModalOpen: false,
  loading: false
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
    case SET_DISCOUNT_ID:
      return state.set('discountId', action.orderId)
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case SET_DISCOUNT_TEXT:
      return state.set(action.field, action.value)
    case ON_SELECT_DISCOUNT_TYPE:
      return state.set('discountType', action.value)
    case ON_CHANGE_RATE:
      return state.set('rate', action.value)
    case ON_ACTIVATE_DISCOUNT:
      return state.set('discountActive', action.checked)
    case OPEN_DISCOUNT_MODAL:
      return state.set('discountModalOpen', action.open)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case RESET_DISCOUNT_DATA: {
      return state.merge({
        discountType: '%',
        couponCode: '',
        discountItemId: '',
        rate: 1,
        discountActive: false,
        expiry: '',
        loading: false
      })
    }
    case ON_SELECT_DATE:
      return state.set('expiry', action.date)
    case SET_DISCOUNT_TO_UPDATE: {
      const {
        id,
        code,
        discountItemId,
        type,
        rate,
        expiry,
        active
      } = action.discount
      return state.merge({
        discountId: id,
        discountType: type,
        couponCode: code,
        discountItemId,
        rate,
        discountActive: active,
        expiry,
        discountModalOpen: true
      })
    }
    default:
      return state
  }
}

export default orderHistoryAdminReducer
