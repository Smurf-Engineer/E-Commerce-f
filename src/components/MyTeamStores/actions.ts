import {
  OPEN_DELETE_MODAL,
  DELETE_LOADING,
  CLEAR_REDUCER,
  OPEN_SHARE_MODAL
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
