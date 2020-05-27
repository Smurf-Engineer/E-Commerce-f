/**
 * Affiliate Options Reducer - Created by Jesús Apodaca on 25/05/20.
 */
import { fromJS } from 'immutable'
import {
  SET_MODAL_LOADING,
  RESET_REDUCER_DATA,
  SET_LOADING,
  OPEN_AFFILIATE,
  SUCCESS_REQUEST,
  ON_PAGE_CHANGE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  loading: false,
  link: false,
  currentPage: 1,
  openModal: false,
})

const affiliateOptionsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_PAGE_CHANGE:
      return state.set('currentPage', action.page)
    case OPEN_AFFILIATE:
      return state.set('openModal', action.value)
    case SET_LOADING:
      return state.set('loading', action.value)
    case SUCCESS_REQUEST:
      return state.merge({
        link: true,
        loading: false
      })
    case SET_MODAL_LOADING:
      return state.set('modalLoading', action.loading)
    case RESET_REDUCER_DATA:
      return initialState
    default:
      return state
  }
}

export default affiliateOptionsReducer
