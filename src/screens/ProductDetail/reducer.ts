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
  SET_SELECTED_FIT,
  SET_SELECTED_COLOR,
  LOADING_3D_MODEL,
  RESET_DATA
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  openFitInfo: false,
  showBuyNowSection: false,
  selectedGender: {},
  selectedSize: {},
  selectedFit: {},
  selectedColor: {},
  categoryName: '',
  loadingModel: false,
  itemToAddCart: {}
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
      return state.set('selectedSize', action.selected)
    case SET_SELECTED_FIT:
      return state.set('selectedFit', action.selected)
    case SET_SELECTED_COLOR:
      return state.set('selectedColor', action.selected)
    case LOADING_3D_MODEL:
      return state.set('loadingModel', action.loading)
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default productDetailReducer
