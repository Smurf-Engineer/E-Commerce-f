/**
 * HomepageAdminActions Types - Created by eduardoquintero on 30/05/19.
 */

const namespace = 'src/OrderHistoryAdmin'

export enum Sections {
  MAIN_CONTAINER = 'mainContainer',
  MAIN_HEADER = 'mainHeader',
  SECONDARY_HEADER = 'secondaryHeader',
  PRODUCT_TILES = 'productTiles'
}

export const HOMEPAGE_LABEL = 'Homepage'
export enum ImageTypes {
  DESKTOP = 'desktopImage',
  MOBILE = 'mobileImage'
}
export const EMPTY_TILE = {
  image: '',
  contentTile: '',
  loading: false,
  title: '',
  sport_id: ''
}

export const EMPTY_SECONDARY_HEADER = {
  desktopImage: '',
  mobileImage: '',
  url: '',
  sport_id: ''
}

export const CLEAR_REDUCER = `${namespace}/CLEAR_REDUCER`
export const SET_URL_IMAGE = `${namespace}/SET_URL_IMAGE`
export const SET_LOADING = `${namespace}/SET_LOADING`
export const SET_HOMEPAGE_INFO = `${namespace}/SET_HOMEPAGE_INFO`
export const SET_URL = `${namespace}/SET_URL`
export const SET_LOADERS = `${namespace}/SET_LOADERS`
export const SET_URL_IMAGE_LIST = `${namespace}/SET_URL_IMAGE_LIST`
export const SET_LOADING_LIST = `${namespace}/SET_LOADING_LIST`
export const SET_URL_LIST = `${namespace}/SET_URL_LIST`
export const SET_PRODUCTS_DATA = `${namespace}/SET_PRODUCTS_DATA`
export const SET_ITEM_SELECTED = `${namespace}/SET_ITEM_SELECTED`
export const DELETE_ITEM_SELECTED = `${namespace}/DELETE_ITEM_SELECTED`
export const OPEN_MODAL = `${namespace}/OPEN_MODAL`
export const ADD_ITEMS = `${namespace}/ADD_ITEMS`
export const DELETE_FROM_TABLE = `${namespace}/DELETE_FROM_TABLE`
export const SET_PRODUCT_TILE_IMAGE = `${namespace}/SET_PRODUCT_TILE_IMAGE`
export const SET_PRODUCT_TILE_LOADING = `${namespace}/SET_PRODUCT_TILE_LOADING`
export const SET_TILES_TEXT = `${namespace}/SET_TILES_TEXT`
export const REMOVE_TILE_DATA = `${namespace}/REMOVE_TILE_DATA`
export const REMOVE_HEADER = `${namespace}/REMOVE_HEADER`
export const ADD_MORE_IMAGES = `${namespace}/ADD_MORE_IMAGES`
export const UPDATE_IMAGES_PLACEHOLDER_LIST = `${namespace}/UPDATE_IMAGES_PLACEHOLDER_LIST`
export const ADD_MORE_TILES = `${namespace}/ADD_MORE_TILES`
export const UPDATE_PRODUCT_TILES_LIST = `${namespace}/UPDATE_PRODUCT_TILES_LIST`
