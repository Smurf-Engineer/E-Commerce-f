import {
  SHOW_HEADER_SEARCH_RESULTS,
  SET_SEARCH_PARAM,
  OPEN_QUICKVIEW_ACTION
} from './constants'
import { AnyAction } from '../../types/common'

export const showSearchResultsAction = (show: boolean): AnyAction => ({
  type: SHOW_HEADER_SEARCH_RESULTS,
  show
})

export const setSearchParam = (param: string): AnyAction => ({
  type: SET_SEARCH_PARAM,
  param
})

export const openQuickViewAction = (id: number | null): AnyAction => ({
  type: OPEN_QUICKVIEW_ACTION,
  id
})
