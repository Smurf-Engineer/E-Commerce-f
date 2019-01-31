/**
 * Account  Actions - Created by david on 05/04/18.
 */
import {
  DEFAULT_ACTION,
  SET_OPEN_KEYS,
  SET_CURRENT_SCREEN,
  SET_DEFAULT_SCREEN,
  CLEAR_REDUCER,
  SET_IS_MOBILE,
  OPEN_SIDEBAR_MOBILE,
  SET_CURRENT_SHARE
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setOpenKeysAction = (keys: string[]): AnyAction => ({
  type: SET_OPEN_KEYS,
  keys
})

export const setDefaultScreenAction = (
  screen: string,
  openCreations?: boolean
): AnyAction => ({
  type: SET_DEFAULT_SCREEN,
  screen,
  openCreations: true
})

export const setCurrentScreenAction = (screen: string) => ({
  type: SET_CURRENT_SCREEN,
  screen
})

export const setCurrentShare = (
  savedDesignId: string,
  openShareModal: boolean
) => ({
  type: SET_CURRENT_SHARE,
  savedDesignId,
  openShareModal
})

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})

export const setIsMobileAction = (isMobile: boolean): AnyAction => ({
  type: SET_IS_MOBILE,
  isMobile
})

export const openSidebarMobile = (open: boolean) => ({
  type: OPEN_SIDEBAR_MOBILE,
  open
})
