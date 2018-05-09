/**
 * ShoppingCartPage  Actions - Created by gustavomedina on 02/05/18.
 */
import { DEFAULT_ACTION, SET_ITEMS_ACTION } from './constants'
import { AnyAction, Product } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setItemsAction = (items: Product[]): AnyAction => ({
  type: SET_ITEMS_ACTION,
  items
})
