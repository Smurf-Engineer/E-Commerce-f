/**
 * CreateStore Reducer - Created by david on 09/04/18.
 */
import { fromJS } from 'immutable'
import { DEFAULT_ACTION, SET_TEAM_SIZE_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  teamSizeId: -1,
  teamSizeRange: ''
})

const createStoreReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state
    case SET_TEAM_SIZE_ACTION:
      return state.merge({
        teamSizeId: action.id,
        teamSizeRange: action.range
      })
    default:
      return state
  }
}

export default createStoreReducer
