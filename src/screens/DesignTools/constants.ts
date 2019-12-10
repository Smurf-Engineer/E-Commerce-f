/**
 * DesignTools Types - Created by Jesús Apodaca on 04/12/19.
 */
const namespace = 'src/DesignTools'

export const ON_RESET_REDUCER = `${namespace}/ON_RESET_REDUCER`

export const SET_GOOGLE_FONTS = `${namespace}/SET_GOOGLE_FONTS`
export const SET_COLOR_ACTION = `${namespace}/SET_COLOR_ACTION`
export const TOGGLE_EXTRA_COLOR_ACTION = `${namespace}/TOGGLE_EXTRA_COLOR_ACTION`
export const SET_COLOR_BLOCK_ACTION = `${namespace}/SET_COLOR_BLOCK_ACTION`
export const COLOR_BLOCK_HOVERED_ACTION = `${namespace}/COLOR_BLOCK_HOVERED_ACTION`
export const ADD_FONT_ACTION = `${namespace}/ADD_FONT_ACTION`
export const UPDATE_SEARCH_TEXT_ACTION = `${namespace}/UPDATE_SEARCH_TEXT_ACTION`
export const SET_UPLOADING_COLORS_ACTION = `${namespace}/SET_UPLOADING_COLORS_ACTION`
export const SET_UPLOADING_ACTION = `${namespace}/SET_UPLOADING_ACTION`
export const SET_UPLOADING_SUCCESS = `${namespace}/SET_UPLOADING_SUCCESS`
export const SET_SEARCH_CLIPARTPARAM = `${namespace}/SET_SEARCH_CLIPARTPARAM`
export const SET_TEXT_ACTION = `${namespace}/SET_TEXT_ACTION`
export const SET_TEXT_FORMAT_ACTION = `${namespace}/SET_TEXT_FORMAT_ACTION`
export const SET_ART_FORMAT_ACTION = `${namespace}/SET_ART_FORMAT_ACTION`
export const ON_TAB_CLICK_ACTION = `${namespace}/ON_TAB_CLICK_ACTION`
export const SET_COLORS = `${namespace}/SET_COLORS`
export const UPLOADING_SYMBOL_ACTION = `${namespace}/UPLOADING_SYMBOL_ACTION`
export const ADD_SYMBOL_ACTION = `${namespace}/ADD_SYMBOL_ACTION`
export const HIDE_SYMBOL_ACTION = `${namespace}/HIDE_SYMBOL_ACTION`
export const CHANGE_FONT_ACTION = `${namespace}/CHANGE_FONT_ACTION`

export const Mode = {
  Style: 'style',
  Placeholder: 'placeholder'
}
export enum CustomizeTabs {
  ColorTab = 'COLOR_TAB',
  SymbolTab = 'SYMBOLS_TAB',
  TextTab = 'FONT_TAB'
}
