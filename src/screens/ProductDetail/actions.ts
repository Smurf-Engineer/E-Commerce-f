/**
 * ProductDetail  Actions - Created by cazarez on 12/03/18.
 */
import {
  DEFAULT_ACTION,
  SHOW_BUYNOW_OPTIONS,
  OPEN_FITINFO,
  SET_SELECTED_GENDER,
  SET_SELECTED_FIT,
  SET_SELECTED_SIZE,
  LOADING_3D_MODEL,
  LOADING_IMAGE,
  ADD_ITEM_TO_CART,
  RESET_DATA,
  SET_SELECTED_COLOR,
  DESIGN_MODAL_OPEN
} from './constants'
import { AnyAction, SelectedType } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const openFitInfoAction = (open: boolean) => ({
  type: OPEN_FITINFO,
  open
})

export const showBuyNowOptionsAction = (show: boolean): AnyAction => ({
  type: SHOW_BUYNOW_OPTIONS,
  show
})

export const setSelectedGenderAction = (selected: SelectedType) => ({
  type: SET_SELECTED_GENDER,
  selected
})

export const setSelectedSizeAction = (selected: SelectedType) => ({
  type: SET_SELECTED_SIZE,
  selected
})

export const setSelectedFitAction = (selected: SelectedType) => ({
  type: SET_SELECTED_FIT,
  selected
})

export const setLoadingModel = (loading: boolean): AnyAction => ({
  type: LOADING_3D_MODEL,
  loading
})

export const addItemToCartAction = (item: any): AnyAction => ({
  type: ADD_ITEM_TO_CART,
  item
})

export const resetReducerAction = (): AnyAction => ({
  type: RESET_DATA
})

export const setSelectedColorAction = (selected: SelectedType): AnyAction => ({
  type: SET_SELECTED_COLOR,
  selected
})

export const setLoadingImageAction = (loading: boolean): AnyAction => ({
  type: LOADING_IMAGE,
  loading
})

export const setDesignModalOpenAction = (open: boolean): AnyAction => ({
  type: DESIGN_MODAL_OPEN,
  open
})
