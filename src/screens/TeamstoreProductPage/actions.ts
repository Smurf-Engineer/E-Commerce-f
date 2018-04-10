/**
 * ProductDetail  Actions - Created by cazarez on 12/03/18.
 */
import {
  DEFAULT_ACTION,
  OPEN_FITINFO,
  SET_SELECTED_GENDER,
  SET_SELECTED_FIT,
  SET_SELECTED_SIZE,
  LOADING_3D_MODEL,
  OPEN_DYNAMIC_PRICE_MODAL
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const openFitInfoAction = (open: boolean) => ({
  type: OPEN_FITINFO,
  open
})

export const setSelectedGenderAction = (selected: string) => ({
  type: SET_SELECTED_GENDER,
  selected
})

export const setSelectedSizeAction = (selected: number) => ({
  type: SET_SELECTED_SIZE,
  selected
})

export const setSelectedFitAction = (selected: number) => ({
  type: SET_SELECTED_FIT,
  selected
})

export const setLoadingModel = (loading: boolean): AnyAction => ({
  type: LOADING_3D_MODEL,
  loading
})

export const openDynamicPriceModalAction = (open: boolean): AnyAction => ({
  type: OPEN_DYNAMIC_PRICE_MODAL,
  open
})
