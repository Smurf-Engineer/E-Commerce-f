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
  SET_UPLOADING_DESIGN_SUCCESS
} from './constants'
import { AnyAction, ModelConfig } from '../../types/common'

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
