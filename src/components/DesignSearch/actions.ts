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
  SET_UPLOADING_THUMBNAIL_ACTION,
  UPDATE_THUMBNAIL_ACTION,
  SET_STITCHING_COLOR_ACTION,
  SET_COLOR_ACTION,
  RESET_CHANGES_ACTION,
  SET_SEARCH_CODES,
  SET_CREATING_PDF,
  SET_PDF
} from './constants'
import {
  AnyAction,
  OrderSearchResult,
  StitchingColor,
  DesignSearchCode
} from '../../types/common'

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

export const updateThumbnailAction = (thumbnail: string) => ({
  type: UPDATE_THUMBNAIL_ACTION,
  thumbnail
})

export const setStitchingColorAction = (stitchingColor: StitchingColor) => ({
  type: SET_STITCHING_COLOR_ACTION,
  stitchingColor
})

export const setColorAction = (color: string, id: string) => ({
  type: SET_COLOR_ACTION,
  color,
  id
})

export const resetChangesAction = () => ({
  type: RESET_CHANGES_ACTION
})

export const setSearchCodesAction = (codes: DesignSearchCode[]) => ({
  type: SET_SEARCH_CODES,
  codes
})

export const creatingPdfAction = (creating: boolean) => ({
  type: SET_CREATING_PDF,
  creating
})

export const setPdfAction = (url: string) => ({
  type: SET_PDF,
  url
})
