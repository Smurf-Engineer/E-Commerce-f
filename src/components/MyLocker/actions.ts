/**
 * MyLocker  Actions - Created by miguelcanobbio on 21/06/18.
 */
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_DESIGNS_DATA,
  SET_ERROR
} from './constants'
import { AnyAction, DesignResultType } from '../../types/common'

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
