/**
 * DiscountsAdmin  Actions - Created by eduardoquintero on 24/05/19.
 */

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
  ON_ADD_PRODUCT,
  DELETE_ITEM_SELECTED_ACTION,
  ON_ADD_USER,
  SET_DISCOUNT_PAGE,
  ON_CHANGE_USAGE,
  ON_CHECK_USAGE
} from './constants'

import {
  AnyAction,
  sorts,
  Discount,
  UserDiscount,
  HiddenSymbols
} from '../../types/common'

export const setOrderByAction = (orderBy: string, sort: sorts): AnyAction => ({
  type: SET_ORDER_BY,
  orderBy,
  sort
})

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})

export const setDiscountIdAction = (discountId: string): AnyAction => ({
  type: SET_DISCOUNT_ID,
  discountId
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})

export const setDiscountTextAction = (field: string, value: string) => ({
  type: SET_DISCOUNT_TEXT,
  field,
  value
})

export const onSelectDiscountTypeAction = (value: string) => ({
  type: ON_SELECT_DISCOUNT_TYPE,
  value
})

export const onChangeRateAction = (value: number) => ({
  type: ON_CHANGE_RATE,
  value
})

export const onActivateDiscountAction = (checked: boolean) => ({
  type: ON_ACTIVATE_DISCOUNT,
  checked
})

export const resetDiscountDataAction = () => ({
  type: RESET_DISCOUNT_DATA
})

export const setLoadingAction = (loading: boolean) => ({
  type: SET_LOADING,
  loading
})

export const onSelectDateAction = (date: string) => ({
  type: ON_SELECT_DATE,
  date
})

export const setDiscountToUpdateAction = (discount: Discount) => ({
  type: SET_DISCOUNT_TO_UPDATE,
  discount
})

export const selectRestrictionAction = (restriction: HiddenSymbols) => ({
  type: SELECT_RESTRICTION,
  restriction
})

export const onChangeUserAction = (value: string) => ({
  type: ON_CHANGE_USER,
  value
})

export const onAddProductAction = (value: string) => ({
  type: ON_ADD_PRODUCT,
  value
})

export const deleteItemSelectedAction = (
  index: number,
  section: string
): AnyAction => ({
  type: DELETE_ITEM_SELECTED_ACTION,
  index,
  section
})

export const onAddUserAction = (user: UserDiscount) => ({
  type: ON_ADD_USER,
  user
})

export const setDiscountPageAction = (page: number): AnyAction => ({
  type: SET_DISCOUNT_PAGE,
  page
})

export const onChangeUsageAction = (value: number): AnyAction => ({
  type: ON_CHANGE_USAGE,
  value
})

export const onCheckUsageAction = (checked: boolean): AnyAction => ({
  type: ON_CHECK_USAGE,
  checked
})