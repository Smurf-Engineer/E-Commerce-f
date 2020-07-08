/**
 * AffiliatesPayouts Reducer - Created by Jesús Apodaca on 26/05/20.
 */

import { fromJS } from 'immutable'
import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  searchText: '',
})

const affiliatesPayoutsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default affiliatesPayoutsReducer
