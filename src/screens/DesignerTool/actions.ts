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
  SET_STYLE_NAME_ACTION,
  SET_COMPLEXITY_ACTION
} from './constants'
import { AnyAction, ModelConfig, DesignConfig } from '../../types/common'

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

export const setStyleNameAction = (name: string): AnyAction => ({
  type: SET_STYLE_NAME_ACTION,
  name
})

export const setComplexityAction = (complexity: number): AnyAction => ({
  type: SET_COMPLEXITY_ACTION,
  complexity
})
