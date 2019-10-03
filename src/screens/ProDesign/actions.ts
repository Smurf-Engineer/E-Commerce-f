/**
 * ProDesign  Actions - Created by eduardoquintero on 19/09/19.
 */

import {
  ON_TAB_CLICK,
  SET_PRODUCT_CODE,
  SET_PRODUCT_TO_SEARCH
} from './constants'

import { AnyAction } from '../../types/common'

export const onTabClickAction = (selectedKey: string): AnyAction => ({
  type: ON_TAB_CLICK,
  selectedKey
})

export const setProductCodeAction = (productCode: string): AnyAction => ({
  type: SET_PRODUCT_CODE,
  productCode
})

export const setProductToSearchAction = (value: string): AnyAction => ({
  type: SET_PRODUCT_TO_SEARCH,
  value
})
