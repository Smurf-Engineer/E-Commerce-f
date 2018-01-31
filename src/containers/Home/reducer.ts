/**
 * Home reducer
 */

import { fromJS } from 'immutable'
import { DEFAULT_ACTION } from './constants'
import { Reducer } from '../../types/common'

const initialState = fromJS({
  someKey: 'This is a value from reducer'
})

const homeReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', 'Value changed')
    default:
      return state
  }
}

export default homeReducer
