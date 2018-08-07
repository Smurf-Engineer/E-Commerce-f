/**
 * CustomProductDetail Reducer - Created by jorge on 03/08/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_SELECTED_GENDER,
  SET_SELECTED_SIZE,
  SET_SELECTED_FIT,
  OPEN_FITINFO,
  SET_SHOW_DETAILS,
  SET_SHOW_SPECS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  selectedGender: {},
  selectedSize: {},
  selectedFit: {},
  openFitInfo: false,
  showDetails: false,
  showSpecs: false
})

const customProductDetailReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_SELECTED_GENDER:
      return state.set('selectedGender', action.selected)
    case SET_SELECTED_SIZE:
      return state.set('selectedSize', action.selected)
    case SET_SELECTED_FIT:
      return state.set('selectedFit', action.selected)
    case OPEN_FITINFO:
      return state.set('openFitInfo', action.open)
    case SET_SHOW_DETAILS:
      return state.set('showDetails', action.show)
    case SET_SHOW_SPECS:
      return state.set('showSpecs', action.show)
    default:
      return state
  }
}

export default customProductDetailReducer
