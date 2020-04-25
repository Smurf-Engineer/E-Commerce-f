/**
 * DesignSearch Reducer - Created by miguelcanobbio on 15/08/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_ORDER,
  SET_NOT_FOUND,
  RESET_DATA,
  SET_UPLOADING_FILE_ACTION,
  UPLOAD_FILE_ACTION_SUCCESS,
  SET_SEARCH_REP,
  SET_UPLOADING_THUMBNAIL_ACTION,
  UPDATE_THUMBNAIL_ACTION,
  SET_STITCHING_COLOR_ACTION,
  SET_COLOR_ACTION,
  RESET_CHANGES_ACTION,
  SET_SEARCH_CODES,
  SET_CREATING_PDF,
  SET_PDF,
  SET_NOTE,
  OPEN_NOTES,
  SET_USER_REP,
  SET_SEARCH_MANAGER,
  SET_LOADING_NOTE,
  SET_PREFLIGHT,
  SET_LOADING_PREFLIGHT,
  SET_ACCOUNT_MANAGER
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  loading: false,
  order: null,
  notFound: false,
  loadingPreflight: false,
  noAdmin: false,
  uploadingFile: false,
  note: '',
  repSearchText: '',
  managerSearchText: '',
  openNotes: false,
  addingNote: false,
  actualSvg: '',
  uploadingThumbnail: false,
  changes: false,
  colorAccessories: {
    stitching: '',
    stitchingName: '',
    zipperColor: '',
    bibColor: '',
    bindingColor: ''
  },
  designSearchCodes: [],
  creatingPdf: false
})

const designSearchAdminReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_SEARCH_REP:
      return state.set('repSearchText', action.value)
    case SET_SEARCH_MANAGER:
      return state.set('managerSearchText', action.value)
    case SET_LOADING_PREFLIGHT:
      return state.set('loadingPreflight', action.loading)
    case SET_PREFLIGHT:
      return state.withMutations((map: any) => {
        map.setIn(['order', 'preflightCheck'], action.checked)
        map.set('loadingPreflight', false)
      })
    case SET_LOADING:
      return state.merge({
        order: null,
        notFound: false,
        loading: true
      })
    case SET_ORDER:
      return state.merge({
        order: action.order,
        notFound: false,
        loading: false
      })
    case SET_NOT_FOUND: {
      if (action.noAdmin) {
        return state.merge({
          order: null,
          noAdmin: true,
          loading: false
        })
      }
      return state.merge({
        order: null,
        notFound: true,
        loading: false
      })
    }
    case SET_NOTE:
      return state.set('note', action.text)
    case SET_LOADING_NOTE:
      return state.set('addingNote', action.loading)
    case OPEN_NOTES:
      return state.merge({
        note: '',
        addingNote: false,
        openNotes: action.openNotes
      })
    case SET_UPLOADING_FILE_ACTION:
      return state.set('uploadingFile', action.isUploading)
    case RESET_DATA:
      return initialState
    case UPLOAD_FILE_ACTION_SUCCESS:
      return state.merge({
        actualSvg: action.url.fileUrl,
        changes: true
      })
    case SET_UPLOADING_THUMBNAIL_ACTION:
      return state.set('uploadingThumbnail', action.uploading)
    case UPDATE_THUMBNAIL_ACTION:
      return state.setIn(['order', 'image'], action.thumbnail)
    case SET_STITCHING_COLOR_ACTION:
      return state
        .setIn(['colorAccessories', 'stitching'], action.stitchingColor.value)
        .setIn(
          ['colorAccessories', 'stitchingName'],
          action.stitchingColor.name
        )
        .set('changes', true)
    case SET_COLOR_ACTION:
      return state
        .setIn(['colorAccessories', action.id], action.color)
        .set('changes', true)
    case SET_USER_REP:
      return state.setIn(['order', 'salesRep'], action.userRep)
    case SET_ACCOUNT_MANAGER:
      return state.setIn(['order', 'accountManager'], action.manager)
    case RESET_CHANGES_ACTION:
      return state.set('changes', false)
    case SET_SEARCH_CODES:
      return state.set('designSearchCodes', action.codes)
    case SET_CREATING_PDF:
      return state.set('creatingPdf', action.creating)
    case SET_PDF:
      return state.setIn(['order', 'pdfUrl'], action.url)
    default:
      return state
  }
}

export default designSearchAdminReducer
