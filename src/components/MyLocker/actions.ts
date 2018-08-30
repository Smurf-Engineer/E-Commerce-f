/**
 * MyLocker  Actions - Created by miguelcanobbio on 21/06/18.
 */
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_DESIGNS_DATA,
  SET_ERROR,
  SET_DELETE_MODAL_DATA,
  SET_MODAL_LOADING,
  RESET_MODAL_DATA
} from './constants'
import {
  AnyAction,
  DesignResultType,
  DeleteDesignModal
} from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setDesignsData = (
  data: DesignResultType,
  offset: number,
  page: number
) => ({
  type: SET_DESIGNS_DATA,
  data,
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
