/**
 * TeamStoresAdmin Types - Created by eduardoquintero on 15/07/19.
 */

const namespace = 'src/TeamStoresAdmin'

export const TEAM_STORES_LIMIT = 12

export const SET_ORDER_BY = `${namespace}/SET_ORDER_BY`
export const SET_CURRENT_PAGE = `${namespace}/SET_CURRENT_PAGE`
export const RESET_DATA = `${namespace}/RESET_DATA`
export const SET_SEARCH_TEXT = `${namespace}/SET_SEARCH_TEXT`
export const SET_LOADING = `${namespace}/SET_LOADING`
export const SET_PRICE_ITEM = `${namespace}/SET_PRICE_ITEM`
export const SET_TEAM_STORE_DATA = `${namespace}/SET_TEAM_STORE_DATA`
export const SET_LOADING_ITEM = `${namespace}/SET_LOADING_ITEM`
export const SET_OPEN_LOCKER_ACTION = `${namespace}/SET_OPEN_LOCKER_ACTION`
export const SET_ITEM_SELECTED_ACTION = `${namespace}/SET_ITEM_SELECTED_ACTION`
export const ON_UNSELECT_ITEM = `${namespace}/ON_UNSELECT_ITEM`
export const SET_ITEMS_ADD_ACTION = `${namespace}/SET_ITEMS_ADD_ACTION`
export const SET_PAGINATION_DATA = `${namespace}/SET_PAGINATION_DATA`
export const DELETE_ITEM_SELECTED_ACTION = `${namespace}/DELETE_ITEM_SELECTED_ACTION`
export const SET_ITEM_VISIBLE_ACTION = `${namespace}/SET_ITEM_VISIBLE_ACTION`
export const SET_NAME = `${namespace}/SET_NAME`
export const SET_FEATURED = `${namespace}/SET_FEATURED`
export const SET_OPEN_MODAL = `${namespace}/SET_OPEN_MODAL`
export const SET_IMAGE = `${namespace}/SET_IMAGE`
export const SET_USER_TO_SEARCH = `${namespace}/SET_USER_TO_SEARCH`
export const SET_SELECTED_USER = `${namespace}/SET_SELECTED_USER`
export const SET_SAVING_ACTION = `${namespace}/SET_SAVING_ACTION`
export const SET_TEAM_DATA = `${namespace}/SET_TEAM_DATA`
export const MOVE_ROW = `${namespace}/MOVE_ROW`
export const UPDATE_START_DATE_ACTION = `${namespace}/UPDATE_START_DATE_ACTION`
export const UPDATE_END_DATE_ACTION = `${namespace}/UPDATE_END_DATE_ACTION`
export const UPDATE_TEAMSTORE_TYPE = `${namespace}/UPDATE_TEAMSTORE_TYPE`
export const SET_FILTERS = `${namespace}/SET_FILTERS`

export const CHF_CURRENCY = 'CHF'

export const ACCOUNT_MANAGER_COLUMN = 'managers'
export const CUTOFF_COLUMN = 'cutoff_date'
export const OWNER_COLUMN = 'users'

export const FILTER_OPTIONS = [
  { name: 'select', column: null },
  { name: 'accountManager', column: ACCOUNT_MANAGER_COLUMN },
  { name: 'cutoffDate', column: CUTOFF_COLUMN },
  { name: 'ownerName', column: OWNER_COLUMN }
]
export const DATE_FORMAT = 'YYYY-MM-DD'
