/**
 * DesignSearch Reducer - Created by miguelcanobbio on 15/08/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_LOADING,
  SET_ORDER,
  SET_NOT_FOUND,
  RESET_DATA
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  loading: false,
  order: null,
  notFound: false
})

const designSearchReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_LOADING:
      return state.merge({
        order: null,
        notFound: false,
        loading: true
      })
    case SET_ORDER:
      return state.merge({
        order: action.order,
        notFound: false,
        loading: false
      })
    case SET_NOT_FOUND:
      return state.merge({
        order: null,
        notFound: true,
        loading: false
      })
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default designSearchReducer
