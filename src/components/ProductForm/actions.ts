/**
 * OrderHistoryAdmin  Actions - Created by eduardoquintero on 07/05/19.
 */

import {
  SET_PRODUCT_DATA,
  CHANGE_VALUE,
  RESET_DATA,
  SET_LOADING
} from './constants'
import { AnyAction, Product } from '../../types/common'

export const setProductAction = (product: Product): AnyAction => ({
  type: SET_PRODUCT_DATA,
  product
})

export const setValue = (field: string, value: any): AnyAction => ({
  type: CHANGE_VALUE,
  field,
  value
})

export const resetData = () => ({
  type: RESET_DATA
})

export const setUploadingAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING,
  loading
})
