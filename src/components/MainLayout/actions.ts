import {
  SHOW_HEADER_SEARCH_RESULTS,
  SET_SEARCH_PARAM,
  OPEN_QUICKVIEW_ACTION,
  OPEN_LOGIN_MODAL,
  LOGOUT,
  SAVE_USER_TO_LOCAL,
  GET_TOTAL_CART_ITEMS,
  OPEN_LOGOUT_MODAL,
  SAVE_AND_BUY,
  SET_INSTALLED_FONTS_ACTION,
  OPEN_RESELLER,
  SET_USER_LOCATION_INFO_ACTION
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
  gender?: number,
  hideSliderButtons?: boolean
): AnyAction => ({
  type: OPEN_QUICKVIEW_ACTION,
  id,
  yotpoId,
  gender,
  hideSliderButtons
})

export const openLoginAction = (
  open: boolean,
  callback: boolean = false
): AnyAction => ({
  type: OPEN_LOGIN_MODAL,
  open,
  callback
})

export const saveUserToLocal = (user: object): AnyAction => ({
  type: SAVE_USER_TO_LOCAL,
  user
})

export const logoutAction = (): AnyAction => ({
  type: LOGOUT
})

export const openResellerAction = (open: boolean): AnyAction => ({
  type: OPEN_RESELLER,
  open
})

export const getTotalItemsIncart = (): AnyAction => ({
  type: GET_TOTAL_CART_ITEMS
})

export const openLogoutModalAction = (open: boolean): AnyAction => ({
  type: OPEN_LOGOUT_MODAL,
  open
})

export const saveAndBuyAction = (buy: boolean) => ({
  type: SAVE_AND_BUY,
  buy
})

export const setInstalledFontsAction = (fonts: any) => ({
  type: SET_INSTALLED_FONTS_ACTION,
  fonts
})

export const setUserLocationInfoAction = (
  countryName: string,
  countryCode: string,
  regionName: string,
  city: string
) => ({
  type: SET_USER_LOCATION_INFO_ACTION,
  countryName,
  countryCode,
  regionName,
  city
})
