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
  SET_APPROVE_LOADING
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  openRequest: false,
  note: '',
  file: '',
  sendingNote: false,
  uploadingFile: false,
  parentMessageId: '',
  parentMessage: '',
  approveLoading: false
})

const designApprovalReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPLOADING:
      return state.set('uploadingFile', action.loading)
    case SET_NOTE:
      return state.set('note', action.value)
    case SET_FILE:
      return state.merge({
        uploadingFile: false,
        file: action.file
      })
    case SET_REPLY:
      return state.merge({
        openRequest: true,
        parentMessageId: action.id,
        parentMessage: action.message
      })
    case SET_APPROVE_LOADING:
      return state.set('approveLoading', action.loading)
    case SET_SENDING_NOTE:
      return state.set('sendingNote', action.loading)
    case SET_OPEN_MODAL:
      return state.merge({
        openRequest: action.open,
        note: '',
        file: '',
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
