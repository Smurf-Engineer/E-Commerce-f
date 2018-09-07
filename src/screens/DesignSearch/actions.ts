/**
 * DesignSearch  Actions - Created by miguelcanobbio on 15/08/18.
 */
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_ORDER,
  SET_NOT_FOUND,
  RESET_DATA
} from './constants'
import { AnyAction, OrderSearchResult } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setLoadingAction = (): AnyAction => ({
  type: SET_LOADING
})

export const setOrderAction = (order: OrderSearchResult): AnyAction => ({
  type: SET_ORDER,
  order
})

export const setNotFoundAction = (noAdmin?: boolean): AnyAction => ({
  type: SET_NOT_FOUND,
  noAdmin
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})
