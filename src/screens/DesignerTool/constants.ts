/**
 * DesignerTool Types - Created by david on 08/05/18.
 */
const namespace = 'src/DesignerTool'

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const SET_LOADING_MODEL = `${namespace}/SET_LOADING_MODEL`
export const SET_COLOR_BLOCK_ACTION = `${namespace}/SET_COLOR_BLOCK_ACTION`
export const SET_COLOR_ACTION = `${namespace}/SET_COLOR_ACTION`
export const COLOR_BLOCK_HOVERED_ACTION = `${namespace}/COLOR_BLOCK_HOVERED_ACTION`
export const SET_UPLOADING_ACTION = `${namespace}/SET_UPLOADING_ACTION`
export const SET_UPLOADING_SUCCESS = `${namespace}/SET_UPLOADING_SUCCESS`
export const SET_UPLOADING_DESIGN_SUCCESS = `${namespace}/SET_UPLOADING_DESIGN_SUCCESS`
export const SET_CURRENT_TAB_ACTION = `${namespace}/SET_CURRENT_TAB_ACTION`
export const SET_SWIPING_TAB_ACTION = `${namespace}/SET_SWIPING_TAB_ACTION`
export const SET_SELECTED_THEME_ACTION = `${namespace}/SET_SELECTED_THEME_ACTION`
export const SET_SELECTED_STYLE_ACTION = `${namespace}/SET_SELECTED_STYLE_ACTION`
export const SET_DESIGN_CONFIG_ACTION = `${namespace}/SET_DESIGN_CONFIG_ACTION`
export const SET_INSPIRATION_COLOR_ACTION = `${namespace}/SET_INSPIRATION_COLOR_ACTION`
export const SET_PRODCUT_CODE_ACTION = `${namespace}/SET_PRODCUT_CODE_ACTION`
export const SET_THEME_NAME_ACTION = `${namespace}/SET_THEME_NAME_ACTION`
export const SET_DESIGN_NAME_ACTION = `${namespace}/SET_DESIGN_NAME_ACTION`
export const SET_COMPLEXITY_ACTION = `${namespace}/SET_COMPLEXITY_ACTION`
export const SET_THUMBNAIL_ACTION = `${namespace}/SET_THUMBNAIL_ACTION`
export const SET_UPLOADING_THUMBNAIL_ACTION = `${namespace}/SET_UPLOADING_THUMBNAIL_ACTION`
export const ADD_EXTRA_FILE_ACTION = `${namespace}/ADD_EXTRA_FILE_ACTION`
export const REMOVE_EXTRA_FILE_ACTION = `${namespace}/REMOVE_EXTRA_FILE_ACTION`
export const TOGGLE_EXTRA_COLOR_ACTION = `${namespace}/TOGGLE_EXTRA_COLOR_ACTION`
export const SAVE_DESIGN_SUCCESS_ACTION = `${namespace}/SAVE_DESIGN_SUCCESS_ACTION`
export const EDIT_COLOR_IDEA_ACTION = `${namespace}/EDIT_COLOR_IDEA_ACTION`
export const SET_MODEL_ACTION = `${namespace}/SET_MODEL_ACTION`
export const DELETE_COLOR_IDEA_ACTION = `${namespace}/DELETE_COLOR_IDEA_ACTION`
export const UPDATE_COLOR_IDEA_NAME_ACTION = `${namespace}/UPDATE_COLOR_IDEA_NAME_ACTION`
export const ADD_COLOR_IDEA_ACTION = `${namespace}/ADD_COLOR_IDEA_ACTION`
export const SET_THEME_TO_EDIT_ACTION = `${namespace}/SET_THEME_TO_EDIT_ACTION`
export const UPDATE_THEME_NAME_ACTION = `${namespace}/UPDATE_THEME_NAME_ACTION`
export const OPEN_SAVE_DESIGN_ACTION = `${namespace}/OPEN_SAVE_DESIGN_ACTION`
export const SET_SAVING_DESIGN = `${namespace}/SET_SAVING_DESIGN`
export const SET_GOOGLE_FONTS = `${namespace}/SET_GOOGLE_FONTS`
export const ADD_FONT_ACTION = `${namespace}/ADD_FONT_ACTION`
export const UPDATE_SEARCH_TEXT_ACTION = `${namespace}/UPDATE_SEARCH_TEXT_ACTION`
export const SET_UPLOADING_COLORS_ACTION = `${namespace}/SET_UPLOADING_COLORS_ACTION`
export const UPLOAD_SYMBOL_ACTION_SUCCESS = `${namespace}/UPLOAD_SYMBOL_ACTION_SUCCESS`
export const UPLOADING_SYMBOL_ACTION = `${namespace}/UPLOADING_SYMBOL_ACTION`
export const SET_SEARCH_CLIPARTPARAM = `${namespace}/SET_SEARCH_CLIPARTPARAM`
export const SET_LOADED_CANVAS_ACTION = `${namespace}/SET_LOADED_CANVAS_ACTION`
export const SET_STYLE_MODE_ACTION = `${namespace}/SET_STYlE_MODE_ACTION`
export const SET_EDIT_DESIGN_CONFIG_ACTION = `${namespace}/SET_EDIT_DESIGN_CONFIG_ACTION`
export const SET_SELECTED_ELEMENT_ACTION = `${namespace}/SET_SELECTED_ELEMENT_ACTION`
export const CANVAS_ELEMENT_DRAGGED_ACTION = `${namespace}/CANVAS_ELEMENT_DRAGGED_ACTION`
export const CANVAS_ELEMENT_RESIZED_ACTION = `${namespace}/CANVAS_ELEMENT_RESIZED_ACTION`
export const CANVAS_ELEMENT_ROTATED_ACTION = `${namespace}/CANVAS_ELEMENT_ROTATED_ACTION`
export const CANVAS_ELEMENT_DUPLICATED_ACTION = `${namespace}/CANVAS_ELEMENT_DUPLICATED_ACTION`
export const REMOVE_CANVAS_ELEMENT_ACTION = `${namespace}/REMOVE_CANVAS_ELEMENT_ACTION`
export const SET_TEXT_ACTION = `${namespace}/SET_TEXT_ACTION`
export const SET_CANVAS_ELEMENT_ACTION = `${namespace}/SET_CANVAS_ELEMENT_ACTION`
export const SET_SELECTED_ITEM_ACTION = `${namespace}/SET_SELECTED_ITEM_ACTION`
export const CANVAS_ELEMENT_TEXT_CHANGED = `${namespace}/CANVAS_ELEMENT_TEXT_CHANGED`
export const SET_TEXT_FORMAT_ACTION = `${namespace}/SET_TEXT_FORMAT_ACTION`
export const SET_CANVAS_JSON_ACTION = `${namespace}/SET_CANVAS_JSON_ACTION`
export const SET_CUSTOMIZE_3D_MOUNTED = `${namespace}/SET_CUSTOMIZE_3D_MOUNTED`
export const DESIGN_RESET_EDITING_ACTION = `${namespace}/DESIGN_RESET_EDITING_ACTION`
export const REAPPLY_CANVAS_IMAGE_ACTION = `${namespace}/REAPPLY_CANVAS_IMAGE_ACTION`
export const SET_ART_FORMAT_ACTION = `${namespace}/SET_ART_FORMAT_ACTION`
export const ON_TAB_CLICK_ACTION = `${namespace}/ON_TAB_CLICK_ACTION`
export const UPDATE_COLOR_IDEAS_LIST = `${namespace}/UPDATE_COLOR_IDEAS_LIST`

export enum Tabs {
  RenderTab = 0,
  SettingsTab = 0
}

export enum CustomizeTabs {
  ProductTab = 'SETTINGS_TAB',
  UploadTab = 'UPLOAD_TAB',
  ConfigTab = 'SETTINGS_TAB',
  ColorTab = 'COLOR_TAB',
  SymbolTab = 'SYMBOLS_TAB',
  TextTab = 'FONT_TAB'
}

export enum CanvasElements {
  Text = 'text',
  Path = 'path',
  Image = 'image',
  Group = 'group'
}

export const Mode = {
  Style: 'style',
  Placeholder: 'placeholder'
}

export enum Changes {
  Colors = 'colors',
  Add = 'add',
  Delete = 'delete',
  Drag = 'drag',
  Rotate = 'rotate',
  Resize = 'resize',
  Duplicate = 'duplicate',
  AccessoryColors = 'accessoryColor',
  CanvasStyle = 'canvasStyle',
  ChangeText = 'changeText'
}

export const BLACK = 'black'
export const WHITE = 'white'

export const ElementsToApplyScale = [CanvasElements.Image]
