/**
 * ProductForm  Actions - Created by Apodaca on 17/05/19.
 */

import {
  SET_PRODUCT_DATA,
  CHANGE_VALUE,
  RESET_DATA,
  SET_LOADING,
  SET_GENDERS,
  SET_CURRENCIES,
  SET_CHECK,
  REMOVE_MATERIAL,
  ADD_MATERIAL,
  MOVE_MATERIAL,
  SET_FILE_FIELD,
  SET_DESIGN_CENTER,
  SET_COLORS,
  REMOVE_BANNER,
  ADD_BANNER,
  MOVE_BANNER,
  SET_BANNER,
  SAVED_PRODUCT,
  ENABLE_SPORT,
  SET_SPORT,
  SET_PROMPT,
  SET_SPEC,
  SET_MATERIAL,
  SET_MEDIA,
  ADD_MEDIA,
  REMOVE_MEDIA,
  SET_MODEL_SIZE
} from './constants'
import { AnyAction, Product, ProductFile } from '../../types/common'

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

export const setPrompt = (value: boolean): AnyAction => ({
  type: SET_PROMPT,
  value
})

export const enableNewSportAction = (value: boolean): AnyAction => ({
  type: ENABLE_SPORT,
  value
})

export const setNewSport = (value: string): AnyAction => ({
  type: SET_SPORT,
  value
})

export const setGenderAction = (id: number, value: boolean): AnyAction => ({
  type: SET_GENDERS,
  id,
  value
})

export const setMedia = (
  id: string,
  name: string,
  value: string
): AnyAction => ({
  type: SET_MEDIA,
  id,
  name,
  value
})

export const addMedia = (value: ProductFile): AnyAction => ({
  type: ADD_MEDIA,
  value
})

export const removeMedia = (index: number): AnyAction => ({
  type: REMOVE_MEDIA,
  index
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

export const setColors = (id: number, value: boolean): AnyAction => ({
  type: SET_COLORS,
  id,
  value
})

export const removeFile = (array: string, index: number): AnyAction => ({
  type: REMOVE_MATERIAL,
  array,
  index
})

export const setSpec = (value: string): AnyAction => ({
  type: SET_SPEC,
  value
})

export const setModelSize = (size: string): AnyAction => ({
  type: SET_MODEL_SIZE,
  size
})

export const setMaterial = (value: string): AnyAction => ({
  type: SET_MATERIAL,
  value
})

export const addFile = (array: string, item: any): AnyAction => ({
  type: ADD_MATERIAL,
  array,
  item
})

export const moveFile = (
  array: string,
  index: number,
  indexTo: number
): AnyAction => ({
  type: MOVE_MATERIAL,
  array,
  index,
  indexTo
})

export const moveBanner = (index: number, indexTo: number): AnyAction => ({
  type: MOVE_BANNER,
  index,
  indexTo
})

export const setFileField = (
  selected: string,
  id: string,
  name: string,
  value: string
): AnyAction => ({
  type: SET_FILE_FIELD,
  selected,
  id,
  name,
  value
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
