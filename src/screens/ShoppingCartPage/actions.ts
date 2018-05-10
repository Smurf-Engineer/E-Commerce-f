/**
 * ShoppingCartPage  Actions - Created by gustavomedina on 02/05/18.
 */
import {
  DEFAULT_ACTION,
  SET_ITEMS_ACTION,
  ADD_ITEM_DETAIL_ACTION,
  DELETE_ITEM_DETAIL_ACTION,
  SET_LABEL_ITEM_DETAIL_ACTION
} from './constants'
import { AnyAction, Product } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setItemsAction = (items: Product[]): AnyAction => ({
  type: SET_ITEMS_ACTION,
  items
})

export const addItemDetailAction = (index: number): AnyAction => ({
  type: ADD_ITEM_DETAIL_ACTION,
  index
})

export const deleteItemDetailAction = (
  index: number,
  detailIndex: number
): AnyAction => ({
  type: DELETE_ITEM_DETAIL_ACTION,
  index,
  detailIndex
})

export const setLabelItemDetailAction = (
  index: number,
  detailIndex: number
): AnyAction => ({
  type: SET_LABEL_ITEM_DETAIL_ACTION,
  index,
  detailIndex
})
