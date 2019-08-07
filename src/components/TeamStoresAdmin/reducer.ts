/**
 * TeamStoresAdmin Reducer - Created by eduardoquintero on 15/07/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_LOADING
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  searchText: '',
  teamStoreId: -1
})

const teamStoresAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_BY:
      return state.merge({ orderBy: action.orderBy, sort: action.sort })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case SET_LOADING:
      return state.set('loading', action.loading)
    default:
      return state
  }
}

export default teamStoresAdminReducer