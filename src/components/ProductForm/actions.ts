/**
 * ProductForm  Actions - Created by Apodaca on 17/05/19.
 */

import {
  SET_PRODUCT_DATA,
  CHANGE_VALUE,
  RESET_DATA,
  SET_BANNERS,
  SET_LOADING,
  SET_GENDERS,
  SET_CURRENCIES,
  SET_CHECK,
  REMOVE_MATERIAL
} from './constants'
import { AnyAction, Product } from '../../types/common'

export const setProductAction = (
  product: Product,
  extraData: any
): AnyAction => ({
  type: SET_PRODUCT_DATA,
  product,
  extraData
})

export const setValue = (field: string, value: any): AnyAction => ({
  type: CHANGE_VALUE,
  field,
  value
})

export const setBannerActions = (banners: any): AnyAction => ({
  type: SET_BANNERS,
  banners
})

export const setGenderActions = (genders: any): AnyAction => ({
  type: SET_GENDERS,
  genders
})

export const setCheck = (
  selected: string,
  id: number,
  checked: boolean
): AnyAction => ({
  type: SET_CHECK,
  selected,
  id,
  checked
})

export const removeMaterial = (id: number, checked: boolean): AnyAction => ({
  type: REMOVE_MATERIAL,
  id,
  checked
})
export const setCurrencies = (currencies: any): AnyAction => ({
  type: SET_CURRENCIES,
  currencies
})

export const resetData = () => ({
  type: RESET_DATA
})

export const setUploadingAction = (
  loading: boolean,
  loadingMessage: string
): AnyAction => ({
  type: SET_LOADING,
  loading,
  loadingMessage
})
