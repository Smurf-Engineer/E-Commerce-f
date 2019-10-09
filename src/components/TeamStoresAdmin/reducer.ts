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
  SET_LOADING_ITEM,
  SET_OPEN_LOCKER_ACTION,
  SET_ITEM_SELECTED_ACTION,
  ON_UNSELECT_ITEM,
  SET_ITEMS_ADD_ACTION,
  SET_PAGINATION_DATA
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
  teamSizeRange: '2-5',
  openCropper: false,
  selectedItems: {},
  currentPageModal: 1,
  limit: 12,
  offset: 0,
  items: [],
  openLocker: false,
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
    case SET_OPEN_LOCKER_ACTION:
      return state.merge({ openLocker: action.isOpen, selectedItems: [] })
    case SET_ITEM_SELECTED_ACTION: {
      const {
        design: { id }
      } = action.item
      const selectedItems = state.get('selectedItems').toJS()
      return state.merge({
        selectedItems: { [id]: action.item, ...selectedItems }
      })
    }
    case ON_UNSELECT_ITEM: {
      return state.removeIn(['selectedItems', action.keyName])
    }
    case SET_ITEMS_ADD_ACTION: {
      const items = state.get('items').toJS()
      const selectedItems = state.get('selectedItems')
      const itemsMap = selectedItems.valueSeq((item: any) => item)
      return state.merge({
        items: [...items, ...itemsMap],
        openLocker: false,
        selectedItems: {}
      })
    }
    case SET_PAGINATION_DATA: {
      return state.merge({
        offset: action.offset,
        currentPageModal: action.page,
        loading: false
      })
    }
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case SET_LOADING:
      return state.set('loading', action.loading)
    case SET_TEAM_STORE_DATA:
      return state.withMutations((tempState: any) => {
        const { teamStore, currencies } = action
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
    default:
      return state
  }
}

export default teamStoresAdminReducer
