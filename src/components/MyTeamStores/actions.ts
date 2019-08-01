import {
  OPEN_DELETE_MODAL,
  CLEAR_REDUCER,
  OPEN_SHARE_MODAL,
  SET_STOREID_TO_DELETE,
  SET_SKIP_VALUE
} from './constants'

import { AnyAction } from '../../types/common'

export const openDeleteModalAction = (
  open: boolean,
  storeId?: string
): AnyAction => ({
  type: OPEN_DELETE_MODAL,
  open,
  storeId
})

export const deleteLoadingAction = (loading: boolean): AnyAction => ({
  type: OPEN_DELETE_MODAL,
  loading
})

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})

export const openShareModalAction = (
  open: boolean,
  storeId?: string
): AnyAction => {
  return {
    type: OPEN_SHARE_MODAL,
    open,
    storeId
  }
}

export const setIdStoreAction = (storeId: string): AnyAction => ({
  type: SET_STOREID_TO_DELETE,
  storeId
})

export const setSkipValueAction = (
  skip: number,
  currentPage: number
): AnyAction => ({
  type: SET_SKIP_VALUE,
  skip,
  currentPage
})
