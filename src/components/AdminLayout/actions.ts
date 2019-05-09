import {
  SET_OPEN_KEYS,
  LOGOUT,
  SET_INSTALLED_FONTS_ACTION,
  SET_CURRENT_SCREEN
} from './constants'
import { AnyAction } from '../../types/common'

export const logoutAction = (): AnyAction => ({
  type: LOGOUT
})

export const setInstalledFontsAction = (fonts: any) => ({
  type: SET_INSTALLED_FONTS_ACTION,
  fonts
})

export const setOpenKeysAction = (keys: string[]): AnyAction => ({
  type: SET_OPEN_KEYS,
  keys
})

export const setCurrentScreenAction = (screen: string) => ({
  type: SET_CURRENT_SCREEN,
  screen
})
