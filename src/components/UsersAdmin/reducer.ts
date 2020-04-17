/**
 * UsersAdmin Reducer - Created by eduardoquintero on 29/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_ORDER_BY,
  SET_CURRENT_PAGE,
  RESET_DATA,
  SET_SEARCH_TEXT,
  ON_INPUT_CHANGE,
  ON_CHANGE_SECTION,
  ON_TOGGLE_MODAL,
  ON_RESET_MODAL,
  SET_LOADING,
  SET_DESIGN,
  CHANGE_NOTE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  currentPage: 1,
  orderBy: 'id',
  sort: 'desc',
  searchText: '',
  firstName: '',
  name: '',
  designSelected: '',
  note: '',
  lastName: '',
  email: '',
  showLocker: true,
  openModal: false,
  loading: false
})

const usersAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_BY:
      return state.merge({ orderBy: action.orderBy, sort: action.sort })
    case SET_CURRENT_PAGE:
      return state.set('currentPage', action.page)
    case CHANGE_NOTE:
      return state.set('note', action.text)
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
      return state.set('showLocker', action.section)
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
