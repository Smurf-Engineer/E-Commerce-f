/**
 * RoleList Reducer - Created by Jesús Apodaca on 20/03/20.
 */

import { fromJS } from 'immutable'
import {
  SET_FILTER,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  filter: '',
  searchText: ''
})

const roleCatalogReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return state.set('filter', action.filter)
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    default:
      return state
  }
}

export default roleCatalogReducer
