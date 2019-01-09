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
  OPEN_DYNAMIC_PRICE_MODAL,
  SET_TEAM_STORE_STATUS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  openFitInfo: false,
  selectedGender: {},
  selectedSize: {},
  selectedFit: {},
  showDynamicPrice: false,
  showTeamStores: null
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
      return state.set('selectedSize', action.selected)
    case SET_SELECTED_FIT:
      return state.set('selectedFit', action.selected)
    case OPEN_DYNAMIC_PRICE_MODAL:
      return state.set('showDynamicPrice', action.open)
    case SET_TEAM_STORE_STATUS:
      return state.set('showTeamStores', action.show)
    default:
      return state
  }
}

export default teamstoreProductPageReducer
