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
  SET_SELECTED_USER,
  SET_ITEM_SELECTED_ACTION,
  SET_ITEMS_ADD_ACTION,
  SET_OPEN_LOCKER_ACTION,
  ON_UNSELECT_ITEM,
  DELETE_ITEM_SELECTED_ACTION,
  SET_PAGINATION_DATA
} from './constants'

import { AnyAction, sorts, Discount, DesignType } from '../../types/common'

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

export const selectRestrictionAction = (restriction: string) => ({
  type: SELECT_RESTRICTION,
  restriction
})

export const onChangeUserAction = (value: string) => ({
  type: ON_CHANGE_USER,
  value
})

export const setSelectedUserAction = (email: string) => ({
  type: SET_SELECTED_USER,
  email
})

export const setItemSelectedAction = (
  item: DesignType,
  checked: boolean
): AnyAction => ({
  type: SET_ITEM_SELECTED_ACTION,
  item,
  checked
})

export const setItemsAddAction = (): AnyAction => ({
  type: SET_ITEMS_ADD_ACTION
})

export const setOpenLockerAction = (isOpen: boolean): AnyAction => ({
  type: SET_OPEN_LOCKER_ACTION,
  isOpen
})

export const onUnselectItemAction = (id: number) => ({
  type: ON_UNSELECT_ITEM,
  id
})

export const deleteItemSelectedAction = (index: number): AnyAction => ({
  type: DELETE_ITEM_SELECTED_ACTION,
  index
})

export const setPaginationData = (offset: number, page: number) => ({
  type: SET_PAGINATION_DATA,
  offset,
  page
})
