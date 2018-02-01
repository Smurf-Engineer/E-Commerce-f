/**
 * Home reducer
 */

import { fromJS } from 'immutable'
import { DEFAULT_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer'
})

const homeReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    default:
      return state
  }
}

export default homeReducer
