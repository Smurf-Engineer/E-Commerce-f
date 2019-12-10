/**
 * DesignTools  Actions - Created by Jesús Apodaca on 04/12/19.
 */

import {
  ON_RESET_REDUCER,
  SET_GOOGLE_FONTS,
  SET_COLOR_ACTION,
  TOGGLE_EXTRA_COLOR_ACTION,
  SET_COLOR_BLOCK_ACTION,
  COLOR_BLOCK_HOVERED_ACTION,
  ADD_FONT_ACTION,
  UPDATE_SEARCH_TEXT_ACTION,
  SET_UPLOADING_COLORS_ACTION,
  SET_UPLOADING_ACTION,
  SET_UPLOADING_SUCCESS,
  SET_SEARCH_CLIPARTPARAM,
  SET_TEXT_ACTION,
  SET_TEXT_FORMAT_ACTION,
  SET_ART_FORMAT_ACTION,
  ON_TAB_CLICK_ACTION,
  SET_COLORS,
  UPLOADING_SYMBOL_ACTION,
  ADD_SYMBOL_ACTION,
  HIDE_SYMBOL_ACTION,
  CHANGE_FONT_ACTION
} from './constants'

import { AnyAction, ModelConfig } from '../../types/common'

export const onResetReducer = (): AnyAction => ({
  type: ON_RESET_REDUCER
})

export const setGoogleFontsListAction = (data: any) => ({
  type: SET_GOOGLE_FONTS,
  data
})

export const onSelectColor = (color: string): AnyAction => ({
  type: SET_COLOR_ACTION,
  color
})

export const onToggleColor = (color: string) => ({
  type: TOGGLE_EXTRA_COLOR_ACTION,
  color
})

export const onSelectColorBlock = (index: number): AnyAction => ({
  type: SET_COLOR_BLOCK_ACTION,
  index
})

export const onHoverColorBlock = (index: number): AnyAction => ({
  type: COLOR_BLOCK_HOVERED_ACTION,
  index
})

export const addFont = (font: string) => ({
  type: ADD_FONT_ACTION,
  font
})

export const changeFont = (font: string, active: boolean) => ({
  type: CHANGE_FONT_ACTION,
  font,
  active
})

export const onUpdateSearchText = (text: string) => ({
  type: UPDATE_SEARCH_TEXT_ACTION,
  text
})

export const setUploadingColorsAction = (
  listType: string,
  isUploading: boolean
) => ({
  type: SET_UPLOADING_COLORS_ACTION,
  listType,
  isUploading
})

export const setUploadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_UPLOADING_ACTION,
  isLoading
})

export const setUploadingSuccess = (modelConfig: ModelConfig): AnyAction => ({
  type: SET_UPLOADING_SUCCESS,
  modelConfig
})

export const setSearchClipParamAction = (param: string) => ({
  type: SET_SEARCH_CLIPARTPARAM,
  param
})

export const onUpdateText = (text: string): AnyAction => ({
  type: SET_TEXT_ACTION,
  text
})

export const setTextFormatAction = (
  key: string,
  value: string | number
): AnyAction => ({
  type: SET_TEXT_FORMAT_ACTION,
  key,
  value
})

export const onSelectArtFormat = (
  key: string,
  value: string | number
): AnyAction => ({
  type: SET_ART_FORMAT_ACTION,
  key,
  value
})

export const onTabClick = (selectedIndex: number) => ({
  type: ON_TAB_CLICK_ACTION,
  selectedIndex
})

export const setColorList = (listType: string, colors: string[]) => ({
  type: SET_COLORS,
  listType,
  colors
})

export const setUploadingSymbolAction = (isLoading: boolean) => ({
  type: UPLOADING_SYMBOL_ACTION,
  isLoading
})

export const addSymbolAction = (url: string) => ({
  type: ADD_SYMBOL_ACTION,
  url
})

export const hideSymbol = (id: string) => ({
  type: HIDE_SYMBOL_ACTION,
  id
})
