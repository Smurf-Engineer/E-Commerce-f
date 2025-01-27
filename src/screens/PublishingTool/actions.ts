/**
 * PublishingTool  Actions - Created by eduardoquintero on 19/09/19.
 */

import {
  ON_RESET_REDUCER,
  SET_PRODUCT_CODE,
  ON_CHANGE_THEME,
  SET_THEME_TO_EDIT_ACTION,
  UPDATE_THEME_NAME_ACTION,
  SET_CURRENT_PAGE,
  TOGGLE_ADD_DESIGN,
  UPDATE_DESIGN_NAME,
  SET_UPLOADING,
  SET_UPLOADING_DESIGN_SUCCESS,
  ON_SELECT_TAB,
  SET_MODEL_ACTION,
  UNSELECT,
  EDIT_COLOR_IDEA_ACTION,
  SET_COLOR_BLOCK_ACTION,
  SET_COLOR_ACTION,
  COLOR_BLOCK_HOVERED_ACTION,
  UPDATE_COLOR_IDEA_NAME_ACTION,
  SET_INSPIRATION_COLOR_ACTION,
  SET_LOADING_MODEL,
  ADD_COLOR_IDEA_ACTION,
  SET_THUMBNAIL_ACTION,
  SET_UPLOADING_THUMBNAIL_ACTION,
  OPEN_SAVE_DESIGN_ACTION,
  SET_SAVING_DESIGN,
  UPDATE_COLOR_IDEAS_LIST,
  SET_DESIGN_NAME_ACTION,
  DELETE_COLOR_IDEA_ACTION,
  SET_CANVAS_JSON_ACTION,
  UPDATE_INSPIRATION_LIST,
  SET_CODE_SEARCH
} from './constants'

import {
  AnyAction,
  Theme,
  StyleConfig,
  ModelConfig,
  DesignObject,
  ModelDesign
} from '../../types/common'

export const onResetReducer = (): AnyAction => ({
  type: ON_RESET_REDUCER
})

export const setProductCodeAction = (value: string): AnyAction => ({
  type: SET_PRODUCT_CODE,
  value
})

export const onChangeThemeAction = (
  id: number,
  section: string
): AnyAction => ({
  type: ON_CHANGE_THEME,
  id,
  section
})

export const setThemeToEditAction = (theme: Theme | null): AnyAction => ({
  type: SET_THEME_TO_EDIT_ACTION,
  theme
})

export const updateThemeNameAction = (name: string): AnyAction => ({
  type: UPDATE_THEME_NAME_ACTION,
  name
})

export const setCurrentPageAction = (page: number): AnyAction => ({
  type: SET_CURRENT_PAGE,
  page
})

export const toggleAddDesignAction = (id?: number): AnyAction => ({
  type: TOGGLE_ADD_DESIGN,
  id
})

export const updateDesignNameAction = (value: string): AnyAction => ({
  type: UPDATE_DESIGN_NAME,
  value
})

export const setCodeSearch = (value: string): AnyAction => ({
  type: SET_CODE_SEARCH,
  value
})

export const setUploadingAction = (uploading: boolean): AnyAction => ({
  type: SET_UPLOADING,
  uploading
})

export const setUploadingDesignSuccess = (design: StyleConfig): AnyAction => ({
  type: SET_UPLOADING_DESIGN_SUCCESS,
  design
})

export const onSelectTab = (index: number): AnyAction => ({
  type: ON_SELECT_TAB,
  index
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

export const unselectAction = (section: string): AnyAction => ({
  type: UNSELECT,
  section
})

export const setColorIdeaItemAction = (item: number) => ({
  type: EDIT_COLOR_IDEA_ACTION,
  item
})

export const setColorBlockAction = (index: number): AnyAction => ({
  type: SET_COLOR_BLOCK_ACTION,
  index
})

export const setColorAction = (color: string): AnyAction => ({
  type: SET_COLOR_ACTION,
  color
})

export const setHoverColorBlockAction = (index: number): AnyAction => ({
  type: COLOR_BLOCK_HOVERED_ACTION,
  index
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

export const setInspirationColorAction = (index: number): AnyAction => ({
  type: SET_INSPIRATION_COLOR_ACTION,
  index
})

export const setLoadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_LOADING_MODEL,
  isLoading
})

export const addColorIdeaAction = () => ({
  type: ADD_COLOR_IDEA_ACTION
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

export const openSaveDesignAction = (open: boolean) => ({
  type: OPEN_SAVE_DESIGN_ACTION,
  open
})

export const setSavingDesign = (saving: boolean) => ({
  type: SET_SAVING_DESIGN,
  saving
})

export const updateColorIdeasListAction = (colorIdeas: DesignObject[]) => ({
  type: UPDATE_COLOR_IDEAS_LIST,
  colorIdeas
})

export const updateInspirationAction = (
  colorIdeas: DesignObject[],
  modelDesign?: ModelDesign
) => ({
  type: UPDATE_INSPIRATION_LIST,
  colorIdeas,
  modelDesign
})

export const setDesignNameAction = (name: string): AnyAction => ({
  type: SET_DESIGN_NAME_ACTION,
  name
})

export const deleteColorIdeaAction = (index: number) => ({
  type: DELETE_COLOR_IDEA_ACTION,
  index
})

export const setCanvasJsonAction = (canvas: string) => ({
  type: SET_CANVAS_JSON_ACTION,
  canvas
})
