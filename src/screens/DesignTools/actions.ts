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
  SET_SEARCH_CLIPARTPARAM,
  ON_TAB_CLICK_ACTION,
  SET_COLORS,
  UPLOADING_SYMBOL_ACTION,
  ADD_SYMBOL_ACTION,
  HIDE_SYMBOL_ACTION,
  CHANGE_FONT_ACTION
} from './constants'

import { AnyAction, Color } from '../../types/common'

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

export const setSearchClipParamAction = (param: string): AnyAction => ({
  type: SET_SEARCH_CLIPARTPARAM,
  param
})

export const onTabClick = (selectedIndex: string): AnyAction => ({
  type: ON_TAB_CLICK_ACTION,
  selectedIndex
})

export const setColorList = (listType: string, colors: Color[]): AnyAction => ({
  type: SET_COLORS,
  listType,
  colors
})

export const setUploadingSymbolAction = (isLoading: boolean): AnyAction => ({
  type: UPLOADING_SYMBOL_ACTION,
  isLoading
})

export const addSymbolAction = (url: string): AnyAction => ({
  type: ADD_SYMBOL_ACTION,
  url
})

export const hideSymbol = (url: string, id: string): AnyAction => ({
  type: HIDE_SYMBOL_ACTION,
  url,
  id
})
