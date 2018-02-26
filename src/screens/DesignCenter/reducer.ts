/**
 * DesignCenter Reducer - Created by david on 23/02/18.
 */
import { fromJS } from 'immutable'
import { SET_CURRENT_TAB_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentTab: 0
})

const designCenterReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB_ACTION:
      return state.set('currentTab', action.index)
    default:
      return state
  }
}

export default designCenterReducer
