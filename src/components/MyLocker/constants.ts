/**
 * MyLocker Types - Created by miguelcanobbio on 21/06/18.
 */
const namespace = 'src/ProductCatalog'

export const DEFAULT_ACTION = `${namespace}/DEFAULT_ACTION`
export const SET_LOADING = `${namespace}/SET_LOADING`
export const SET_ERROR = `${namespace}/SET_ERROR`
export const SET_PAGINATION_DATA = `${namespace}/SET_PAGINATION_DATA`
export const SET_DELETE_MODAL_DATA = `${namespace}/SET_DELETE_MODAL_DATA`
export const SET_MODAL_LOADING = `${namespace}/SET_MODAL_LOADING`
export const RESET_MODAL_DATA = `${namespace}/RESET_MODAL_DATA`
export const SET_RENAME_MODAL_DATA = `${namespace}/SET_RENAME_MODAL_DATA`
export const RESET_RENAME_MODAL_DATA = `${namespace}/RESET_RENAME_MODAL_DATA`
export const ON_CHANGE_DESIGN_NAME = `${namespace}/ON_CHANGE_DESIGN_NAME`
export const SET_RENAME_MODAL_LOADING = `${namespace}/SET_RENAME_MODAL_LOADING`
export const SET_SEARCH_TEXT = `${namespace}/SET_SEARCH_TEXT`
export const SET_FILTERS = `${namespace}/SET_FILTERS`
export const RESET_FILTERS = `${namespace}/RESET_FILTERS`

export const FILTER_TYPE_FIELD = 'pro_design'
export const FILTER_CREATEDAT_FIELD = 'created_at'
export const FILTER_UPDATEDAT_FIELD = 'updated_at'

export const FILTER_OPTIONS = [
    { name: 'select', field: null },
    { name: 'type', field: FILTER_TYPE_FIELD },
    { name: 'dateCreated', field: FILTER_CREATEDAT_FIELD },
    { name: 'dateModified', field: FILTER_UPDATEDAT_FIELD },
]

export const FILTER_TYPE_OPTIONS = [
    { name: 'proDesign', value: true },
    { name: 'selfDesign', value: false }
]

export const DATE_FORMAT = 'YYYY-MM-DD'