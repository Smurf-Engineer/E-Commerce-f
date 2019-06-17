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
  REMOVE_MATERIAL,
  ADD_MATERIAL,
  SET_FILE_FIELD,
  SET_DESIGN_CENTER,
  SET_COLORS,
  REMOVE_BANNER,
  ADD_BANNER,
  SET_BANNER,
  ADD_PICTURE,
  SAVED_PRODUCT
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

export const savedProduct = (
  productImages: any[],
  mediaFiles: any[],
  bannerMaterials: any[],
  loadingMessage: string
): AnyAction => ({
  type: SAVED_PRODUCT,
  productImages,
  mediaFiles,
  bannerMaterials,
  loadingMessage
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

export const setColors = (): AnyAction => ({
  type: SET_COLORS
})

export const removeFile = (array: string, index: number): AnyAction => ({
  type: REMOVE_MATERIAL,
  array,
  index
})

export const addFile = (array: string, item: any): AnyAction => ({
  type: ADD_MATERIAL,
  array,
  item
})

export const setFileField = (
  array: string,
  index: number,
  field: string,
  value: any
): AnyAction => ({
  type: SET_FILE_FIELD,
  array,
  index,
  field,
  value
})
export const addPicture = (index: number, item: any): AnyAction => ({
  type: ADD_PICTURE,
  index,
  item
})

export const removeBanner = (index: number): AnyAction => ({
  type: REMOVE_BANNER,
  index
})
export const setDesignCenter = (value: boolean): AnyAction => ({
  type: SET_DESIGN_CENTER,
  value
})
export const addBanner = (item: any): AnyAction => ({
  type: ADD_BANNER,
  item
})

export const setBanner = (
  index: number,
  field: string,
  value: any
): AnyAction => ({
  type: SET_BANNER,
  index,
  field,
  value
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
