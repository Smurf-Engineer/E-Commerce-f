import {
  SHOW_HEADER_SEARCH_RESULTS,
  SET_SEARCH_PARAM,
  OPEN_QUICKVIEW_ACTION,
  OPEN_LOGIN_MODAL,
  LOGOUT,
  SAVE_USER_TO_LOCAL
} from './constants'
import { AnyAction } from '../../types/common'

export const showSearchResultsAction = (show: boolean): AnyAction => ({
  type: SHOW_HEADER_SEARCH_RESULTS,
  show
})

export const setSearchParam = (param: string): AnyAction => ({
  type: SET_SEARCH_PARAM,
  param
})

export const openQuickViewAction = (
  id: number,
  yotpoId: string | null
): AnyAction => ({
  type: OPEN_QUICKVIEW_ACTION,
  id,
  yotpoId
})

export const openLoginAction = (open: boolean): AnyAction => ({
  type: OPEN_LOGIN_MODAL,
  open
})

export const saveUserToLocal = (user: object): AnyAction => ({
  type: SAVE_USER_TO_LOCAL,
  user
})

export const logoutAction = (): AnyAction => ({
  type: LOGOUT
})
