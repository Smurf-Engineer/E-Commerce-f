/**
 * MyLocker  Actions - Created by miguelcanobbio on 21/06/18.
 */
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_PAGINATION_DATA,
  SET_ERROR,
  SET_DELETE_MODAL_DATA,
  SET_MODAL_LOADING,
  RESET_MODAL_DATA,
  SET_RENAME_MODAL_DATA,
  RESET_RENAME_MODAL_DATA,
  ON_CHANGE_DESIGN_NAME,
  SET_RENAME_MODAL_LOADING,
  SET_SEARCH_TEXT,
  SET_FILTERS,
  RESET_FILTERS
} from './constants'
import { Moment } from 'moment'

import {
  AnyAction,
  DeleteDesignModal,
  RenameDesignModal
} from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setPaginationValues = (offset: number, page: number) => ({
  type: SET_PAGINATION_DATA,
  offset,
  page
})

export const setLoadingAction = (loading: boolean) => ({
  type: SET_LOADING,
  loading
})

export const setErrorAction = (error: boolean) => ({
  type: SET_ERROR,
  error
})

export const setDeleteModalDataAction = (payload: DeleteDesignModal) => ({
  type: SET_DELETE_MODAL_DATA,
  payload
})

export const setDeleteModalLoadingAction = (loading: boolean) => ({
  type: SET_MODAL_LOADING,
  loading
})

export const resetModalDataAction = () => ({
  type: RESET_MODAL_DATA
})

export const setRenameModalDataAction = (payload: RenameDesignModal) => ({
  type: SET_RENAME_MODAL_DATA,
  payload
})

export const resetRenameDataAction = () => ({
  type: RESET_RENAME_MODAL_DATA
})

export const onChangeDesignName = (name: string) => ({
  type: ON_CHANGE_DESIGN_NAME,
  name
})

export const setRenameModalLoadingAction = (loading: boolean) => ({
  type: SET_RENAME_MODAL_LOADING,
  loading
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})

export const setFiltersAction = (
  filterType: string,
  filterDate: string,
  startDate: Moment,
  endDate: Moment
) => ({
  type: SET_FILTERS,
  filterType,
  filterDate,
  startDate,
  endDate
})

export const resetFiltersAction = () => ({
  type: RESET_FILTERS
})
