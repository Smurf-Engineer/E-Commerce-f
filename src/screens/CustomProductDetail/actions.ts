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
  RESET_DATA
} from './constants'
import { AnyAction, SelectedType } from '../../types/common'

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

export const setSelectedFitAction = (selected: SelectedType) => ({
  type: SET_SELECTED_FIT,
  selected
})

export const openFitInfoAction = (open: boolean) => ({
  type: OPEN_FITINFO,
  open
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
