/**
 * SalesRep Actions - Created by Jesús Apodaca on 23/03/20.
 */

import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_OPEN_MODAL,
  SET_SEARCH_TEXT,
  SET_NAME,
  SET_LOADING
} from './constants'
import { AnyAction } from '../../types/common'

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
})

export const setNameAction = (field: string, value: string): AnyAction => ({
  type: SET_NAME,
  field,
  value
})

export const setOpenModal = (open: boolean): AnyAction => ({
  type: SET_OPEN_MODAL,
  open
})

export const setLoading = (loading: boolean): AnyAction => ({
  type: SET_LOADING,
  loading
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})
