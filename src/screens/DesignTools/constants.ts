/**
 * DesignTools Types - Created by Jesús Apodaca on 04/12/19.
 */
const namespace = 'src/DesignTools'

export const ON_RESET_REDUCER = `${namespace}/ON_RESET_REDUCER`

export const SET_GOOGLE_FONTS = `${namespace}/SET_GOOGLE_FONTS`
export const ADD_FONT_ACTION = `${namespace}/ADD_FONT_ACTION`
export const UPDATE_SEARCH_TEXT_ACTION = `${namespace}/UPDATE_SEARCH_TEXT_ACTION`
export const SET_UPLOADING_COLORS_ACTION = `${namespace}/SET_UPLOADING_COLORS_ACTION`
export const SET_UPLOADING_ACTION = `${namespace}/SET_UPLOADING_ACTION`
export const SET_SEARCH_CLIPARTPARAM = `${namespace}/SET_SEARCH_CLIPARTPARAM`
export const ON_TAB_CLICK_ACTION = `${namespace}/ON_TAB_CLICK_ACTION`
export const SET_COLORS = `${namespace}/SET_COLORS`
export const UPLOADING_SYMBOL_ACTION = `${namespace}/UPLOADING_SYMBOL_ACTION`
export const ADD_SYMBOL_ACTION = `${namespace}/ADD_SYMBOL_ACTION`
export const HIDE_SYMBOL_ACTION = `${namespace}/HIDE_SYMBOL_ACTION`
export const CHANGE_FONT_ACTION = `${namespace}/CHANGE_FONT_ACTION`

export enum CustomizeTabs {
  ColorTab = 'COLOR_TAB',
  SymbolTab = 'SYMBOLS_TAB',
  TextTab = 'FONT_TAB'
}

export const ALLOWED_EXTENSIONS = ['.svg']
