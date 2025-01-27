/**
 * ProAssist Reducer - Created by eduardoquintero on 16/01/20.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_LOADING,
  SET_SEARCH_TEXT
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'pro_assist.id',
  sort: 'desc',
  loading: false,
  searchText: ''
})

const proAssistReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_BY:
      return state.merge({ orderBy: action.orderBy, sort: action.sort })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case SET_LOADING:
      return state.set('loading', action.loading)
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    default:
      return state
  }
}

export default proAssistReducer
