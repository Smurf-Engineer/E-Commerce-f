/**
 * OrderHistoryAdmin  Actions - Created by eduardoquintero on 07/05/19.
 */

import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_ORDER_ID,
  SET_SEARCH_TEXT,
  SET_FILTERS
} from './constants'
import { Moment } from 'moment'

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

export const setOrderIdAction = (orderId: string): AnyAction => ({
  type: SET_ORDER_ID,
  orderId
})

export const setSearchTextAction = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  searchText
})

export const setFilterStatusAction = (status: string) => ({
  type: SET_FILTER_STATUS,
  status
})

export const setFilterOrderPointAction = (orderPoint: string) => ({
  type: SET_FILTER_ORDER_POINT,
  orderPoint
})

export const onSelectStartDateAction = (date: Moment): AnyAction => ({
  type: SET_START_DATE,
  date
})

export const onSelectEndDateAction = (date: Moment): AnyAction => ({
  type: SET_END_DATE,
  date
})

export const setFiltersAction = (
  status: string,
  orderPoint: string,
  startDate: Moment,
  endDate: Moment
) => ({
  type: SET_FILTERS,
  status,
  orderPoint,
  startDate,
  endDate
})
