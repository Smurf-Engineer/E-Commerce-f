/**
 * UsersFiles Reducer - Created by eduardoquintero on 21/01/20.
 */

import { fromJS } from 'immutable'
import { SET_UPLOADING } from './constants'
import { Reducer } from '../../../types/common'

export const initialState = fromJS({
  uploading: false
})

const userFilesReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPLOADING:
      return state.set('uploading', action.uploading)
    default:
      return state
  }
}

export default userFilesReducer
