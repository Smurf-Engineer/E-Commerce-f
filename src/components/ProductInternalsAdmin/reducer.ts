/**
 * ProductInternalsAdmin Reducer - Created by eduardoquintero on 03/07/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_TEXT,
  SELECT_CHANGE,
  OPEN_MODAL,
  RESET_MODAL,
  SET_INTERNAL_TO_UPDATE,
  SET_LOADING,
  SET_DOWNLOADING_FILE
} from './constants'
import { Reducer } from '../../types/common'

const modalData = {
  id: -1,
  internalId: '',
  productCode: null,
  gender: null,
  size: null,
  fitStyle: null,
  color: null,
  pocketZipper: null,
  frontZipper: null,
  binding: null,
  bibBrace: null,
  collection: null,
  loading: false,
  downloading: false,
  model: null
}

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  searchText: '',
  modalOpen: false,
  ...{ ...modalData }
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
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case SET_TEXT:
      return state.set(action.field, action.value)
    case SELECT_CHANGE:
      return state.set(action.id, action.value)
    case OPEN_MODAL:
      return state.set('modalOpen', action.open)
    case RESET_MODAL:
      return state.merge({ ...modalData })
    case SET_INTERNAL_TO_UPDATE: {
      return state.merge({
        ...action.internal,
        modalOpen: true,
        loading: false
      })
    }
    case SET_LOADING:
      return state.set('loading', action.loading)
    case SET_DOWNLOADING_FILE:
      return state.set('downloading', action.downloading)
    default:
      return state
  }
}

export default productInternalsAdminReducer
