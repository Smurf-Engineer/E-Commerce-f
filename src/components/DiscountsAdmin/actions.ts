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
  OPEN_DISCOUNT_MODAL,
  RESET_DISCOUNT_DATA,
  SET_LOADING,
  ON_SELECT_DATE,
  SET_DISCOUNT_TO_UPDATE
} from './constants'

import { AnyAction, sorts, Discount } from '../../types/common'

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

export const openDiscountModalAction = (open: boolean) => ({
  type: OPEN_DISCOUNT_MODAL,
  open
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
