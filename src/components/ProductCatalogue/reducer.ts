/**
 * ProductCatalog Reducer - Created by cazarez on 27/02/18.
 */
import { fromJS } from 'immutable'
import {
  SELECTED_FILTER,
  SHOW_TYPE_FILTER,
  SET_SELECTED_FILTERS,
  ORDERBY_SELECTED,
  SET_SKIP_VALUE,
  OPEN_SIDEBAR_MOBILE,
  RESET_REDUCER_DATA,
  CLEAR_FILTERS,
  SET_SELECTED_HOME_FILTERS,
  INLINE_FILTER,
  CATEGORY_FILTER,
  SET_ALL_GENDERS,
  cyclingGroup,
  SELECT_PRODUCT,
  DESELECT_PRODUCT,
  SET_SEARCH_TEXT
} from './constants'
import { Reducer } from '../../types/common'

const { CYCLING, MOUNTAINBIKE, ROADBIKE } = cyclingGroup
export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  typeOfFilter: '',
  orderBy: 'Top Seller',
  limit: 12,
  skip: 0,
  currentPage: 1,
  collectionFilters: {},
  genderFilters: {},
  sportFilters: {},
  categoryFilters: {},
  seasonFilters: {},
  fit_styleFilters: {},
  typeFilters: {},
  TemperatureFilters: {},
  openSidebar: false,
  searchText: ''
})

const intakeProductCatalogReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_FILTER: {
      return state.merge({
        typeOfFilter: action.id,
        selectedFilters: action.filter
      })
    }
    case SHOW_TYPE_FILTER:
      return state.merge({ [action.key]: action.filter })
    case SET_SELECTED_FILTERS:
      const {
        filter: { type, name, firstGenderSet, value }
      } = action
      if (name === CYCLING) {
        return state.merge({
          sportFilters: {
            [MOUNTAINBIKE]: true,
            [ROADBIKE]: true
          }
        })
      }
      return state
        .setIn([type, name], firstGenderSet ? true : value)
        .merge({ skip: 0, currentPage: 1 })
    case ORDERBY_SELECTED:
      return state.set('orderBy', action.orderBy)
    case SET_SKIP_VALUE:
      return state.merge({
        skip: action.skip,
        currentPage: action.page
      })
    case OPEN_SIDEBAR_MOBILE:
      return state.set('openSidebar', action.open)
    case RESET_REDUCER_DATA:
      return initialState
    case CLEAR_FILTERS:
      return state.merge({
        genderFilters: {},
        sportFilters: {},
        categoryFilters: {}
      })
    case SET_SELECTED_HOME_FILTERS:
      return state.merge({
        sportFilters: { [ROADBIKE]: true },
        categoryFilters: { [CATEGORY_FILTER]: true },
        collectionFilters: { [INLINE_FILTER]: false }
      })
    case SET_ALL_GENDERS:
      return state.merge({
        genderFilters: { Men: true, Women: true, Unisex: true }
      })
    case SELECT_PRODUCT: {
      const selectedItems = state.get('selectedItems')
      const addItem = selectedItems.push(action.productId)
      return state.merge({ selectedItems: addItem })
    }
    case DESELECT_PRODUCT: {
      const { productId } = action
      const indexOfListingToDelete = state
        .get('selectedItems')
        .findIndex((productType: number) => {
          return productType === productId
        })
      const selectedItems = state.get('selectedItems')
      const updatedSelectedItems = selectedItems.delete(indexOfListingToDelete)
      return state.set('selectedItems', updatedSelectedItems)
    }
    case SET_SEARCH_TEXT:
      return state.merge({ searchText: action.searchText, currentPage: 1 })
    default:
      return state
  }
}

export default intakeProductCatalogReducer
