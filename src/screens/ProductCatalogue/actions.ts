/**
 * ProductCatalog  Actions - Created by cazarez on 27/02/18.
 */
import {
  DEFAULT_ACTION,
  SELECTED_FILTER,
  SORTBY_SELECTED,
  SHOW_TYPE_FILTER,
  SET_GENDER_FILTERS,
  SET_CATEGORY_FILTERS,
  SET_SPORT_FILTERS
} from './constants'
import { AnyAction, Filter } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const showTypeFilter = (filter: boolean): AnyAction => ({
  type: SHOW_TYPE_FILTER,
  filter
})

export const setFilterAction = (filter: {}): AnyAction => ({
  type: SELECTED_FILTER,
  filter
})

export const sortBySelected = (sort: string): AnyAction => ({
  type: SORTBY_SELECTED,
  sort
})

export const setGenderFilters = (genderFilters: Filter[]) => ({
  type: SET_GENDER_FILTERS,
  genderFilters
})
