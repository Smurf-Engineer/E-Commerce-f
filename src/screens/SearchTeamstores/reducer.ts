/**
 * Teamstores Reducer - Created by cazarez on 10/04/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_SEARCH_PARAM,
  OPEN_SHARE_MODAL,
  CLEAR_REDUCER
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  searchString: '',
  openShare: false,
  storeId: ''
})

const teamstoresReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_SEARCH_PARAM:
      return state.set('searchString', action.param)
    case OPEN_SHARE_MODAL:
      return state.merge({
        openShare: action.open,
        storeId: action.storeId
      })
    case CLEAR_REDUCER:
      return state.merge({
        searchString: '',
        openShare: false,
        storeId: ''
      })
    default:
      return state
  }
}

export default teamstoresReducer
