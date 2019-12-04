/**
 * PublishingTool Reducer - Created by eduardoquintero on 02/12/19.
 */
import { fromJS } from 'immutable'
import { ON_RESET_REDUCER } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({})

const publishingToolReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_RESET_REDUCER:
      return initialState
    default:
      return state
  }
}

export default publishingToolReducer
