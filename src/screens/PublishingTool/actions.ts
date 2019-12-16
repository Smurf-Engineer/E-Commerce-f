/**
 * PublishingTool  Actions - Created by eduardoquintero on 19/09/19.
 */

import {
  ON_RESET_REDUCER,
  SET_PRODUCT_CODE,
  ON_CHANGE_THEME,
  SET_THEME_TO_EDIT_ACTION,
  UPDATE_THEME_NAME_ACTION
} from './constants'

import { AnyAction, Theme } from '../../types/common'

export const onResetReducer = (): AnyAction => ({
  type: ON_RESET_REDUCER
})

export const setProductCodeAction = (value: string): AnyAction => ({
  type: SET_PRODUCT_CODE,
  value
})

export const onChangeThemeAction = (id: number): AnyAction => ({
  type: ON_CHANGE_THEME,
  id
})

export const setThemeToEditAction = (theme: Theme | null): AnyAction => ({
  type: SET_THEME_TO_EDIT_ACTION,
  theme
})

export const updateThemeNameAction = (name: string): AnyAction => ({
  type: UPDATE_THEME_NAME_ACTION,
  name
})
