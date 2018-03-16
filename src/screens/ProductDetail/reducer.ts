/**
 * ProductDetail Reducer - Created by cazarez on 12/03/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SHOW_BUYNOW_OPTIONS,
  OPEN_FITINFO,
  SET_SELECTED_GENDER,
  SET_SELECTED_SIZE,
  SET_SELECTED_FIT
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  openFitInfo: false,
  showBuyNowSection: false,
  selectedGender: '',
  selectedSize: -1,
  selectedFit: -1,
  categoryName: ''
})

const productDetailReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SHOW_BUYNOW_OPTIONS:
      return state.set('showBuyNowSection', action.show)
    case OPEN_FITINFO:
      return state.set('openFitInfo', action.open)
    case SET_SELECTED_GENDER:
      return state.set('selectedGender', action.selected)
    case SET_SELECTED_SIZE:
      return state.set('selectedSize', parseInt(action.selected, 10))
    case SET_SELECTED_FIT:
      return state.set('categoryName', action.name)
    default:
      return state
  }
}

export default productDetailReducer
