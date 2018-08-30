/**
 * Overview Actions - Created by jorge on 30/07/18.
 */

import { SET_ORDER_ID } from './constants'
import { AnyAction } from '../../types/common'

export const setOrderIdAction = (orderId: string): AnyAction => ({
  type: SET_ORDER_ID,
  orderId
})
