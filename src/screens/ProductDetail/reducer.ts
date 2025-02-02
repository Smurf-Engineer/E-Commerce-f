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
  LOADING_IMAGE,
  RESET_DATA,
  DESIGN_MODAL_OPEN
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
  loadingImage: false,
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
      return state.merge({ selectedColor: action.selected, loadingImage: true })
    case LOADING_3D_MODEL:
      return state.set('loadingModel', action.loading)
    case LOADING_IMAGE:
      return state.set('loadingImage', action.loading)
    case DESIGN_MODAL_OPEN:
      return state.set('designModalOpen', action.open)
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default productDetailReducer
