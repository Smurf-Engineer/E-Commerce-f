/**
 * DesignApproval Reducer - Created by Jesús on 28/12/20.
 */
import { fromJS } from 'immutable'
import { SET_LOADING_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  loadingModel: true
})

const designApprovalReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_ACTION:
      return state.set('loadingModel', action.isLoading)
    default:
      return state
  }
}

export default designApprovalReducer
