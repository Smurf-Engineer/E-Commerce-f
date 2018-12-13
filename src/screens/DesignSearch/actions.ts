/**
 * DesignSearch  Actions - Created by miguelcanobbio on 15/08/18.
 */
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_ORDER,
  SET_NOT_FOUND,
  RESET_DATA,
  UPLOAD_FILE_ACTION_SUCCESS,
  SET_UPLOADING_FILE_ACTION,
  SET_UPLOADING_THUMBNAIL_ACTION
} from './constants'
import { AnyAction, OrderSearchResult } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setLoadingAction = (): AnyAction => ({
  type: SET_LOADING
})

export const setOrderAction = (order: OrderSearchResult): AnyAction => ({
  type: SET_ORDER,
  order
})

export const setNotFoundAction = (noAdmin?: boolean): AnyAction => ({
  type: SET_NOT_FOUND,
  noAdmin
})

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})

export const uploadFileSuccessAction = (url: string) => ({
  type: UPLOAD_FILE_ACTION_SUCCESS,
  url
})

export const setUploadingAction = (isUploading: boolean) => ({
  type: SET_UPLOADING_FILE_ACTION,
  isUploading
})

export const setUploadingThumbnailAction = (uploading: boolean) => ({
  type: SET_UPLOADING_THUMBNAIL_ACTION,
  uploading
})
