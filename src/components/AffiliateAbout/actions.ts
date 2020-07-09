/**
 * Affiliates About Actions - Created by Jesús Apodaca on 30/06/20.
 */
import {
  RESET_REDUCER_DATA,
  SET_PAYPAL_CURRENCY,
  SET_PAYPAL_CHECK,
  SET_LOADING,
  SET_FILE,
  OPEN_AFFILIATE,
  SUCCESS_REQUEST
} from './constants'
import { AnyAction } from '../../types/common'

export const setPaypalCurrency = (value: string): AnyAction => ({
  type: SET_PAYPAL_CURRENCY,
  value
})

export const setPaypalCheck = (value: boolean): AnyAction => ({
  type: SET_PAYPAL_CHECK,
  value
})

export const setUploadingAction = (value: boolean): AnyAction => ({
  type: SET_LOADING,
  value
})

export const successRequestAction = (): AnyAction => ({
  type: SUCCESS_REQUEST,
})

export const setFileAction = (value: string): AnyAction => ({
  type: SET_FILE,
  value
})

export const openAffiliate = (value: boolean): AnyAction => ({
  type: OPEN_AFFILIATE,
  value
})

export const resetReducerDataAction = (): AnyAction => ({
  type: RESET_REDUCER_DATA
})