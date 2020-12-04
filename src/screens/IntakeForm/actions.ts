/**
 * ProductCatalog  Actions - Created by cazarez on 27/02/18.
 */
import {
  SELECT_PRODUCT,
  DESELECT_PRODUCT
} from './constants'

export const selectProductAction = (productId: number) => ({
  type: SELECT_PRODUCT,
  productId
})

export const deselectProductAction = (productId: number) => ({
  type: DESELECT_PRODUCT,
  productId
})