/**
 * Designs Reducer - Created by david on 27/03/18.
 */
import { fromJS } from 'immutable'
import { SET_LOADING_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  loadingModel: false
})

const designsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_ACTION:
      return state.set('loadingModel', action.isLoading)
    default:
      return state
  }
}

export default designsReducer
