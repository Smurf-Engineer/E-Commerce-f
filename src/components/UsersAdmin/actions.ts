/**
 * UsersAdmin  Actions - Created by eduardoquintero on 29/05/19.
 */

import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_ORDER_ID,
  SET_SEARCH_TEXT,
  ON_INPUT_CHANGE,
  ON_CHANGE_SECTION,
  ON_TOGGLE_MODAL,
  ON_RESET_MODAL,
  SET_LOADING
} from './constants'

import { AnyAction, sorts } from '../../types/common'

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

export const setOrderIdAction = (orderId: string): AnyAction => ({
  type: SET_ORDER_ID,
  orderId
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})

export const onInputChangeAction = (id: string, value: string) => ({
  type: ON_INPUT_CHANGE,
  id,
  value
})

export const onChangeSectionAction = (section: boolean) => ({
  type: ON_CHANGE_SECTION,
  section
})

export const onToggleModalAction = () => ({
  type: ON_TOGGLE_MODAL
})

export const onResetModalAction = () => ({
  type: ON_RESET_MODAL
})

export const setLoadingAction = (loading: boolean) => ({
  type: SET_LOADING,
  loading
})
