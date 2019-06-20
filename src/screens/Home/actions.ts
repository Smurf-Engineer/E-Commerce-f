/**
 * Home redux actions
 */
import {
  DEFAULT_ACTION,
  SHOW_SEARCH_RESULTS_HOME,
  SET_SEARCH_PARAM,
  SET_HOMEPAGE_INFO
} from './constants'
import { AnyAction } from '../../types/common'

export const defaultAction = (someValue: string): AnyAction => ({
  type: DEFAULT_ACTION,
  someValue
})

export const setSearchParam = (param: string): AnyAction => {
  return {
    type: SET_SEARCH_PARAM,
    param
  }
}

export const showSearchResultsHome = (show: boolean): AnyAction => {
  return {
    type: SHOW_SEARCH_RESULTS_HOME,
    show
  }
}

export const setHomepageInfoAction = (data: any): AnyAction => {
  return {
    type: SET_HOMEPAGE_INFO,
    data
  }
}
