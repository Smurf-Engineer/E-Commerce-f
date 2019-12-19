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
  SAVE_INFO,
  REMOVE_MODEL
} from './constants'

import { AnyAction } from '../../types/common'

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
