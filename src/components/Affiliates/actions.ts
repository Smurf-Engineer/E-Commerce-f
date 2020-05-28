/**
 * Affiliates Actions - Created by Jesús Apodaca on 26/05/20.
 */

import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_LOADING,
  SET_DATE,
  SET_SHOW,
  SET_SELECTED
} from './constants'
import { AnyAction, SelectedPays } from '../../types/common'

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
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

export const changeDateAction = (startDate: string, endDate: string) => ({
  type: SET_DATE,
  startDate,
  endDate
})

export const setShowAction = (): AnyAction => ({
  type: SET_SHOW
})

export const setSelected = (value: SelectedPays) => ({
  type: SET_SELECTED,
  value
})