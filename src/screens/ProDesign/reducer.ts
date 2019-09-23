/**
 * ProDesign Reducer - Created by eduardoquintero on 19/09/19.
 */
import { fromJS } from 'immutable'
import { ON_TAB_CLICK, UPLOAD } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  selectedKey: UPLOAD
})

const proDesignReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_TAB_CLICK:
      return state.set('selectedKey', action.selectedKey)
    default:
      return state
  }
}

export default proDesignReducer
