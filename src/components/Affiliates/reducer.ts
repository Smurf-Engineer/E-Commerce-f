/**
 * Affiliates Reducer - Created by Jesús Apodaca on 26/05/20.
 */

import { fromJS } from 'immutable'
import {
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_LOADING,
  SET_DATE,
  SET_SHOW,
  SET_SELECTED
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  loading: false,
  startDate: '',
  endDate: '',
  end: '',
  start: '',
  searchText: '',
  selected: {}
})

const affiliatesReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW: {
      const start = state.get('startDate')
      const end = state.get('endDate')
      return state.merge({
        start,
        end,
        searchText: '',
        currentPage: 1,
        selected: {}
      })
    }
    case SET_SELECTED:
      return state.set('selected', action.value)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case SET_DATE:
      return state.merge({
        startDate: action.startDate,
        endDate: action.endDate,
      })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1, selected: {} })
    default:
      return state
  }
}

export default affiliatesReducer
