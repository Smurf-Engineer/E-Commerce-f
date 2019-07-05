/**
 * ProductInternalsAdmin Reducer - Created by eduardoquintero on 03/07/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_ID,
  SET_SEARCH_TEXT,
  SET_TEXT,
  SELECT_CHANGE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  id: -1,
  searchText: '',
  loading: false,
  internalId: '',
  productCode: '',
  gender: '',
  size: '',
  fitStyle: '',
  color: '',
  pocketZipper: '',
  frontZipper: '',
  binding: '',
  bibBrace: '',
  collection: ''
})

const productInternalsAdminReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_ORDER_BY:
      return state.merge({ orderBy: action.orderBy, sort: action.sort })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case SET_ID:
      return state.set('id', action.id)
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case SET_TEXT:
      return state.set(action.field, action.value)
    case SELECT_CHANGE:
      return state.set(action.id, action.value)
    default:
      return state
  }
}

export default productInternalsAdminReducer
