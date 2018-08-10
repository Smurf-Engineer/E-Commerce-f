/**
 * DesignCenter  Actions - Created by david on 23/02/18.
 */
import {
  DEFAULT_ACTION,
  CLEAR_STORE_ACTION,
  SET_CURRENT_TAB_ACTION,
  EDIT_DESIGN_ACTION,
  SET_COLOR_BLOCK_ACTION,
  SET_COLOR_ACTION,
  SET_STITCHING_COLOR_ACTION,
  SET_PALETTE_ACTION,
  SET_PALETTE_NAME_ACTION,
  SET_PALETTES_ACTION,
  SET_LOADING_MODEL,
  DESIGN_UNDO_ACTION,
  DESIGN_REDO_ACTION,
  DESIGN_RESET_ACTION,
  DESIGN_CLEAR_ACTION,
  SET_SWIPING_TAB_ACTION,
  SET_THEME_SELECTED_ACTION,
  SET_STYLE_SELECTED_ACTION,
  OPEN_SHARE_MODAL,
  OPEN_SAVE_DESIGN_ACTION,
  SET_DESIGN_NAME,
  SAVE_DESIGN_ID,
  COLOR_BLOCK_HOVERED_ACTION,
  SET_CHECKED_TERMS,
  CLEAR_DESIGN_INFO,
  SAVE_DESIGN_LOADING,
  SET_TEXT_ACTION,
  SET_STYLE_COMPLEXITY_ACTION,
  OPEN_ADD_TOTEAMSTORE,
  SET_ITEM_TOADD,
  SET_CANVAS_ELEMENT_ACTION,
  SET_SELECTED_ELEMENT_ACTION,
  REMOVE_CANVAS_ELEMENT_ACTION,
  SET_TEXT_FORMAT_ACTION,
  OPEN_DELETE_OR_APPLY_PALETTE_MODAL,
  OPEN_RESET_DESIGN_MODAL,
  OPEN_NEW_THEME_MODAL,
  OPEN_NEW_STYLE_MODAL,
  OPEN_OUT_WITHOUT_SAVE_MODAL,
  SET_DESIGN_HAS_CHANGES,
  SET_CUSTOMIZE_3D_MOUNTED,
  SET_ART_FORMAT_ACTION,
  SET_CANVAS_JSON_ACTION,
  SET_ACCESSORY_COLOR_ACTION,
  UPLOAD_FILE_ACTION_SUCCESS,
  SET_UPLOADING_FILE_ACTION,
  SET_SEARCH_CLIPARTPARAM,
  CANVAS_ELEMENT_RESIZED_ACTION,
  CANVAS_ELEMENT_DRAGGED_ACTION
} from './constants'
import {
  AnyAction,
  Palette,
  TeamStoreItemtype,
  CanvasElement,
  SaveDesignType,
  ConfigCanvasObj,
  Product,
  StitchingColor,
  AccesoryColor,
  DesignSaved,
  CanvasResized,
  CanvasDragged
} from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const clearStoreAction = (): AnyAction => ({
  type: CLEAR_STORE_ACTION
})

export const setCurrentTabAction = (index: number): AnyAction => ({
  type: SET_CURRENT_TAB_ACTION,
  index
})

export const setColorBlockAction = (index: number): AnyAction => ({
  type: SET_COLOR_BLOCK_ACTION,
  index
})

export const setHoverColorBlockAction = (index: number): AnyAction => ({
  type: COLOR_BLOCK_HOVERED_ACTION,
  index
})

export const setColorAction = (color: string): AnyAction => ({
  type: SET_COLOR_ACTION,
  color
})

export const setPaletteAction = (colors: string[]): AnyAction => ({
  type: SET_PALETTE_ACTION,
  colors
})

export const setPaletteNameAction = (name: string): AnyAction => ({
  type: SET_PALETTE_NAME_ACTION,
  name
})

export const setPalettesAction = (palettes: Palette[]): AnyAction => ({
  type: SET_PALETTES_ACTION,
  palettes
})

export const setLoadingModel = (loading: boolean): AnyAction => ({
  type: SET_LOADING_MODEL,
  loading
})

export const designUndoAction = (): AnyAction => ({
  type: DESIGN_UNDO_ACTION
})

export const designRedoAction = (): AnyAction => ({
  type: DESIGN_REDO_ACTION
})

export const designResetAction = (): AnyAction => ({
  type: DESIGN_RESET_ACTION
})

export const designClearAction = (): AnyAction => ({
  type: DESIGN_CLEAR_ACTION
})

export const setSwipingTabAction = (isSwiping: boolean): AnyAction => ({
  type: SET_SWIPING_TAB_ACTION,
  isSwiping
})

export const setThemeAction = (id: number, product: Product): AnyAction => ({
  type: SET_THEME_SELECTED_ACTION,
  id,
  product
})

export const openSaveDesignAction = (
  open: boolean,
  design: SaveDesignType
) => ({
  type: OPEN_SAVE_DESIGN_ACTION,
  open,
  design
})

export const setDesignNameAction = (param: string): AnyAction => {
  return {
    type: SET_DESIGN_NAME,
    param
  }
}

// TODO: Temp any
export const setStyleAction = (
  style: any,
  index: number,
  colors: string[]
): AnyAction => ({
  type: SET_STYLE_SELECTED_ACTION,
  style,
  index,
  colors
})

export const setStyleComplexity = (index: number): AnyAction => ({
  type: SET_STYLE_COMPLEXITY_ACTION,
  index
})

export const openShareModalAction = (open: boolean): AnyAction => ({
  type: OPEN_SHARE_MODAL,
  open
})

export const saveDesignLoadingAction = (loading: boolean): AnyAction => ({
  type: SAVE_DESIGN_LOADING,
  loading
})

export const saveDesignIdAction = (
  id: string,
  svgUrl: string,
  design: DesignSaved
): AnyAction => ({
  type: SAVE_DESIGN_ID,
  id,
  svgUrl,
  design
})

export const setCheckedTermsAction = (checked: boolean): AnyAction => ({
  type: SET_CHECKED_TERMS,
  checked
})

export const clearDesignInfoAction = (): AnyAction => ({
  type: CLEAR_DESIGN_INFO
})

export const setTextAction = (text: string): AnyAction => ({
  type: SET_TEXT_ACTION,
  text
})

export const openAddToTeamStoreModalAction = (open: boolean): AnyAction => ({
  type: OPEN_ADD_TOTEAMSTORE,
  open
})

export const setItemToAddAction = (
  teamStoreItem: TeamStoreItemtype,
  teamStoreId: string
): AnyAction => ({
  type: SET_ITEM_TOADD,
  teamStoreItem,
  teamStoreId
})

export const setCanvasElement = (
  el: CanvasElement,
  typeEl: string,
  update = false,
  canvasObj: ConfigCanvasObj
): AnyAction => ({
  type: SET_CANVAS_ELEMENT_ACTION,
  el,
  typeEl,
  update,
  canvasObj
})

export const setSelectedElement = (id: string, typeEl: string): AnyAction => ({
  type: SET_SELECTED_ELEMENT_ACTION,
  id,
  typeEl
})

export const removeCanvasElement = (
  id: string,
  typeEl: string,
  canvasObj: ConfigCanvasObj
): AnyAction => ({
  type: REMOVE_CANVAS_ELEMENT_ACTION,
  id,
  typeEl,
  canvasObj
})

export const setTextFormatAction = (
  key: string,
  value: string | number
): AnyAction => ({
  type: SET_TEXT_FORMAT_ACTION,
  key,
  value
})

export const setArtFormatAction = (
  key: string,
  value: string | number
): AnyAction => ({
  type: SET_ART_FORMAT_ACTION,
  key,
  value
})

export const openPaletteModalAction = (
  key: string,
  open: boolean,
  value: number = -1
) => ({
  type: OPEN_DELETE_OR_APPLY_PALETTE_MODAL,
  open,
  value,
  key
})

export const openResetDesignModalAction = (open: boolean) => ({
  type: OPEN_RESET_DESIGN_MODAL,
  open
})

export const editDesignAction = () => ({
  type: EDIT_DESIGN_ACTION
})

export const openNewThemeModalAction = (
  open: boolean,
  themeId: number = -1
) => ({
  type: OPEN_NEW_THEME_MODAL,
  open,
  themeId
})

export const openNewStyleModalAction = (
  open: boolean,
  indexStyle: any = -1,
  idStyle: number = -1
) => ({
  type: OPEN_NEW_STYLE_MODAL,
  open,
  indexStyle,
  idStyle
})

export const setDesignHasChangesAction = (hasChanges: boolean) => ({
  type: SET_DESIGN_HAS_CHANGES,
  hasChanges
})

export const openOutWithoutSaveModalAction = (
  open: boolean,
  route: string = ''
) => ({
  type: OPEN_OUT_WITHOUT_SAVE_MODAL,
  open,
  route
})

export const setCustomize3dMountedAction = (mounted: boolean) => ({
  type: SET_CUSTOMIZE_3D_MOUNTED,
  mounted
})

export const setCanvasJsonAction = (canvas: string) => ({
  type: SET_CANVAS_JSON_ACTION,
  canvas
})

export const setStitchingColorAction = (stitchingColor: StitchingColor) => ({
  type: SET_STITCHING_COLOR_ACTION,
  stitchingColor
})

export const uploadFileSuccessAction = (url: string) => ({
  type: UPLOAD_FILE_ACTION_SUCCESS,
  url
})

export const setUploadingAction = (isUploading: boolean) => ({
  type: SET_UPLOADING_FILE_ACTION,
  isUploading
})

export const setAccessoryColorAction = (color: AccesoryColor, id: string) => ({
  type: SET_ACCESSORY_COLOR_ACTION,
  color,
  id
})

export const onCanvasElementResizedAction = (
  element: CanvasResized
): AnyAction => ({
  type: CANVAS_ELEMENT_RESIZED_ACTION,
  element
})

export const onCanvasElementDraggedAction = (
  element: CanvasDragged
): AnyAction => ({
  type: CANVAS_ELEMENT_DRAGGED_ACTION,
  element
})

export const setSearchClipParamAction = (param: string) => ({
  type: SET_SEARCH_CLIPARTPARAM,
  param
})
