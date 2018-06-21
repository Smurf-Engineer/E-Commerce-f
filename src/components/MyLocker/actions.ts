/**
 * MyLocker  Actions - Created by miguelcanobbio on 21/06/18.
 */
import { DEFAULT_ACTION, SET_SKIP_VALUE, SET_DESIGNS_DATA } from './constants'
import { AnyAction, Filter, DesignResultType } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setSkipValue = (skip: number, page: number) => ({
  type: SET_SKIP_VALUE,
  skip,
  page
})

export const setDesignsData = (data: DesignResultType) => ({
  type: SET_DESIGNS_DATA,
  data
})
