/**
 * UsersAdmin Reducer - Created by eduardoquintero on 29/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  SET_SEARCH,
  SET_SEARCH_MANAGER,
  ON_INPUT_CHANGE,
  ON_CHANGE_SECTION,
  ON_TOGGLE_MODAL,
  ON_RESET_MODAL,
  SET_LOADING,
  SET_DESIGN,
  CHANGE_NOTE,
  SET_AFFILIATE_PAGE,
  SET_RESELLER_PAGE,
  SET_CHECKED,
  CLOSE_INTERNAL,
  OPEN_INTERNAL,
  CHANGE_INTERNAL
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  searchText: '',
  repSearchText: '',
  managerSearchText: '',
  firstName: '',
  name: '',
  isReseller: false,
  isAffiliate: false,
  designSelected: '',
  note: '',
  lastName: '',
  email: '',
  optionSelected: 0,
  openModal: false,
  openInternalModal: false,
  netsuiteId: '',
  loading: false,
  pageReseller: 0,
  pageAffiliate: 1
})

const usersAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECKED:
      return state.set(action.name, action.checked)
    case SET_SEARCH_MANAGER:
      return state.set('managerSearchText', action.value)
    case SET_SEARCH:
      return state.set('repSearchText', action.value)
    case SET_AFFILIATE_PAGE:
      return state.set('pageAffiliate', action.page)
    case SET_ORDER_BY:
      return state.merge({ orderBy: action.orderBy, sort: action.sort })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case SET_RESELLER_PAGE:
      return state.set('pageReseller', action.page)
    case CHANGE_NOTE:
      return state.set('note', action.text)
    case CHANGE_INTERNAL:
      return state.set('netsuiteId', action.value)
    case OPEN_INTERNAL:
      return state.merge({ openInternalModal: true, netsuiteId: action.id })
    case CLOSE_INTERNAL:
      return state.merge({ openInternalModal: false, netsuiteId: '' })
    case SET_DESIGN:
      return state.merge({
        designSelected: action.designId,
        note: '',
        loading: false
      })
    case RESET_DATA:
      return initialState
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    case ON_INPUT_CHANGE: {
      const { id, value } = action
      return state.set(id, value)
    }
    case ON_CHANGE_SECTION:
      return state.set('optionSelected', action.section)
    case ON_TOGGLE_MODAL:
      return state.set('openModal', !state.get('openModal'))
    case ON_RESET_MODAL:
      return state.merge({
        openModal: false,
        name: '',
        lastName: '',
        email: '',
        loading: false
      })
    case SET_LOADING:
      return state.set('loading', action.loading)
    default:
      return state
  }
}

export default usersAdminReducer
