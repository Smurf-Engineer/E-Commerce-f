/**
 * ShoppingCartPage Reducer - Created by gustavomedina on 02/05/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_ITEMS_ACTION,
  ADD_ITEM_DETAIL_ACTION,
  DELETE_ITEM_DETAIL_ACTION,
  SET_LABEL_ITEM_DETAIL_ACTION
} from './constants'
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
      return state.set('cart', fromJS(action.items))
    case ADD_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails'],
        (itemDetails: any) => itemDetails.push({ quantity: 1 })
      )
    case DELETE_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails'],
        (itemDetails: any) => itemDetails.splice(action.index, 1)
      )
    case SET_LABEL_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails'],
        (itemDetails: any) => itemDetails.splice(action.index, 1)
      )
    default:
      return state
  }
}

export default shoppingCartPageReducer
