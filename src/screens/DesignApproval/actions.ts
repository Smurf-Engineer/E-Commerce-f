/**
 * Designs  Actions - Created by Jesús on 30/12/20.
 */
import {
  DEFAULT_ACTION,
  SET_OPEN_MODAL,
  SET_UPLOADING,
  SET_FILE,
  SET_NOTE,
  SET_REPLY,
  SET_SENDING_NOTE,
  SET_APPROVE_LOADING,
  SET_EDIT_PROJECT,
  DELETE_FILE
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setOpenModal = (open: boolean): AnyAction => ({
  type: SET_OPEN_MODAL,
  open
})

export const setUploadingAction = (loading: boolean): AnyAction => ({
  type: SET_UPLOADING,
  loading
})

export const setEditProject = (project: number, product: number): AnyAction => ({
  type: SET_EDIT_PROJECT,
  project,
  product
})

export const setFileAction = (file: string): AnyAction => ({
  type: SET_FILE,
  file
})

export const deleteFileAction = (file: string): AnyAction => ({
  type: DELETE_FILE,
  file
})

export const setApproveLoading = (loading: boolean): AnyAction => ({
  type: SET_APPROVE_LOADING,
  loading
})

export const changeNoteAction = (value: string): AnyAction => ({
  type: SET_NOTE,
  value
})

export const setReplyAction = (id: string, message: string): AnyAction => ({
  type: SET_REPLY,
  id,
  message
})

export const setSendingAction = (loading: boolean): AnyAction => ({
  type: SET_SENDING_NOTE,
  loading
})
