/**
 * SalesRep Reducer - Created by Jesús Apodaca on 23/03/20.
 */

import { fromJS } from 'immutable'
import { SET_CURRENT_PAGE, RESET_DATA, SET_SEARCH_TEXT } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  searchText: ''
})

const salesRepReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
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

export default salesRepReducer
