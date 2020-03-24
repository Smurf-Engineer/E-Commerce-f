/**
 * SalesRep Reducer - Created by Jesús Apodaca on 23/03/20.
 */

import { fromJS } from 'immutable'
import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_NAME,
  SET_OPEN_MODAL,
  SET_LOADING
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  name: '',
  open: true,
  loading: false,
  lastName: '',
  searchText: ''
})

const salesRepReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return state.set('loading', action.loading)
    case SET_OPEN_MODAL:
      return state.set('open', action.open)
    case SET_NAME:
      return state.set(action.field, action.value)
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
