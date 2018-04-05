/**
 * ProductCatalog Reducer - Created by cazarez on 27/02/18.
 */
import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SELECTED_FILTER,
  SHOW_TYPE_FILTER,
  SET_SELECTED_FILTERS,
  ORDERBY_SELECTED,
  SET_SKIP_VALUE,
  OPEN_SIDEBAR_MOBILE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  typeOfFilter: '',
  orderBy: 'Top Seller',
  limit: 12,
  skip: 0,
  currentPage: 1,
  genderFilters: {},
  sportFilters: {},
  categoryFilters: {},
  seasonFilters: {},
  fitFilters: {},
  TemperatureFilters: {},
  openSidebar: false
})

const productCatalogReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SELECTED_FILTER: {
      return state.merge({
        typeOfFilter: action.id,
        selectedFilters: action.filter
      })
    }
    case SHOW_TYPE_FILTER:
      return state.merge({ [action.key]: action.filter })
    case SET_SELECTED_FILTERS:
      const { filter: { type, name } } = action
      return state
        .updateIn([type, name], (value: any) => !!!value)
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
    default:
      return state
  }
}

export default productCatalogReducer
