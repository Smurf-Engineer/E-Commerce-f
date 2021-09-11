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
  REMOVE_ITEM_ACTION,
  SET_TOTAL_ACTION,
  SET_SUBTOTAL_ACTION,
  SET_SHIPPING_ACTION,
  SET_COLOR_ITEM_DETAIL_ACTION,
  SHOW_DELETE_LAST_ITEM_MODAL,
  RESET_REDUCER_DATA,
  SHOW_REVIEW_DESIGN_MODAL,
  OPEN_FITINFO,
  OPEN_STORE_INFO,
  SET_STORE_TERMS,
  HIGHLIGHT_FIELDS,
  SET_TOP_SIZE_ITEM_DETAIL_ACTION,
  SET_BOTTOM_SIZE_ITEM_DETAIL_ACTION,
  SET_UPGRADE_ITEM_DETAIL_ACTION,
  SET_VARIABLE_VALUE,
  VERIFY_ITEMS,
  CLEAR_CART
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  cart: null,
  subtotal: 0,
  total: 0,
  shipping: 0,
  openStoreInfo: false,
  storeTerms: false,
  showDeleteLastItemModal: false,
  showReviewDesignModal: false,
  openFitInfo: false,
  selectedIndex: 0,
  highlightFields: false,
  itemsVerified: false
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
    case CLEAR_CART:
      return state.merge({
        cart: null,
        itemsVerified: true
      })
    case ADD_ITEM_DETAIL_ACTION: {
      const { index } = action
      const color = state.getIn(['cart', index, 'itemDetails', 0, 'color'])
      return state.updateIn(
        ['cart', index, 'itemDetails'],
        (itemDetails: any) => itemDetails.push(fromJS({ color, quantity: 1 }))
      )
    }
    case VERIFY_ITEMS:
      return state.set('itemsVerified', action.verified)
    case SET_STORE_TERMS:
      return state.set('storeTerms', action.checked)
    case OPEN_STORE_INFO:
      return state.set('openStoreInfo', action.open)
    case DELETE_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails'],
        (itemDetails: any) => itemDetails.splice(action.detailIndex, 1)
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
    case SET_VARIABLE_VALUE:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set(action.variable, action.value)
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

    case SET_UPGRADE_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set(action.isFirst ? 'firstUpgrade' : 'secondUpgrade', action.upgrade)
          return updateItem
        }
      )
    case SET_COLOR_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set('color', action.color)
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
    case SET_TOP_SIZE_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set('topSize', action.size)
          return updateItem
        }
      )
    case SET_BOTTOM_SIZE_ITEM_DETAIL_ACTION:
      return state.updateIn(
        ['cart', action.index, 'itemDetails', action.detailIndex],
        (detailItem: any) => {
          const updateItem = detailItem.set('bottomSize', action.size)
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
    case SET_TOTAL_ACTION:
      return state.set('total', fromJS(action.total))
    case SET_SUBTOTAL_ACTION:
      return state.set('subtotal', fromJS(action.subtotal))
    case SET_SHIPPING_ACTION:
      return state.set('shipping', fromJS(action.shipping))
    case SHOW_DELETE_LAST_ITEM_MODAL:
      return state.set('showDeleteLastItemModal', action.show)
    case RESET_REDUCER_DATA:
      return initialState
    case SHOW_REVIEW_DESIGN_MODAL:
      return state.set('showReviewDesignModal', action.show)
    case OPEN_FITINFO:
      return state.merge({
        openFitInfo: action.open,
        selectedIndex: action.selectedIndex || 0
      })
    case HIGHLIGHT_FIELDS:
      return state.set('highlightFields', true)
    default:
      return state
  }
}

export default shoppingCartPageReducer
