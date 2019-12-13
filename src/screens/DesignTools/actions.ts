/**
 * DesignTools  Actions - Created by Jesús Apodaca on 04/12/19.
 */

import {
  ON_RESET_REDUCER,
  SET_UPLOADING_COLORS_ACTION,
  SET_UPLOADING_ACTION,
  ON_TAB_CLICK_ACTION,
  SET_COLORS
} from './constants'

import { AnyAction } from '../../types/common'

export const onResetReducer = (): AnyAction => ({
  type: ON_RESET_REDUCER
})

export const setUploadingColorsAction = (
  listType: string,
  isUploading: boolean
): AnyAction => ({
  type: SET_UPLOADING_COLORS_ACTION,
  listType,
  isUploading
})

export const setUploadingAction = (isLoading: boolean): AnyAction => ({
  type: SET_UPLOADING_ACTION,
  isLoading
})

export const onTabClick = (selectedIndex: number): AnyAction => ({
  type: ON_TAB_CLICK_ACTION,
  selectedIndex
})

export const setColorList = (
  listType: string,
  colors: string[]
): AnyAction => ({
  type: SET_COLORS,
  listType,
  colors
})
