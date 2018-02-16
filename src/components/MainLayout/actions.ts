import { SHOW_HEADER_SEARCH_RESULTS, SET_SEARCH_PARAM } from './constants'
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
