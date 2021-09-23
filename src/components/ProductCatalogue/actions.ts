/**
 * ProductCatalog  Actions - Created by cazarez on 27/02/18.
 */
import {
  SELECTED_FILTER,
  ORDERBY_SELECTED,
  SHOW_TYPE_FILTER,
  SET_SELECTED_FILTERS,
  SET_SKIP_VALUE,
  OPEN_SIDEBAR_MOBILE,
  RESET_REDUCER_DATA,
  CLEAR_FILTERS,
  SET_SELECTED_HOME_FILTERS,
  SET_ALL_GENDERS,
  SELECT_PRODUCT,
  DESELECT_PRODUCT,
  SET_SEARCH_TEXT
} from './constants'
import { AnyAction } from '../../types/common'

export const showTypeFilter = (showFilter: boolean): AnyAction => ({
  type: SHOW_TYPE_FILTER,
  showFilter
})

export const setFilterAction = (filter: {}): AnyAction => ({
  type: SELECTED_FILTER,
  filter
})

export const sortBySelected = (orderBy: string): AnyAction => ({
  type: ORDERBY_SELECTED,
  orderBy
})

export const setSelectedFilters = (filter: object) => ({
  type: SET_SELECTED_FILTERS,
  filter
})

export const setSkipValue = (skip: number, page: number) => ({
  type: SET_SKIP_VALUE,
  skip,
  page
})

export const openSidebarMobile = (open: boolean) => ({
  type: OPEN_SIDEBAR_MOBILE,
  open
})

export const resetReducerAction = () => ({
  type: RESET_REDUCER_DATA
})

export const clearFiltersAction = () => ({
  type: CLEAR_FILTERS
})

export const setHomeSelectedFilters = () => ({
  type: SET_SELECTED_HOME_FILTERS
})

export const setAllGendersAction = () => ({
  type: SET_ALL_GENDERS
})

export const selectProductAction = (productId: number) => ({
  type: SELECT_PRODUCT,
  productId
})

export const deselectProductAction = (productId: number) => ({
  type: DESELECT_PRODUCT,
  productId
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})
