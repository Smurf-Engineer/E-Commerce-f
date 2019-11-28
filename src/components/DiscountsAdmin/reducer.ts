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
  ON_CHANGE_USER,
  SET_SELECTED_USER,
  SET_ITEM_SELECTED_ACTION,
  SET_ITEMS_ADD_ACTION,
  SET_OPEN_LOCKER_ACTION,
  ON_UNSELECT_ITEM,
  DELETE_ITEM_SELECTED_ACTION,
  SET_PAGINATION_DATA,
  LIST,
  EDIT,
  ON_ADD_USER,
  SET_DISCOUNT_PAGE,
  ON_CHANGE_USAGE,
  ON_CHECK_USAGE
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
  loading: false,
  restrictionType: '',
  user: '',
  selectedUser: '',
  items: [],
  openLocker: false,
  selectedItems: {},
  currentPageModal: 1,
  limit: 12,
  offset: 0,
  discountPage: LIST,
  selectedUsers: [],
  usageNumber: 0,
  unlimitedUsage: false
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
        restrictionType: '',
        user: '',
        selectedUser: '',
        items: [],
        openLocker: false,
        currentPageModal: 1,
        offset: 0,
        discountPage: LIST,
        selectedUsers: []
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
        items,
        user,
        selectedUsers,
        usageNumber
      } = action.discount
      return state.merge({
        discountId: id,
        discountType: type,
        couponCode: code,
        discountItemId,
        rate,
        discountActive: active,
        expiry,
        restrictionType,
        items,
        user,
        discountPage: EDIT,
        selectedUsers,
        usageNumber
      })
    }
    case SELECT_RESTRICTION:
      return state.merge({
        restrictionType: action.restriction,
        selectedUsers: [],
        items: [],
        user: ''
      })
    case ON_CHANGE_USER:
      return state.set('user', action.value)
    case SET_SELECTED_USER:
      return state.merge({
        selectedUsers: [{ value: action.value }],
        items: []
      })
    case SET_ITEM_SELECTED_ACTION: {
      const {
        design: { id }
      } = action.item
      return state.setIn(['selectedItems', id], action.item)
    }
    case SET_ITEMS_ADD_ACTION: {
      const items = state.get('items').toJS()
      const selectedItems = state.get('selectedItems')
      const itemsMap = selectedItems.valueSeq((item: any) => item)
      return state.merge({
        items: [...items, ...itemsMap],
        openLocker: false,
        selectedItems: {}
      })
    }
    case SET_OPEN_LOCKER_ACTION:
      return state.merge({ openLocker: action.isOpen, selectedItems: {} })
    case ON_UNSELECT_ITEM:
      return state.update('selectedItems', (selectedItem: any) => {
        return selectedItem.filter((item: any) => item.design.id !== action.id)
      })
    case DELETE_ITEM_SELECTED_ACTION:
      const { index } = action
      return state.deleteIn([action.section, index])
    case SET_PAGINATION_DATA: {
      return state.merge({
        offset: action.offset,
        currentPageModal: action.page,
        loading: false
      })
    }
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
      console.log(action.page)
      return state.set('discountPage', action.page)
    case ON_CHANGE_USAGE:
      return state.set('usageNumber', action.value)
    case ON_CHECK_USAGE:
      return state.set('unlimitedUsage', action.checked)
    default:
      return state
  }
}

export default orderHistoryAdminReducer
