/**
 * ProductCatalog  Actions - Created by cazarez on 27/02/18.
 */
import { DEFAULT_ACTION, SELECTED_FILTER, SORTBY_SELECTED } from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const selectedFilterAction = (filter: {}): AnyAction => ({
  type: SELECTED_FILTER,
  filter
})

export const sortBySelected = (sort: string): AnyAction => ({
  type: SORTBY_SELECTED,
  sort
})
