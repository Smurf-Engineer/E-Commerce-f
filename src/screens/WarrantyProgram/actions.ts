/**
 * WarrantyProgram  Actions - Created by gustavomedina on 07/06/18.
 */
import {
  DEFAULT_ACTION,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_ORDER_NUMBER,
  SET_PRODUCTS_AFFECTED,
  SET_PRODUCT_IS,
  SET_GENDER,
  SET_SIZE,
  SET_PROBLEMS,
  SET_ISSUE_DESCRIPTION
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setFirstName = (someValue: string): AnyAction => ({
  type: SET_FIRST_NAME,
  someValue
})
export const setLastName = (someValue: string): AnyAction => ({
  type: SET_LAST_NAME,
  someValue
})
export const setEmail = (someValue: string): AnyAction => ({
  type: SET_EMAIL,
  someValue
})
export const setOrderNumber = (someValue: string): AnyAction => ({
  type: SET_ORDER_NUMBER,
  someValue
})
export const setProductsAffected = (someValue: string): AnyAction => ({
  type: SET_PRODUCTS_AFFECTED,
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
export const setProblems = (someValue: string): AnyAction => ({
  type: SET_PROBLEMS,
  someValue
})
export const setIssueDescription = (someValue: string): AnyAction => ({
  type: SET_ISSUE_DESCRIPTION,
  someValue
})
