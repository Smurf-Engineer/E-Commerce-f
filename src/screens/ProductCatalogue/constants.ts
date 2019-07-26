/**
 * ProductCatalog Types - Created by cazarez on 27/02/18.
 */
const namespace = 'src/ProductCatalog'

export const SELECTED_FILTER = `${namespace}/SELECTED_FILTER`
export const ORDERBY_SELECTED = `${namespace}/SORTBY_SELECTED`
export const SET_SKIP_VALUE = `${namespace}/SET_SKIP_LIMIT`

export const SHOW_TYPE_FILTER = `${namespace}/SHOW_TYPE_FILTER`
export const SET_SELECTED_FILTERS = `${namespace}/SET_SELECTED_FILTERS`
export const SET_SELECTED_HOME_FILTERS = `${namespace}/SET_SELECTED_HOME_FILTERS`

export const OPEN_SIDEBAR_MOBILE = `${namespace}/OPEN_SIDEBAR_MOBILE`

export const RESET_REDUCER_DATA = `${namespace}/RESET_REDUCER_DATA`
export const CLEAR_FILTERS = `${namespace}/CLEAR_FILTERS`

export const INLINE_FILTER = 'Inline'
export const CATEGORY_FILTER = 'Jerseys & Tops'
export enum cyclingGroup {
  CYCLING = 'Cycling',
  ROADBIKE = 'Road Bike',
  MOUNTAINBIKE = 'Mountain Bike'
}

export enum filtersNames {
  COLLECTION = 'collection',
  GENDER = 'gender',
  SPORT = 'sport',
  CATEGORY = 'category',
  SEASON = 'season',
  FITSTYLE = 'fit_style'
}
