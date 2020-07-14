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
  RESET_DISCOUNT_DATA,
  SET_LOADING,
  ON_SELECT_DATE,
  SET_DISCOUNT_TO_UPDATE,
  SELECT_RESTRICTION,
  ON_CHANGE_INPUT,
  ON_ADD_PRODUCT,
  DELETE_ITEM_SELECTED_ACTION,
  LIST,
  EDIT,
  ON_ADD_USER,
  SET_DISCOUNT_PAGE,
  ON_CHANGE_USAGE,
  ON_CHECK_USAGE
} from './constants'
import { Reducer, HiddenSymbols } from '../../types/common'

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
  loading: false,
  restrictionType: {
    users: false,
    design: true,
    usage: false
  },
  user: '',
  selectedUser: '',
  discountPage: LIST,
  selectedValues: [],
  usageNumber: 0,
  unlimitedUsage: false,
  selectedProducts: [],
  selectedUsers: []
})

const discountsAdminReducer: Reducer<any> = (state = initialState, action) => {
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
        loading: false,
        discountId: -1,
        restrictionType: {
          users: false,
          design: true,
          usage: false
        },
        user: '',
        selectedUser: '',
        currentPageModal: 1,
        offset: 0,
        discountPage: LIST,
        selectedUsers: [],
        selectedProducts: []
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
        active,
        restrictionType,
        user,
        selectedUsers,
        selectedProducts,
        usageNumber
      } = action.discount
      const restrictions = restrictionType.split(',')
      const restricts = restrictions.reduce(
        (obj: HiddenSymbols, restrictType: string) => {
          obj[restrictType] = true
          return obj
          // tslint:disable-next-line: align
        },
        {}
      )
      return state.merge({
        discountId: id,
        discountType: type,
        couponCode: code,
        discountItemId,
        rate,
        discountActive: active,
        expiry,
        restrictionType: restricts,
        user,
        discountPage: EDIT,
        selectedUsers,
        usageNumber,
        selectedProducts
      })
    }
    case SELECT_RESTRICTION: {
      const restrictionType = action.restriction
      let selectedArray = ''
      if (!restrictionType.users) {
        selectedArray = 'selectedUsers'
      } else if (!restrictionType.design) {
        selectedArray = 'selectedProducts'
      }
      return state.merge({
        restrictionType,
        [selectedArray]: [],
        user: ''
      })
    }
    case ON_CHANGE_INPUT:
      return state.set(action.key, action.value)
    case ON_ADD_PRODUCT: {
      const { design } = action
      const selectedProducts = state.get('selectedProducts')
      const itemsMap = selectedProducts.valueSeq((item: any) => item)
      return state.merge({
        design: '',
        selectedProducts: [design, ...itemsMap]
      })
    }
    case DELETE_ITEM_SELECTED_ACTION:
      const { index } = action
      return state.deleteIn([action.section, index])
    case ON_ADD_USER: {
      const { user } = action
      const selectedUsers = state.get('selectedUsers')
      const itemsMap = selectedUsers.valueSeq((item: any) => item)
      return state.merge({
        user: '',
        selectedUsers: [user, ...itemsMap]
      })
    }
    case SET_DISCOUNT_PAGE:
      return state.set('discountPage', action.page)
    case ON_CHANGE_USAGE:
      return state.set('usageNumber', action.value)
    case ON_CHECK_USAGE:
      return state.set('unlimitedUsage', action.checked)
    default:
      return state
  }
}

export default discountsAdminReducer
