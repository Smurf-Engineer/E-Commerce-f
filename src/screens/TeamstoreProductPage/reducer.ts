/**
 * TeamstoreProductPage Reducer - Created by cazarez on 06/04/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  OPEN_FITINFO,
  SET_SELECTED_GENDER,
  SET_SELECTED_SIZE,
  SET_SELECTED_FIT,
  OPEN_DYNAMIC_PRICE_MODAL
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  openFitInfo: false,
  selectedGender: '',
  selectedSize: -1,
  selectedFit: -1,
  showDynamicPrice: false
})

const teamstoreProductPageReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case OPEN_FITINFO:
      return state.set('openFitInfo', action.open)
    case SET_SELECTED_GENDER:
      return state.set('selectedGender', action.selected)
    case SET_SELECTED_SIZE:
      return state.set('selectedSize', parseInt(action.selected, 10))
    case SET_SELECTED_FIT:
      return state.set('selectedFit', parseInt(action.selected, 10))
    case OPEN_DYNAMIC_PRICE_MODAL:
      return state.set('showDynamicPrice', action.open)
    default:
      return state
  }
}

export default teamstoreProductPageReducer
