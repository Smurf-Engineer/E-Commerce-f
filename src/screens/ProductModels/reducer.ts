/**
 * ProductModels Reducer - Created by Jesús Apodaca on 16/12/19.
 */
import { fromJS } from 'immutable'
import { ON_TAB_CLICK, OPEN_MODAL } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  selectedKey: 0,
  openModal: true
})

const productModelsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return state.set('openModal', action.open)
    case ON_TAB_CLICK:
      return state.set('selectedKey', action.selectedKey)
    default:
      return state
  }
}

export default productModelsReducer
