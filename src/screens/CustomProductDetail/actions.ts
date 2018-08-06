/**
 * CustomProductDetail  Actions - Created by jorge on 03/08/18.
 */
import { DEFAULT_ACTION, SET_SELECTED_GENDER } from './constants'
import { AnyAction, SelectedType } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setSelectedGenderAction = (selected: SelectedType) => ({
  type: SET_SELECTED_GENDER,
  selected
})
