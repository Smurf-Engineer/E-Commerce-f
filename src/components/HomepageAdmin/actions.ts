/**
 * DiscountsAdmin  Actions - Created by eduardoquintero on 30/05/19.
 */

import {
  CLEAR_REDUCER,
  SET_URL_IMAGE,
  SET_LOADING,
  SET_HOMEPAGE_INFO,
  SET_URL,
  SET_LOADERS,
  SET_URL_IMAGE_LIST,
  SET_LOADING_LIST,
  SET_URL_LIST,
  SET_PRODUCTS_DATA,
  SET_ITEM_SELECTED,
  DELETE_ITEM_SELECTED,
  OPEN_MODAL,
  ADD_ITEMS,
  DELETE_FROM_TABLE
} from './constants'

import { AnyAction, ProductType } from '../../types/common'

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
})

export const setUrlImage = (
  url: string,
  section: string,
  imageType: string
) => ({
  type: SET_URL_IMAGE,
  url,
  section,
  imageType
})

export const setUrlImageList = (
  url: string,
  section: string,
  imageType: string,
  index: number
) => ({
  type: SET_URL_IMAGE_LIST,
  url,
  section,
  imageType,
  index
})

export const setLoadingAction = (imageType: string, loading: boolean) => ({
  type: SET_LOADING,
  imageType,
  loading
})

export const setLoadingListAction = (
  imageType: string,
  loading: boolean,
  index: number
) => ({
  type: SET_LOADING_LIST,
  imageType,
  loading,
  index
})
export const setHomepageInfoAction = (data: any): AnyAction => {
  return {
    type: SET_HOMEPAGE_INFO,
    data
  }
}

export const setUrlAction = (value: string): AnyAction => {
  return {
    type: SET_URL,
    value
  }
}

export const setUrlListAction = (value: string, index: number): AnyAction => {
  return {
    type: SET_URL_LIST,
    value,
    index
  }
}

export const setLoadersAction = (
  section: string,
  loading: boolean
): AnyAction => {
  return {
    type: SET_LOADERS,
    section,
    loading
  }
}

export const setProductsData = (
  data: ProductType,
  offset: number,
  page: number
) => ({
  type: SET_PRODUCTS_DATA,
  data,
  offset,
  page
})

export const setItemSelectedAction = (item: any, checked: boolean) => ({
  type: SET_ITEM_SELECTED,
  item,
  checked
})

export const deleteItemSelectedAction = (id: number): AnyAction => ({
  type: DELETE_ITEM_SELECTED,
  id
})

export const deleteFromTableAction = (index: number): AnyAction => ({
  type: DELETE_FROM_TABLE,
  index
})

export const openModalAction = (open: boolean): AnyAction => ({
  type: OPEN_MODAL,
  open
})

export const setItemsAddAction = (): AnyAction => ({
  type: ADD_ITEMS
})
