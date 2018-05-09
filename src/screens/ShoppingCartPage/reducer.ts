/**
 * ShoppingCartPage Reducer - Created by gustavomedina on 02/05/18.
 */
import { fromJS } from 'immutable'
import { DEFAULT_ACTION, SET_ITEMS_ACTION } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  cart: null
})

const shoppingCartPageReducer: Reducer<any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_ITEMS_ACTION:
      return state.set('cart', action.items)
    default:
      return state
  }
}

export default shoppingCartPageReducer
