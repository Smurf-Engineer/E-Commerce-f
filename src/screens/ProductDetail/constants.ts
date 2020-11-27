/**
 * ProductDetail Types - Created by cazarez on 12/03/18.
 */
const namespace = 'src/ProductDetail'

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const OPEN_FITINFO = `${namespace}/OPEN_FITINFO`
export const SHOW_BUYNOW_OPTIONS = `${namespace}/SHOW_BUYNOW_OPTIONS`
export const SET_SELECTED_GENDER = `${namespace}/SET_SELECTED_GENDER`
export const SET_SELECTED_SIZE = `${namespace}/SET_SELECTED_SIZE`
export const SET_SELECTED_FIT = `${namespace}/SET_SELECTED_FIT`
export const SET_SELECTED_COLOR = `${namespace}/SET_SELECTED_COLOR`
export const DESIGN_MODAL_OPEN = `${namespace}/DESIGN_MODAL_OPEN`

export const LOADING_3D_MODEL = `${namespace}/LOADING_3D_MODEL`
export const LOADING_IMAGE = `${namespace}/LOADING_IMAGE`
export const ADD_ITEM_TO_CART = `${namespace}/ADD_ITEM_TO_CART`
export const RESET_DATA = `${namespace}/RESET_DATA`

export const oneSize = 'One Size'

export enum ProductGenders {
  Women = 'Women',
  Men = 'Men',
  Unisex = 'Unisex'
}
