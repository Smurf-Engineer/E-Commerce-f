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
  SET_SEARCH_REP,
  UPDATE_THUMBNAIL_ACTION,
  SET_STITCHING_COLOR_ACTION,
  SET_COLOR_ACTION,
  RESET_CHANGES_ACTION,
  SET_SEARCH_CODES,
  SET_CREATING_PDF,
  SET_PDF,
  SET_NOTE,
  OPEN_NOTES,
  SET_LOADING_NOTE,
  SET_PREFLIGHT,
  SET_LOADING_PREFLIGHT,
  SET_USER_REP,
  SET_SEARCH_MANAGER,
  SET_ACCOUNT_MANAGER,
  CHANGE_LEGACY,
  SET_PREDYED_VALUE
} from './constants'
import {
  AnyAction,
  OrderSearchResult,
  StitchingColor,
  DesignSearchCode,
  User
} from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setLoadingAction = (): AnyAction => ({
  type: SET_LOADING
})

export const setPreflightAction = (checked: boolean): AnyAction => ({
  type: SET_PREFLIGHT,
  checked
})

export const setLoadingPreflight = (loading: boolean): AnyAction => ({
  type: SET_LOADING_PREFLIGHT,
  loading
})

export const setOrderAction = (order: OrderSearchResult): AnyAction => ({
  type: SET_ORDER,
  order
})

export const setNoteAction = (text: string): AnyAction => ({
  type: SET_NOTE,
  text
})

export const changeLegacy = (value: string): AnyAction => ({
  type: CHANGE_LEGACY,
  value
})

export const openNoteAction = (openNotes: boolean): AnyAction => ({
  type: OPEN_NOTES,
  openNotes
})

export const setLoadingNote = (loading: boolean): AnyAction => ({
  type: SET_LOADING_NOTE,
  loading
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

export const selectPredyedAction = (prededValue: string) => ({
  type: SET_PREDYED_VALUE,
  prededValue
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

export const setSearchRep = (value: string) => ({
  type: SET_SEARCH_REP,
  value
})

export const setSearchManager = (value: string) => ({
  type: SET_SEARCH_MANAGER,
  value
})

export const setUserRepAction = (userRep: User) => ({
  type: SET_USER_REP,
  userRep
})

export const setManagerAction = (manager: User) => ({
  type: SET_ACCOUNT_MANAGER,
  manager
})
