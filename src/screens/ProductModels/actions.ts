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
  RESET_REDUCER
} from './constants'

import { AnyAction, ModelVariant } from '../../types/common'

export const openModalAction = (open: boolean): AnyAction => ({
  type: OPEN_MODAL,
  open
})

export const setEditModel = (id: string): AnyAction => ({
  type: EDIT_MODEL,
  id
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
): AnyAction => ({
  type: SET_VARIANTS,
  variants,
  defaultIndex,
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
