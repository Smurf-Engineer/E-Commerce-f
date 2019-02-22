/**
 * DesignerTool  Actions - Created by david on 08/05/18.
 */
import {
  DEFAULT_ACTION,
  SET_LOADING_MODEL,
  SET_COLOR_ACTION,
  SET_COLOR_BLOCK_ACTION,
  COLOR_BLOCK_HOVERED_ACTION,
  SET_UPLOADING_ACTION,
  SET_UPLOADING_SUCCESS,
  SET_UPLOADING_DESIGN_SUCCESS,
  SET_CURRENT_TAB_ACTION,
  SET_SWIPING_TAB_ACTION,
  SET_SELECTED_THEME_ACTION,
  SET_SELECTED_STYLE_ACTION,
  SET_DESIGN_CONFIG_ACTION,
  SET_INSPIRATION_COLOR_ACTION,
  SET_PRODCUT_CODE_ACTION,
  SET_THEME_NAME_ACTION,
  SET_COMPLEXITY_ACTION,
  SET_THUMBNAIL_ACTION,
  SET_UPLOADING_THUMBNAIL_ACTION,
  ADD_EXTRA_FILE_ACTION,
  REMOVE_EXTRA_FILE_ACTION,
  TOGGLE_EXTRA_COLOR_ACTION,
  SAVE_DESIGN_SUCCESS_ACTION,
  EDIT_COLOR_IDEA_ACTION,
  SET_MODEL_ACTION,
  DELETE_COLOR_IDEA_ACTION,
  SET_DESIGN_NAME_ACTION,
  UPDATE_COLOR_IDEA_NAME_ACTION,
  ADD_COLOR_IDEA_ACTION,
  SET_THEME_TO_EDIT_ACTION,
  UPDATE_THEME_NAME_ACTION,
  OPEN_SAVE_DESIGN_ACTION,
  SET_SAVING_DESIGN,
  UPLOAD_SYMBOL_ACTION_SUCCESS,
  UPLOADING_SYMBOL_ACTION,
  SET_SEARCH_CLIPARTPARAM
} from './constants'
import {
  AnyAction,
  ModelConfig,
  DesignConfig,
  DesignObject,
  ModelDesign,
  Theme,
  ClipArt
} from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setLoadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_LOADING_MODEL,
  isLoading
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

export const setUploadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_UPLOADING_ACTION,
  isLoading
})

export const setUploadingSuccess = (modelConfig: ModelConfig): AnyAction => ({
  type: SET_UPLOADING_SUCCESS,
  modelConfig
})

export const setUploadingDesignSuccess = (design: string[]): AnyAction => ({
  type: SET_UPLOADING_DESIGN_SUCCESS,
  design
})

export const setCurrentTabAction = (index: number): AnyAction => ({
  type: SET_CURRENT_TAB_ACTION,
  index
})

export const setSwipingTabAction = (isSwiping: boolean): AnyAction => ({
  type: SET_SWIPING_TAB_ACTION,
  isSwiping
})

export const setSelectedThemeAction = (id: number): AnyAction => ({
  type: SET_SELECTED_THEME_ACTION,
  id
})

export const setSelectedStyleAction = (id: number): AnyAction => ({
  type: SET_SELECTED_STYLE_ACTION,
  id
})

export const setDesignConfigAction = (config: DesignConfig): AnyAction => ({
  type: SET_DESIGN_CONFIG_ACTION,
  config
})

export const setInspirationColorAction = (index: number): AnyAction => ({
  type: SET_INSPIRATION_COLOR_ACTION,
  index
})

export const setProductCodeAction = (code: string): AnyAction => ({
  type: SET_PRODCUT_CODE_ACTION,
  code
})

export const setThemeNameAction = (name: string): AnyAction => ({
  type: SET_THEME_NAME_ACTION,
  name
})

export const setDesignNameAction = (name: string): AnyAction => ({
  type: SET_DESIGN_NAME_ACTION,
  name
})

export const setComplexityAction = (
  design: number,
  complexity: number
): AnyAction => ({
  type: SET_COMPLEXITY_ACTION,
  design,
  complexity
})

export const setThumbnailAction = (
  item: number,
  thumbnail: string
): AnyAction => ({
  type: SET_THUMBNAIL_ACTION,
  item,
  thumbnail
})

export const setUploadingThumbnailAction = (
  uploadingItem: boolean
): AnyAction => ({
  type: SET_UPLOADING_THUMBNAIL_ACTION,
  uploadingItem
})

export const addExtraFileAction = (file: string) => ({
  type: ADD_EXTRA_FILE_ACTION,
  file
})

export const removeExtraFileAction = (index: number) => ({
  type: REMOVE_EXTRA_FILE_ACTION,
  index
})

export const toggleExtraColorAction = (color: string) => ({
  type: TOGGLE_EXTRA_COLOR_ACTION,
  color
})

export const saveDesignSuccessAction = () => ({
  type: SAVE_DESIGN_SUCCESS_ACTION
})

export const setColorIdeaItemAction = (item: number) => ({
  type: EDIT_COLOR_IDEA_ACTION,
  item
})

export const deleteColorIdeaAction = (index: number) => ({
  type: DELETE_COLOR_IDEA_ACTION,
  index
})

export const addColorIdeaAction = () => ({
  type: ADD_COLOR_IDEA_ACTION
})

export const setColorIdeaNameAction = (
  name: string,
  updateColors: boolean,
  item?: number
) => ({
  type: UPDATE_COLOR_IDEA_NAME_ACTION,
  name,
  updateColors,
  item
})

export const setModelAction = (
  modelConfig: ModelConfig,
  colorIdeas: DesignObject[],
  design: ModelDesign
): AnyAction => ({
  type: SET_MODEL_ACTION,
  modelConfig,
  colorIdeas,
  design
})

export const setThemeToEditAction = (theme: Theme | null): AnyAction => ({
  type: SET_THEME_TO_EDIT_ACTION,
  theme
})

export const updateThemeNameAction = (name: string): AnyAction => ({
  type: UPDATE_THEME_NAME_ACTION,
  name
})

export const openSaveDesignAction = (open: boolean) => ({
  type: OPEN_SAVE_DESIGN_ACTION,
  open
})

export const setSavingDesign = (saving: boolean) => ({
  type: SET_SAVING_DESIGN,
  saving
})

export const setUploadSymbolSuccessAction = (clipart: ClipArt) => ({
  type: UPLOAD_SYMBOL_ACTION_SUCCESS,
  clipart
})

export const setUploadingSymbolAction = (isLoading: boolean) => ({
  type: UPLOADING_SYMBOL_ACTION,
  isLoading
})

export const setSearchClipParamAction = (param: string) => ({
  type: SET_SEARCH_CLIPARTPARAM,
  param
})
