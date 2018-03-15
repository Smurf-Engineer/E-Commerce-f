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
  SET_SKIP_VALUE
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
  fitFilters: {},
  TemperatureFilters: {}
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
      return state.updateIn([type, name], (value: any) => !!!value)
    case ORDERBY_SELECTED:
      return state.set('orderBy', action.orderBy)
    case SET_SKIP_VALUE:
      return state.merge({
        skip: action.skip,
        currentPage: action.page
      })
    default:
      return state
  }
}

export default productCatalogReducer
