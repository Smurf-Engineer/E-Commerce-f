/**
 * ProDesign Reducer - Created by eduardoquintero on 19/09/19.
 */
import { fromJS } from 'immutable'
import { CLEAR_REDUCER } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({})

const proDesignReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_REDUCER:
      return initialState
    default:
      return state
  }
}

export default proDesignReducer
