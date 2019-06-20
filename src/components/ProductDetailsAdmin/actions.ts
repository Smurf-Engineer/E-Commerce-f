/**
 * OrderHistoryAdmin  Actions - Created by eduardoquintero on 07/05/19.
 */

import { SET_PRODUCT_DATA } from './constants'
import { AnyAction, Product } from '../../types/common'

export const setProductAction = (product: Product): AnyAction => ({
  type: SET_PRODUCT_DATA,
  product
})
