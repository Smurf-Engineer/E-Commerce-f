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
  UNSELECT
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

export const toggleAddDesignAction = (): AnyAction => ({
  type: TOGGLE_ADD_DESIGN
})

export const updateDesignNameAction = (value: string): AnyAction => ({
  type: UPDATE_DESIGN_NAME,
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
