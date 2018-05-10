/**
 * ShoppingCartPage Reducer - Created by gustavomedina on 02/05/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_ITEMS_ACTION,
  ADD_ITEM_DETAIL_ACTION,
  DELETE_ITEM_DETAIL_ACTION,
  SET_LABEL_ITEM_DETAIL_ACTION,
  SET_QUANTITY_ITEM_DETAIL_ACTION,
  SET_GENDER_ITEM_DETAIL_ACTION,
  SET_SIZE_ITEM_DETAIL_ACTION,
  SET_FIT_ITEM_DETAIL_ACTION,
  REMOVE_ITEM_ACTION
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
        (itemDetails: any) => itemDetails.push(fromJS({ quantity: 1 }))
      )
    case DELETE_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails'],
        (itemDetails: any) => {
          if (itemDetails.length > 1) {
            return itemDetails.splice(action.detailIndex, 1)
          } else {
            return itemDetails
          }
        }
      )
    case SET_LABEL_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set('label', action.label)
          return updateItem
        }
      )
    case SET_QUANTITY_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set('quantity', action.quantity)
          return updateItem
        }
      )

    case SET_GENDER_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set('gender', action.gender)
          return updateItem
        }
      )
    case SET_SIZE_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set('size', action.size)
          return updateItem
        }
      )
    case SET_FIT_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set('fit', action.fit)
          return updateItem
        }
      )
    case REMOVE_ITEM_ACTION:
      return state.updateIn(['cart'], (items: any) =>
        items.splice(action.index, 1)
      )
    default:
      return state
  }
}

export default shoppingCartPageReducer
