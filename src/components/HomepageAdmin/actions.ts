/**
 * DiscountsAdmin  Actions - Created by eduardoquintero on 30/05/19.
 */

import {
  CLEAR_REDUCER,
  SET_URL_IMAGE,
  SET_LOADING,
  SET_HOMEPAGE_INFO,
  SET_LOADERS,
  SET_URL_IMAGE_LIST,
  SET_LOADING_LIST,
  SET_URL_LIST,
  SET_PRODUCTS_DATA,
  SET_ITEM_SELECTED,
  DELETE_ITEM_SELECTED,
  OPEN_MODAL,
  ADD_ITEMS,
  DELETE_FROM_TABLE,
  SET_PRODUCT_TILE_IMAGE,
  SET_PRODUCT_TILE_LOADING,
  SET_TILES_TEXT,
  REMOVE_TILE_DATA,
  REMOVE_HEADER,
  ADD_MORE_IMAGES,
  ADD_MORE_TILES,
  UPDATE_IMAGES_PLACEHOLDER_LIST,
  UPDATE_PRODUCT_TILES_LIST,
  ADD_CAROUSEL_ITEM,
  REMOVE_MAIN_HEADER,
  TOGGLE_PREVIEW_MODAL,
  SET_DURATION
} from './constants'

import {
  AnyAction,
  ProductType,
  HeaderImagePlaceHolder,
  ProductTilePlaceHolder
} from '../../types/common'

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
  index: number,
  section: string
) => ({
  type: SET_LOADING_LIST,
  imageType,
  loading,
  index,
  section
})
export const setHomepageInfoAction = (data: any): AnyAction => {
  return {
    type: SET_HOMEPAGE_INFO,
    data
  }
}

export const setUrlListAction = (
  value: string,
  index: number,
  section: string
): AnyAction => {
  return {
    type: SET_URL_LIST,
    value,
    index,
    section
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

export const setProductTileImage = (url: string, index: number): AnyAction => ({
  type: SET_PRODUCT_TILE_IMAGE,
  url,
  index
})

export const setProductTileLoading = (
  loading: boolean,
  index: number
): AnyAction => ({
  type: SET_PRODUCT_TILE_LOADING,
  loading,
  index
})

export const setTilesTextAction = (
  index: number,
  section: string,
  value: string
) => ({
  type: SET_TILES_TEXT,
  index,
  section,
  value
})

export const removeTileDataAction = (index: number) => ({
  type: REMOVE_TILE_DATA,
  index
})

export const removeMainHeaderAction = (index: number, assetType: string) => ({
  type: REMOVE_MAIN_HEADER,
  index,
  assetType
})
export const removeHeaderAction = (index: number) => ({
  type: REMOVE_HEADER,
  index
})

export const addMoreImagesAction = (
  imagePlaceholder: HeaderImagePlaceHolder
) => ({
  type: ADD_MORE_IMAGES,
  imagePlaceholder
})

export const addCarouselItemAction = (
  imagePlaceholder: HeaderImagePlaceHolder
) => ({
  type: ADD_CAROUSEL_ITEM,
  imagePlaceholder
})

export const addMoreTilesAction = (
  tilePlaceholder: ProductTilePlaceHolder
) => ({
  type: ADD_MORE_TILES,
  tilePlaceholder
})

export const updatePlaceHolderListAction = (
  list: [HeaderImagePlaceHolder],
  section: string
) => ({
  type: UPDATE_IMAGES_PLACEHOLDER_LIST,
  list,
  section
})

export const updateProductTilesListAction = (
  tilesList: [ProductTilePlaceHolder]
) => ({
  type: UPDATE_PRODUCT_TILES_LIST,
  tilesList
})

export const togglePreviewModalAction = () => ({
  type: TOGGLE_PREVIEW_MODAL
})

export const setDurationAction = (duration: string) => ({
  type: SET_DURATION,
  duration
})
