/**
 * ProDesign  Actions - Created by eduardoquintero on 19/09/19.
 */

import { ON_TAB_CLICK, SET_SEARCH_PRODUCT, SET_PRODUCT_CODE } from './constants'

import { AnyAction, ProductSearchResult } from '../../types/common'

export const onTabClickAction = (selectedKey: string): AnyAction => ({
  type: ON_TAB_CLICK,
  selectedKey
})

export const setSearchProductAction = (
  products: ProductSearchResult[]
): AnyAction => ({
  type: SET_SEARCH_PRODUCT,
  products
})

export const setProductCodeAction = (productCode: string): AnyAction => ({
  type: SET_PRODUCT_CODE,
  productCode
})
