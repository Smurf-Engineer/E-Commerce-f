/**
 * Home reducer
 */

import { fromJS } from 'immutable'
import { DEFAULT_ACTION, SET_PASSWORD, SET_CONFIRM_PASSWORD } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  password: '',
  confirmPassword: ''
})

const resetReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_PASSWORD:
      return state.merge({ password: action.param })
    case SET_CONFIRM_PASSWORD:
      return state.merge({ confirmPassword: action.param })
    default:
      return state
  }
}

export default resetReducer
