/**
 * ShoppingCartPage  Actions - Created by gustavomedina on 02/05/18.
 */
import {
  DEFAULT_ACTION,
  SET_ITEMS_ACTION,
  ADD_ITEM_DETAIL_ACTION,
  DELETE_ITEM_DETAIL_ACTION,
  SET_LABEL_ITEM_DETAIL_ACTION,
  SET_GENDER_ITEM_DETAIL_ACTION,
  SET_SIZE_ITEM_DETAIL_ACTION,
  SET_FIT_ITEM_DETAIL_ACTION,
  SET_QUANTITY_ITEM_DETAIL_ACTION,
  REMOVE_ITEM_ACTION,
  SET_TOTAL_ACTION,
  SET_SUBTOTAL_ACTION,
  SET_SHIPPING_ACTION,
  SHOW_DELETE_LAST_ITEM_MODAL,
  SET_COLOR_ITEM_DETAIL_ACTION,
  RESET_REDUCER_DATA,
  SHOW_REVIEW_DESIGN_MODAL,
  OPEN_FITINFO
} from './constants'
import {
  AnyAction,
  ItemDetailType,
  CartItems,
  ProductColors
} from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setItemsAction = (items: CartItems[]): AnyAction => ({
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
  detailIndex: number,
  label: string
): AnyAction => ({
  type: SET_LABEL_ITEM_DETAIL_ACTION,
  index,
  detailIndex,
  label
})

export const setGenderItemDetailAction = (
  index: number,
  detailIndex: number,
  gender: ItemDetailType
): AnyAction => ({
  type: SET_GENDER_ITEM_DETAIL_ACTION,
  index,
  detailIndex,
  gender
})

export const setColorItemDetailAction = (
  index: number,
  detailIndex: number,
  color: ProductColors
): AnyAction => ({
  type: SET_COLOR_ITEM_DETAIL_ACTION,
  index,
  detailIndex,
  color
})

export const setSizeItemDetailAction = (
  index: number,
  detailIndex: number,
  size: ItemDetailType
): AnyAction => ({
  type: SET_SIZE_ITEM_DETAIL_ACTION,
  index,
  detailIndex,
  size
})

export const setFitItemDetailAction = (
  index: number,
  detailIndex: number,
  fit: ItemDetailType
): AnyAction => ({
  type: SET_FIT_ITEM_DETAIL_ACTION,
  index,
  detailIndex,
  fit
})

export const setQuantityItemDetailAction = (
  index: number,
  detailIndex: number,
  quantity: string
): AnyAction => ({
  type: SET_QUANTITY_ITEM_DETAIL_ACTION,
  index,
  detailIndex,
  quantity
})

export const removeItemAction = (index: number): AnyAction => ({
  type: REMOVE_ITEM_ACTION,
  index
})

export const setTotalAction = (total: number): AnyAction => ({
  type: SET_TOTAL_ACTION,
  total
})

export const setSubtotalAction = (subtotal: number): AnyAction => ({
  type: SET_SUBTOTAL_ACTION,
  subtotal
})

export const setShippingAction = (shipping: number): AnyAction => ({
  type: SET_SHIPPING_ACTION,
  shipping
})

export const resetReducerData = (): AnyAction => ({
  type: RESET_REDUCER_DATA
})

export const showDeleteLastItemModalAction = (show: boolean): AnyAction => ({
  type: SHOW_DELETE_LAST_ITEM_MODAL,
  show
})

export const showReviewDesignModalAction = (): AnyAction => ({
  type: SHOW_REVIEW_DESIGN_MODAL
})

export const openFitInfoAction = (open: boolean, selectedIndex: number) => ({
  type: OPEN_FITINFO,
  open,
  selectedIndex
})
