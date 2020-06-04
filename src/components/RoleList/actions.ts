/**
 * OrderHistoryAdmin  Actions - Created by eduardoquintero on 07/05/19.
 */

import {
  SET_FILTER,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT
} from './constants'
import { AnyAction } from '../../types/common'

export const setFilterAction = (filter: string): AnyAction => ({
  type: SET_FILTER,
  filter
})

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})
