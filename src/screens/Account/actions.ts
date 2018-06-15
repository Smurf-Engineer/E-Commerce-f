/**
 * Account  Actions - Created by david on 05/04/18.
 */
import {
  DEFAULT_ACTION,
  SET_OPEN_KEYS,
  SET_CURRENT_SCREEN,
  CLEAR_REDUCER,
  SET_IS_MOBILE
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

export const setCurrentScreenAction = (screen: string): AnyAction => ({
  type: SET_CURRENT_SCREEN,
  screen
})

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})

export const setIsMobileAction = (isMobile: boolean): AnyAction => ({
  type: SET_IS_MOBILE,
  isMobile
})
