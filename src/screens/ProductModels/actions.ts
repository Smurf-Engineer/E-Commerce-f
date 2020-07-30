/**
 * ProductModels Actions - Created by Jesús Apodaca on 16/12/19.
 */

import {
  SET_ICON,
  OPEN_MODAL,
  EDIT_MODEL,
  CHANGE_NAME,
  UPLOADING_IMAGE,
  UPLOADING_FILE,
  SET_FILE,
  SET_LOADING,
  SAVE_INFO,
  REMOVE_MODEL,
  SET_VARIANTS,
  CHANGE_DEFAULT,
  CHANGE_MODEL_RENDER,
  UPLOAD_COMPLETE,
  RESET_REDUCER,
  ON_TAB_CLICK_ACTION,
  OPEN_PREDYED,
  CHANGE_CODE,
  SET_COLORS,
  CHANGE_COLOR,
  SELECT_COLOR,
  EDIT_COLOR
} from './constants'

import { AnyAction, ModelVariant, PredyedColor } from '../../types/common'

export const openModalAction = (open: boolean): AnyAction => ({
  type: OPEN_MODAL,
  open
})

export const setEditModel = (id: string): AnyAction => ({
  type: EDIT_MODEL,
  id
})

export const openPredyedAction = (open: boolean): AnyAction => ({
  type: OPEN_PREDYED,
  open
})

export const changeColorAction = (color: string): AnyAction => ({
  type: CHANGE_COLOR,
  color
})

export const changeHexAction = (code: string): AnyAction => ({
  type: CHANGE_CODE,
  code
})

export const setColorsAction = (predyedColors: { [id: string]: PredyedColor }): AnyAction => ({
  type: SET_COLORS,
  predyedColors
})

export const selectColorAction = (id: string): AnyAction => ({
  type: SELECT_COLOR,
  id
})

export const editColorAction = (id: string, name: string, code: string): AnyAction => ({
  type: EDIT_COLOR,
  id,
  name,
  code
})

export const onTabClick = (selectedIndex: string): AnyAction => ({
  type: ON_TAB_CLICK_ACTION,
  selectedIndex
})

export const changeNameAction = (name: string): AnyAction => ({
  type: CHANGE_NAME,
  name
})

export const setUploadingImage = (): AnyAction => ({
  type: UPLOADING_IMAGE
})

export const resetReducer = (): AnyAction => ({
  type: RESET_REDUCER
})

export const setIconAction = (icon: string): AnyAction => ({
  type: SET_ICON,
  icon
})

export const setUploadingFile = (key: string): AnyAction => ({
  type: UPLOADING_FILE,
  key
})

export const setFileAction = (key: string, url: string): AnyAction => ({
  type: SET_FILE,
  key,
  url
})

export const saveInfoAction = (): AnyAction => ({
  type: SAVE_INFO
})

export const removeModelAction = (key: string): AnyAction => ({
  type: REMOVE_MODEL,
  key
})

export const setLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING,
  loading
})

export const setVariantsAction = (
  variants: { [id: string]: ModelVariant },
  defaultIndex: string,
  predyedColors: { [id: string]: PredyedColor }
): AnyAction => ({
  type: SET_VARIANTS,
  variants,
  defaultIndex,
  predyedColors
})

export const changeDefault = (checked: boolean): AnyAction => ({
  type: CHANGE_DEFAULT,
  checked
})

export const selectModelAction = (id: string): AnyAction => ({
  type: CHANGE_MODEL_RENDER,
  id
})

export const uploadComplete = (): AnyAction => ({
  type: UPLOAD_COMPLETE
})
