/**
 * WarrantyProgram  Actions - Created by gustavomedina on 07/06/18.
 */
import {
  DEFAULT_ACTION,
  SET_PRODUCT_IS,
  SET_GENDER,
  SET_SIZE,
  SET_PROBLEMS,
  SET_ISSUE_DESCRIPTION,
  SET_LOADING_ACTION,
  VALID_FORM,
  RESET_REDUCER_DATA,
  CHANGE_INPUT
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})
export const setProductIs = (someValue: string): AnyAction => ({
  type: SET_PRODUCT_IS,
  someValue
})
export const setGender = (someValue: string): AnyAction => ({
  type: SET_GENDER,
  someValue
})
export const setSize = (someValue: string): AnyAction => ({
  type: SET_SIZE,
  someValue
})
export const setProblems = (someValue: string[]): AnyAction => ({
  type: SET_PROBLEMS,
  someValue
})
export const setIssueDescription = (someValue: string): AnyAction => ({
  type: SET_ISSUE_DESCRIPTION,
  someValue
})
export const setLoadingAction = (someValue: boolean): AnyAction => ({
  type: SET_LOADING_ACTION,
  someValue
})
export const validFormAction = (someValue: boolean): AnyAction => ({
  type: VALID_FORM,
  someValue
})
export const resetReducerDataAction = (): AnyAction => ({
  type: RESET_REDUCER_DATA
})
export const inputChangeAction = (id: string, value: string): AnyAction => ({
  type: CHANGE_INPUT,
  id,
  value
})
