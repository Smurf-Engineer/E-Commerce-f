/**
 * ProductModels Reducer - Created by Jesús Apodaca on 16/12/19.
 */
import { fromJS } from 'immutable'
import { ON_TAB_CLICK } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  selectedKey: 0
})

const productModelsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_TAB_CLICK:
      return state.set('selectedKey', action.selectedKey)
    default:
      return state
  }
}

export default productModelsReducer
