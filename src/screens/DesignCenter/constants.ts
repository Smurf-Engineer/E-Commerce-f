/**
 * DesignCenter Types - Created by david on 23/02/18.
 */
const namespace = 'src/DesignCenter'

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const CLEAR_STORE_ACTION = `${namespace}/CLEAR_STORE_ACTION`
export const SET_CURRENT_TAB_ACTION = `${namespace}/SET_CURRENT_TAB_ACTION`
export const SET_LOADING_MODEL = `${namespace}/SET_LOADING_MODEL`
export const DESIGN_UNDO_ACTION = `${namespace}/DESIGN_UNDO_ACTION`
export const DESIGN_REDO_ACTION = `${namespace}/DESIGN_REDO_ACTION`
export const EDIT_DESIGN_ACTION = `${namespace}/EDIT_DESIGN_ACTION`
export const SET_SWIPING_TAB_ACTION = `${namespace}/SET_SWIPING_TAB_ACTION`

export const SET_COLOR_BLOCK_ACTION = `${namespace}/SET_COLOR_BLOCK_ACTION`
export const SET_COLOR_ACTION = `${namespace}/SET_COLOR_ACTION`
export const SET_PALETTE_NAME_ACTION = `${namespace}/SET_PALETTE_NAME_ACTION`
export const SET_PALETTE_ACTION = `${namespace}/SET_PALETTE_ACTION`
export const SET_PALETTES_ACTION = `${namespace}/SET_PALETTES_ACTION`
export const DESIGN_RESET_ACTION = `${namespace}/DESIGN_RESET_ACTION`
export const DESIGN_CLEAR_ACTION = `${namespace}/DESIGN_CLEAR_ACTION`
export const SET_THEME_SELECTED_ACTION = `${namespace}/SET_THEME_SELECTED_ACTION`
export const SET_STYLE_SELECTED_ACTION = `${namespace}/SET_STYLE_SELECTED_ACTION`
export const SET_STYLE_COMPLEXITY_ACTION = `${namespace}/SET_STYLE_COMPLEXITY_ACTION`
export const COLOR_BLOCK_HOVERED_ACTION = `${namespace}/COLOR_BLOCK_HOVERED_ACTION`
export const SET_TEXT_ACTION = `${namespace}/SET_TEXT_ACTION`
export const SET_CANVAS_ELEMENT_ACTION = `${namespace}/SET_CANVAS_ELEMENT_ACTION`
export const SET_SELECTED_ELEMENT_ACTION = `${namespace}/SET_SELECTED_ELEMENT_ACTION`
export const REMOVE_CANVAS_ELEMENT_ACTION = `${namespace}/REMOVE_CANVAS_ELEMENT_ACTION`
export const SET_TEXT_FORMAT_ACTION = `${namespace}/SET_TEXT_FORMAT_ACTION`
export const SET_ART_FORMAT_ACTION = `${namespace}/SET_ART_FORMAT_ACTION`
export const SET_CUSTOMIZE_3D_MOUNTED = `${namespace}/SET_CUSTOMIZE_3D_MOUNTED`
export const SET_CANVAS_JSON_ACTION = `${namespace}/SET_CANVAS_JSON_ACTION`

export const OPEN_SHARE_MODAL = `${namespace}/OPEN_SHARE_MODAL`
export const OPEN_SAVE_DESIGN_ACTION = `${namespace}/OPEN_SAVE_DESIGN_ACTION`
export const SET_DESIGN_NAME = `${namespace}/SET_DESIGN_NAME`
export const SAVE_DESIGN_ID = `${namespace}/SAVE_DESIGN_ID`
export const SET_CHECKED_TERMS = `${namespace}/SET_CHECKED_TERMS`
export const CLEAR_DESIGN_INFO = `${namespace}/CLEAR_DESIGN_INFO`
export const SAVE_DESIGN_LOADING = `${namespace}/SAVE_DESIGN_LOADING`
export const OPEN_ADD_TOTEAMSTORE = `${namespace}/ADD_TOTEAMSTORE`
export const SET_ITEM_TOADD = `${namespace}/SET_ITEM_TOADD`

export const OPEN_OUT_WITHOUT_SAVE_MODAL = `${namespace}/OPEN_OUT_WITHOUT_SAVE_MODAL`
export const OPEN_DELETE_OR_APPLY_PALETTE_MODAL = `${namespace}/OPEN_DELETE_OR_APPLY_PALETTE_MODAL`
export const OPEN_RESET_DESIGN_MODAL = `${namespace}/OPEN_RESET_DESIGN_MODAL`
export const OPEN_NEW_THEME_MODAL = `${namespace}/OPEN_NEW_THEME_MODAL`
export const OPEN_NEW_STYLE_MODAL = `${namespace}/OPEN_NEW_STYLE_MODAL`
export const SET_DESIGN_HAS_CHANGES = `${namespace}/SET_DESIGN_HAS_CHANGES`

export const SET_STITCHING_COLOR_ACTION = `${namespace}/SET_STITCHING_COLOR_ACTION`
export const SET_ACCESSORY_COLOR_ACTION = `${namespace}/SET_ACCESSORY_COLOR_ACTION`

export enum DesignTabs {
  ThemeTab = 0,
  StyleTab = 1,
  CustomizeTab = 2,
  PreviewTab = 3
}

export const BLACK = 'black'
export const WHITE = 'white'

export enum Changes {
  Colors = 'colors',
  Add = 'add',
  Delete = 'delete',
  Move = 'move',
  Rotate = 'rotate',
  Resize = 'resize',
  Duplicate = 'duplicate'
}

export enum CanvasElements {
  Text = 'text',
  Path = 'path',
  Image = 'image'
}
