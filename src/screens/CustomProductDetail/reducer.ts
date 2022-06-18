/**
 * CustomProductDetail Reducer - Created by jorge on 03/08/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_SELECTED_GENDER,
  SET_SELECTED_SIZE,
  SET_SELECTED_FIT,
  SET_FITS_MODAL,
  OPEN_FITINFO,
  SET_SHOW_DETAILS,
  SET_SHOW_SPECS,
  RESET_DATA,
  SET_UPGRADE_ITEM_DETAIL_ACTION,
  SET_LOADING_ACTION,
  SET_TOP_SELECTED_SIZE,
  SET_BOTTOM_SELECTED_SIZE,
  SET_VARIABLE_VALUE,
  SET_QUANTITY
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  quantity: 1,
  variableOneValue: '',
  variableTwoValue: '',
  selectedGender: {},
  selectedSize: {},
  selectedFit: {},
  firstUpgrade: {},
  secondUpgrade: {},
  thirdUpgrade: {},
  loading: true,
  openFitInfo: false,
  showDetails: false,
  showSpecs: false,
  showFitsModal: false,
  selectedTopSize: {},
  selectedBottomSize: {},
})

const customProductDetailReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_QUANTITY:
      return state.set('quantity', action.value)
    case SET_UPGRADE_ITEM_DETAIL_ACTION:
      return state.set(
        action.isFirst ? 
        'firstUpgrade' : 
        (action.isThird ? 'thirdUpgrade' : 'secondUpgrade'),
        action.upgrade
      )
    case SET_VARIABLE_VALUE:
      return state.set(action.name, action.newText)
    case SET_SELECTED_GENDER:
      return state.set('selectedGender', action.selected)
    case SET_SELECTED_SIZE:
      return state.set('selectedSize', action.selected)
    case SET_TOP_SELECTED_SIZE:
      return state.set('selectedTopSize', action.selected)
    case SET_BOTTOM_SELECTED_SIZE:
      return state.set('selectedBottomSize', action.selected)
    case SET_SELECTED_FIT:
      return state.set('selectedFit', action.selected)
    case SET_FITS_MODAL:
      return state.set('showFitsModal', action.showFits)
    case OPEN_FITINFO:
      return state.set('openFitInfo', action.open)
    case SET_SHOW_DETAILS:
      return state.set('showDetails', action.show)
    case SET_SHOW_SPECS:
      return state.set('showSpecs', action.show)
    case SET_LOADING_ACTION:
      return state.set('loading', action.loading)
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default customProductDetailReducer
