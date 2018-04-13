/**
 * Teamstores  Actions - Created by cazarez on 10/04/18.
 */
import { DEFAULT_ACTION, SET_SEARCH_PARAM, OPEN_SHARE_MODAL } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setSearchParamAction = (param: string): AnyAction => {
  return {
    type: SET_SEARCH_PARAM,
    param
  }
}
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
