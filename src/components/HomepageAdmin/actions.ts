/**
 * DiscountsAdmin  Actions - Created by eduardoquintero on 30/05/19.
 */

import {
  CLEAR_REDUCER,
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
  ADD_MORE_TILES,
  UPDATE_IMAGES_PLACEHOLDER_LIST,
  UPDATE_PRODUCT_TILES_LIST,
  ADD_CAROUSEL_ITEM,
  TOGGLE_PREVIEW_MODAL,
  SET_DURATION,
  SET_TRANSITION,
  MOVE_BANNER,
  REMOVE_MEDIA,
  SET_MEDIA,
  ADD_MEDIA,
  SET_LOADING
} from './constants'

import {
  AnyAction,
  ProductType,
  HeaderImagePlaceHolder,
  ProductTilePlaceHolder,
  ProductFile
} from '../../types/common'

export const clearReducerAction = (): AnyAction => ({
  type: CLEAR_REDUCER
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

export const removeHeaderAction = (
  index: number,
  assetType: string,
  section: string
) => ({
  type: REMOVE_HEADER,
  index,
  assetType,
  section
})

export const addCarouselItemAction = (
  imagePlaceholder: HeaderImagePlaceHolder,
  section: string
) => ({
  type: ADD_CAROUSEL_ITEM,
  imagePlaceholder,
  section
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

export const togglePreviewModalAction = (section: string = '') => ({
  type: TOGGLE_PREVIEW_MODAL,
  section
})

export const setDurationAction = (section: string, duration: string) => ({
  type: SET_DURATION,
  section,
  duration
})

export const setTransitionAction = (section: string, transition: string) => ({
  type: SET_TRANSITION,
  section,
  transition
})

export const moveFile = (
  index: number,
  indexTo: number
): AnyAction => ({
  type: MOVE_BANNER,
  index,
  indexTo
})

export const removeMedia = (index: number): AnyAction => ({
  type: REMOVE_MEDIA,
  index
})

export const setMedia = (
  id: number,
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

export const setLoadingAction = (loading: boolean): AnyAction => ({
  type: SET_LOADING,
  loading
})
