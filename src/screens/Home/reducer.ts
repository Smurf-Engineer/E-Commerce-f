/**
 * Home reducer
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SHOW_SEARCH_RESULTS_HOME,
  SET_SEARCH_PARAM,
  OPEN_QUICKVIEW_ACTION
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  showSearchResults: false,
  searchString: '',
  productId: 0
})

const homeReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_SEARCH_PARAM:
      return state.merge({
        searchString: action.param,
        showSearchResults: true
      })
    case SHOW_SEARCH_RESULTS_HOME:
      return state.set('showSearchResults', action.show)
    case OPEN_QUICKVIEW_ACTION:
      return state.set('productId', action.id)
    default:
      return state
  }
}

export default homeReducer