/**
 * ProductInternalsAdmin  Actions - Created by eduardoquintero on 03/07/19.
 */

import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_ID,
  SET_SEARCH_TEXT,
  SET_LOADING,
  SET_TEXT,
  SELECT_CHANGE
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

export const setIdAction = (id: number): AnyAction => ({
  type: SET_ID,
  id
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})

export const setLoadingAction = (loading: boolean) => ({
  type: SET_LOADING,
  loading
})

export const setTextAction = (field: string, value: string) => ({
  type: SET_TEXT,
  field,
  value
})

export const onSelectChangeAction = (value: string, id: string) => ({
  type: SELECT_CHANGE,
  value,
  id
})
