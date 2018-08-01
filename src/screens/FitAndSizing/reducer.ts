/**
 * ProfileSettings Reducer - Created by miguel canobbio on 05/31/18.
 */
import { fromJS } from 'immutable'
import { SET_MSRMNT_SYSTEM } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  msrmntSystemSelected: null
})

const fitAndSizingReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_MSRMNT_SYSTEM:
      return state.set('msrmntSystemSelected', action.units)
    default:
      return state
  }
}

export default fitAndSizingReducer
