/**
 * HomepageAdminActions Reducer - Created by eduardoquintero on 30/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_URL_IMAGE,
  SET_LOADING,
  SET_HOMEPAGE_INFO,
  SET_URL,
  SET_LOADERS,
  ImageTypes,
  Sections
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  mainHeader: {
    [ImageTypes.DESKTOP]: '',
    [ImageTypes.MOBILE]: '',
    url: '',
    loading: false
  },
  loading: {
    [ImageTypes.DESKTOP]: false,
    [ImageTypes.MOBILE]: false
  },
  loaders: {
    [Sections.MAIN_CONTAINER]: true,
    [Sections.MAIN_HEADER]: false,
    [Sections.SECONDARY_HEADER]: false
  }
})

const homepageAdminReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_URL_IMAGE:
      return state.setIn([action.section, action.imageType], action.url)
    case SET_URL_IMAGE:
      return state.merge({
        [action.section[action.imageType]]: action.url
      })
    case SET_LOADING:
      return state.setIn(['loading', action.imageType], action.loading)
    case SET_HOMEPAGE_INFO:
      return state
        .setIn(['mainHeader', ImageTypes.DESKTOP], action.data.headerImage)
        .setIn(['mainHeader', ImageTypes.MOBILE], action.data.headerImageMobile)
        .setIn(['mainHeader', 'url'], action.data.headerImageLink)
    case SET_URL:
      return state.setIn(['mainHeader', 'url'], action.value)
    case SET_LOADERS:
      return state.setIn(['loaders', action.section], action.loading)
    default:
      return state
  }
}

export default homepageAdminReducer
