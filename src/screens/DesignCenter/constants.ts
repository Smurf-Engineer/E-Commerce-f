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
export const SET_VIDEOS = `${namespace}/SET_VIDEOS`
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
export const SAVE_DESIGN_CHANGES_LOADING = `${namespace}/SAVE_DESIGN_CHANGES_LOADING`
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
export const SET_PREDYED_COLOR = `${namespace}/SET_PREDYED_COLOR`

export const SET_UPLOADING_FILE_ACTION = `${namespace}/SET_UPLOADING_FILE_ACTION`
export const UPLOAD_FILE_ACTION_SUCCESS = `${namespace}/UPLOAD_FILE_ACTION_SUCCESS`
export const SET_SEARCH_CLIPARTPARAM = `${namespace}/SET_SEARCH_CLIPARTPARAM`
export const CANVAS_ELEMENT_RESIZED_ACTION = `${namespace}/CANVAS_ELEMENT_RESIZED_ACTION`
export const CANVAS_ELEMENT_DRAGGED_ACTION = `${namespace}/CANVAS_ELEMENT_DRAGGED_ACTION`
export const CANVAS_ELEMENT_ROTATED_ACTION = `${namespace}/CANVAS_ELEMENT_ROTATED_ACTION`
export const CANVAS_ELEMENT_TEXT_CHANGED = `${namespace}/CANVAS_ELEMENT_TEXT_CHANGED`
export const REAPPLY_CANVAS_IMAGE_ACTION = `${namespace}/REAPPLY_CANVAS_IMAGE_ACTION`
export const CANVAS_ELEMENT_DUPLICATED_ACTION = `${namespace}/CANVAS_ELEMENT_DUPLICATED_ACTION`

export const SET_EDIT_DESIGN_CONFIG_ACTION = `${namespace}/SET_EDIT_DESIGN_CONFIG_ACTION`
export const SET_INITIAL_LOAD_CUSTOMIZE_ACTION = `${namespace}/SET_INITIAL_LOAD_CUSTOMIZE_ACTION`
export const SET_LOADED_CANVAS_ACTION = `${namespace}/SET_LOADED_CANVAS_ACTION`
export const DESIGN_RESET_EDITING_ACTION = `${namespace}/DESIGN_RESET_EDITING_ACTION`
export const SET_SELECTED_ITEM_ACTION = `${namespace}/SET_SELECTED_ITEM_ACTION`

export const SET_AUTOMATIC_SAVE = `${namespace}/SET_AUTOMATIC_SAVE`

export const ON_CLOSE_INFO = `${namespace}/ON_CLOSE_INFO`

export const ON_TAB_CLICK_ACTION = `${namespace}/ON_TAB_CLICK_ACTION`

export const ON_LOCK_ELEMENT_ACTION = `${namespace}/ON_LOCK_ELEMENT_ACTION`
export const OPEN_RESET_PLACEHOLDER_MODAL = `${namespace}/OPEN_RESET_PLACEHOLDER_MODAL`
export const SET_SENDING_CHART = `${namespace}/SET_SENDING_CHART`
export const ON_OPEN_COLOR_CHART = `${namespace}/ON_OPEN_COLOR_CHART`
export const ON_OPEN_COLOR_CHART_FORM = `${namespace}/ON_OPEN_COLOR_CHART_FORM`
export const SELECT_VARIANT = `${namespace}/SELECT_VARIANT`
export const SHOW_GUIDELINE = `${namespace}/SHOW_GUIDELINE`
export const SET_LOADING_PRO = `${namespace}/SET_LOADING_PRO`
export const OPEN_DESIGN_CHECK_MODAL = `${namespace}/OPEN_DESIGN_CHECK_MODAL`
export const SET_TICKET = `${namespace}/SET_TICKET`

export enum DesignTabs {
  ThemeTab = 0,
  StyleTab = 1,
  CustomizeTab = 2,
  PreviewTab = 3
}

export enum CustomizeTabs {
  ColorsTab = 1,
  TextTab = 2,
  SymbolsTab = 3,
  ImagesTab = 4,
  TutorialsTab = 5
}

export const BLACK = 'black'
export const WHITE = 'white'

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

export enum CanvasElements {
  Text = 'text',
  Path = 'path',
  Polygon = 'polygon',
  Image = 'image',
  Group = 'group'
}

export enum AccessoryColors {
  Binding = 'bindingColor',
  Zipper = 'zipperColor',
  Bib = 'bibColor',
  Stitching = 'stitchingColor',
  Predyed = 'predyed'
}

export const defaultBindings = {
  '238': { value: 'white', name: 'Pom Pom' }
}

export const ElementsToApplyScale = [CanvasElements.Image]
