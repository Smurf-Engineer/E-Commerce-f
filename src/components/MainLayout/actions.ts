import {
  SHOW_HEADER_SEARCH_RESULTS,
  SET_SEARCH_PARAM,
  OPEN_QUICKVIEW_ACTION
} from './constants'
import { AnyAction } from '../../types/common'

export const showSearchResultsAction = (show: boolean): AnyAction => {
  return {
    type: SHOW_HEADER_SEARCH_RESULTS,
    show
  }
}

export const setSearchParam = (param: string): AnyAction => {
  return {
    type: SET_SEARCH_PARAM,
    param
  }
}

export const openQuickViewAction = (id: number | null): AnyAction => {
  return {
    type: OPEN_QUICKVIEW_ACTION,
    id
  }
}
