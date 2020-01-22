/**
 * UsersAdmin  Actions - Created by eduardoquintero on 29/05/19.
 */

import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_ORDER_ID,
  SET_SEARCH_TEXT,
  ON_SELECT_USER
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

export const onSelectUserAction = (id: number, name: string) => ({
  type: ON_SELECT_USER,
  id,
  name
})
