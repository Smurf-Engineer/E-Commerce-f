/**
 * TeamStoresAdmin Reducer - Created by eduardoquintero on 15/07/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_LOADING,
  SET_PRICE_ITEM,
  SET_TEAM_STORE_DATA,
  SET_LOADING_ITEM
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  searchText: '',
  teamStoreId: -1,
  teamStore: {},
  currencies: [],
  loading: true
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
    case SET_TEAM_STORE_DATA:
      return state.withMutations((tempState: any) => {
        const teamStore = action.teamStore
        const currencies = action.currencies
        tempState.merge({ teamStore, currencies })
        return tempState
      })
    case SET_PRICE_ITEM:
      return state.updateIn(
        ['teamStore', 'items', action.itemIndex],
        (item: any) => {
          return item.setIn(['pricesByCurrency', action.currency], action.value)
        }
      )
    case SET_LOADING_ITEM:
      return state.updateIn(
        ['teamStore', 'items', action.itemIndex],
        (item: any) => item.set('loading', action.loading)
      )
    /* return state.withMutations((tempState: any) => {
        const initialLoadingValues = { desktopImage: false, mobileImage: false }
        tempState.updateIn(
          ['items'],
          (items: []) =>
            images.push(fromJS(action.imagePlaceholder))
        )
        tempState.updateIn(['secondaryHeaderLoading'], (loadings: [any]) =>
          loadings.push(fromJS(initialLoadingValues))
        )
        return tempState
      }) */
    default:
      return state
  }
}

export default teamStoresAdminReducer
