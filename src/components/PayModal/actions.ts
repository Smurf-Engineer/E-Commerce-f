/**
 * PayModal  Actions - Created by eduardoquintero on 16/01/20.
 */

import {
  RESET_DATA, SET_PAYMENT,
} from './constants'

import { AnyAction } from '../../types/common'

export const resetDataAction = (): AnyAction => ({
  type: RESET_DATA
})

export const setPaymentMethodAction = (value: string): AnyAction => ({
  type: SET_PAYMENT,
  value
})
