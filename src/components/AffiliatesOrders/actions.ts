/**
 * AffiliatesOrders Actions - Created by Jesús Apodaca on 26/05/20.
 */

import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_DATE,
  SET_SHOW,
  SET_STATUS,
  SET_ORDER_POINT,
} from './constants'
import { AnyAction } from '../../types/common'

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})

export const changeDateAction = (startDate: string, endDate: string) => ({
  type: SET_DATE,
  startDate,
  endDate
})

export const setShowAction = (): AnyAction => ({
  type: SET_SHOW
})

export const setStatus = (value: string) => ({
  type: SET_STATUS,
  value
})

export const setOrderPoint = (value: string) => ({
  type: SET_ORDER_POINT,
  value
})