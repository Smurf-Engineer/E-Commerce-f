/**
 * CustomProductDetail  Actions - Created by jorge on 03/08/18.
 */
import {
  DEFAULT_ACTION,
  SET_SELECTED_GENDER,
  SET_SELECTED_SIZE,
  SET_SELECTED_FIT,
  OPEN_FITINFO
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
