/**
 * PublishingTool Types - Created by eduardoquintero on 02/12/19.
 */
const namespace = 'src/PublishingTool'

export const ON_RESET_REDUCER = `${namespace}/ON_RESET_REDUCER`
export const SET_PRODUCT_CODE = `${namespace}/SET_PRODUCT_CODE`
export const ON_CHANGE_THEME = `${namespace}/ON_CHANGE_THEME`
export const SET_THEME_TO_EDIT_ACTION = `${namespace}/SET_THEME_TO_EDIT_ACTION`
export const UPDATE_THEME_NAME_ACTION = `${namespace}/UPDATE_THEME_NAME_ACTION`
export const SET_THEME_NAME_ACTION = `${namespace}/SET_THEME_NAME_ACTION`
export const SET_CURRENT_PAGE = `${namespace}/SET_CURRENT_PAGE`
export const TOGGLE_ADD_DESIGN = `${namespace}/TOGGLE_ADD_DESIGN`
export const UPDATE_DESIGN_NAME = `${namespace}/UPDATE_DESIGN_NAME`
export const SET_UPLOADING = `${namespace}/SET_UPLOADING`
export const SET_UPLOADING_DESIGN_SUCCESS = `${namespace}/SET_UPLOADING_DESIGN_SUCCESS`
export const ON_SELECT_TAB = `${namespace}/ON_SELECT_TAB`
export const SET_MODEL_ACTION = `${namespace}/SET_MODEL_ACTION`
export const UNSELECT = `${namespace}/UNSELECT`
export const EDIT_COLOR_IDEA_ACTION = `${namespace}/EDIT_COLOR_IDEA_ACTION`
export const SET_COLOR_BLOCK_ACTION = `${namespace}/SET_COLOR_BLOCK_ACTION`
export const SET_COLOR_ACTION = `${namespace}/SET_COLOR_ACTION`
export const COLOR_BLOCK_HOVERED_ACTION = `${namespace}/COLOR_BLOCK_HOVERED_ACTION`
export const UPDATE_COLOR_IDEA_NAME_ACTION = `${namespace}/UPDATE_COLOR_IDEA_NAME_ACTION`
export const SET_INSPIRATION_COLOR_ACTION = `${namespace}/SET_INSPIRATION_COLOR_ACTION`
export const SET_LOADING_MODEL = `${namespace}/SET_LOADING_MODEL`
export const ADD_COLOR_IDEA_ACTION = `${namespace}/ADD_COLOR_IDEA_ACTION`
export const SET_THUMBNAIL_ACTION = `${namespace}/SET_THUMBNAIL_ACTION`
export const SET_UPLOADING_THUMBNAIL_ACTION = `${namespace}/SET_UPLOADING_THUMBNAIL_ACTION`

export const THEME_PAGE = 0
export const DESIGN_PAGE = 1

export const SETTINGS_TAB = 0
export const COLORS_TAB = 1

export const enum Sections {
  Theme = 'theme',
  Design = 'design'
}
