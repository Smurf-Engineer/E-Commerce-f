/**
 * Home reducer
 */

import { fromJS } from 'immutable'
import { DEFAULT_ACTION, OPEN_QUICKVIEW_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  productId: null
})

const homeReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case OPEN_QUICKVIEW_ACTION:
      return state.set('productId', action.id)
    default:
      return state
  }
}

export default homeReducer
