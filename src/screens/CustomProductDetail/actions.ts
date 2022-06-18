/**
 * CustomProductDetail  Actions - Created by jorge on 03/08/18.
 */
import {
  DEFAULT_ACTION,
  SET_SELECTED_GENDER,
  SET_SELECTED_SIZE,
  SET_SELECTED_FIT,
  OPEN_FITINFO,
  SET_SHOW_DETAILS,
  SET_FITS_MODAL,
  SET_SHOW_SPECS,
  SET_LOADING_ACTION,
  RESET_DATA,
  SET_TOP_SELECTED_SIZE,
  SET_BOTTOM_SELECTED_SIZE,
  SET_UPGRADE_ITEM_DETAIL_ACTION,
  SET_VARIABLE_VALUE,
  SET_QUANTITY
} from './constants'
import { AnyAction, ItemDetailType, SelectedType } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setSelectedGenderAction = (selected: SelectedType) => ({
  type: SET_SELECTED_GENDER,
  selected
})

export const setFitsModal = (showFits: boolean) => ({
  type: SET_FITS_MODAL,
  showFits
})

export const setSelectedSizeAction = (selected: SelectedType) => ({
  type: SET_SELECTED_SIZE,
  selected
})

export const setSelectedTopSizeAction = (selected: SelectedType) => ({
  type: SET_TOP_SELECTED_SIZE,
  selected
})

export const setSelectedBottomSizeAction = (selected: SelectedType) => ({
  type: SET_BOTTOM_SELECTED_SIZE,
  selected
})

export const setUpgradeOption = (
  isFirst: boolean,
  upgrade: ItemDetailType,
  isThird: boolean
): AnyAction => ({
  type: SET_UPGRADE_ITEM_DETAIL_ACTION,
  isFirst,
  upgrade,
  isThird
})

export const setVariableValue = (
  name: string,
  newText: string,
): AnyAction => ({
  type: SET_VARIABLE_VALUE,
  name,
  newText,
})

export const setQuantityValue = (value: number): AnyAction => ({
  type: SET_QUANTITY,
  value,
})

export const setSelectedFitAction = (selected: SelectedType) => ({
  type: SET_SELECTED_FIT,
  selected
})

export const openFitInfoAction = (open: boolean) => ({
  type: OPEN_FITINFO,
  open
})

export const setLoadingAction = (loading: boolean) => ({
  type: SET_LOADING_ACTION,
  loading
})

export const setShowDetailsAction = (show: boolean) => ({
  type: SET_SHOW_DETAILS,
  show
})

export const setShowSpecsAction = (show: boolean) => ({
  type: SET_SHOW_SPECS,
  show
})

export const resetDataAction = () => ({
  type: RESET_DATA
})
