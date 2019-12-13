/**
 * DesignTools Reducer - Created by Jesús Apodaca on 04/12/19.
 */
import { fromJS } from 'immutable'
import { ON_RESET_REDUCER, SET_UPLOADING_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  loading: false
})

const designToolsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_RESET_REDUCER:
      return initialState
    case SET_UPLOADING_ACTION:
      return state.set('loading', action.isLoading)
    default:
      return state
  }
}

export default designToolsReducer
