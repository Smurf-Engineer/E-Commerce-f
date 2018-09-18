import {
  SHOW_HEADER_SEARCH_RESULTS,
  SET_SEARCH_PARAM,
  OPEN_QUICKVIEW_ACTION,
  OPEN_LOGIN_MODAL,
  LOGOUT,
  SAVE_USER_TO_LOCAL,
  GET_TOTAL_CART_ITEMS,
  OPEN_LOGOUT_MODAL
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
  yotpoId: string | null,
  gender: number
): AnyAction => ({
  type: OPEN_QUICKVIEW_ACTION,
  id,
  yotpoId,
  gender
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

export const getTotalItemsIncart = (): AnyAction => ({
  type: GET_TOTAL_CART_ITEMS
})

export const openLogoutModalAction = (open: boolean): AnyAction => ({
  type: OPEN_LOGOUT_MODAL,
  open
})