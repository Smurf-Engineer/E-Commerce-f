/**
 * ResellerOptions Actions - Created by miguelcanobbio on 05/31/18.
 */
import {
  SET_MODAL_LOADING,
  RESET_REDUCER_DATA,
  SET_LOADING,
  OPEN_AFFILIATE,
  SUCCESS_REQUEST,
  ON_PAGE_CHANGE
} from './constants'
import { AnyAction } from '../../types/common'

export const setUploadingAction = (value: boolean): AnyAction => ({
  type: SET_LOADING,
  value
})

export const successRequestAction = (): AnyAction => ({
  type: SUCCESS_REQUEST,
})

export const openAffiliate = (value: boolean): AnyAction => ({
  type: OPEN_AFFILIATE,
  value
})

export const onChangePage = (page: number): AnyAction => ({
  type: ON_PAGE_CHANGE,
  page
})

export const setModalLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_MODAL_LOADING,
  loading
})

export const resetReducerDataAction = (): AnyAction => ({
  type: RESET_REDUCER_DATA
})
