/**
 * DesignApproval Reducer - Created by Jesús on 28/12/20.
 */
import { fromJS } from 'immutable'
import {
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
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  openRequest: false,
  note: '',
  file: [],
  sendingNote: false,
  uploadingFile: false,
  parentMessageId: '',
  parentMessage: '',
  approveLoading: false,
  project: null,
  product: null
})

const designApprovalReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPLOADING:
      return state.set('uploadingFile', action.loading)
    case SET_NOTE:
      return state.set('note', action.value)
    case SET_FILE:
      const newFiles = state.get('file').toJS()
      newFiles.push(action.file)
      return state.merge({
        uploadingFile: false,
        file: newFiles
      })
    case DELETE_FILE:
      const files = state.get('file').toJS()
      const fileIndex = files.findIndex((e: string) => e === action.file)
      files.splice(fileIndex, 1)
      return state.merge({
        file: files
      })
    case SET_REPLY:
      return state.merge({
        openRequest: true,
        parentMessageId: action.id,
        parentMessage: action.message
      })
    case SET_EDIT_PROJECT:
      return state.merge({
        project: action.project,
        product: action.product
      })
    case SET_APPROVE_LOADING:
      return state.set('approveLoading', action.loading)
    case SET_SENDING_NOTE:
      return state.set('sendingNote', action.loading)
    case SET_OPEN_MODAL:
      return state.merge({
        openRequest: action.open,
        note: '',
        file: [],
        sendingNote: false,
        parentMessageId: '',
        parentMessage: '',
        uploadingFile: false,
      })
    default:
      return state
  }
}

export default designApprovalReducer
