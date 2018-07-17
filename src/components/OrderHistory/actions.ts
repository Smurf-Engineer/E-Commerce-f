/**
 * OrderHistory  Actions - Created by miguelcanobbio on 06/16/18.
 */

import { SET_ORDER_BY, SET_CURRENT_PAGE, RESET_DATA } from './constants'
import { AnyAction, sorts } from '../../types/common'

export const setOrderByAction = (orderBy: string, sort: sorts): AnyAction => ({
  type: SET_ORDER_BY,
  orderBy,
  sort
})

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})
