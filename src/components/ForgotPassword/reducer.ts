/**
 * Home reducer
 */

import { fromJS } from 'immutable'
import { DEFAULT_ACTION, SET_EMAIL } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  email: ''
})

const resetReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_EMAIL:
      return state.merge({ email: action.param })
    default:
      return state
  }
}

export default resetReducer
