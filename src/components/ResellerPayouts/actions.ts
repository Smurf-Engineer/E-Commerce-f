/**
 * ResellerPayouts Actions - Created by Jesús Apodaca on 26/05/20.
 */

import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
} from './constants'
import { AnyAction } from '../../types/common'

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