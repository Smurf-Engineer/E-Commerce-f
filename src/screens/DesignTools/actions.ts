/**
 * DesignTools  Actions - Created by Jesús Apodaca on 04/12/19.
 */

import {
  ON_RESET_REDUCER,
  SET_GOOGLE_FONTS,
  ADD_FONT_ACTION,
  UPDATE_SEARCH_TEXT_ACTION,
  SET_UPLOADING_COLORS_ACTION,
  SET_UPLOADING_ACTION,
  ON_TAB_CLICK_ACTION,
  SET_COLORS,
  CHANGE_FONT_ACTION
} from './constants'

import { AnyAction } from '../../types/common'

export const onResetReducer = (): AnyAction => ({
  type: ON_RESET_REDUCER
})

export const setGoogleFontsListAction = (data: any): AnyAction => ({
  type: SET_GOOGLE_FONTS,
  data
})

export const addFont = (font: string): AnyAction => ({
  type: ADD_FONT_ACTION,
  font
})

export const changeFont = (font: string, active: boolean): AnyAction => ({
  type: CHANGE_FONT_ACTION,
  font,
  active
})

export const onUpdateSearchText = (text: string): AnyAction => ({
  type: UPDATE_SEARCH_TEXT_ACTION,
  text
})

export const setUploadingColorsAction = (
  listType: string,
  isUploading: boolean
): AnyAction => ({
  type: SET_UPLOADING_COLORS_ACTION,
  listType,
  isUploading
})

export const setUploadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_UPLOADING_ACTION,
  isLoading
})

export const onTabClick = (selectedIndex: number): AnyAction => ({
  type: ON_TAB_CLICK_ACTION,
  selectedIndex
})

export const setColorList = (
  listType: string,
  colors: string[]
): AnyAction => ({
  type: SET_COLORS,
  listType,
  colors
})
