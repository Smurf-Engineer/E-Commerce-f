/**
 * HomepageAdminActions Reducer - Created by eduardoquintero on 30/05/19.
 */

import { fromJS, List } from 'immutable'
import fill from 'lodash/fill'
import {
  SET_URL_IMAGE,
  SET_LOADING,
  SET_HOMEPAGE_INFO,
  SET_URL,
  SET_LOADERS,
  SET_URL_IMAGE_LIST,
  SET_LOADING_LIST,
  SET_URL_LIST,
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
  secondaryHeader: [],
  mainHeaderLoading: {
    [ImageTypes.DESKTOP]: false,
    [ImageTypes.MOBILE]: false
  },
  secondaryHeaderLoading: [],
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
      return state.setIn(
        ['mainHeaderLoading', action.imageType],
        action.loading
      )
    case SET_HOMEPAGE_INFO: {
      return state
        .set('secondaryHeader', List.of(...fromJS(action.data.homepageImages)))
        .set(
          'secondaryHeaderLoading',
          List.of(
            ...fill(
              Array(action.data.homepageImages.length),
              fromJS({
                [ImageTypes.DESKTOP]: false,
                [ImageTypes.MOBILE]: false
              })
            )
          )
        )
        .setIn(['mainHeader', ImageTypes.DESKTOP], action.data.headerImage)
        .setIn(['mainHeader', ImageTypes.MOBILE], action.data.headerImageMobile)
        .setIn(['mainHeader', 'url'], action.data.headerImageLink)
    }
    case SET_URL:
      return state.setIn(['mainHeader', 'url'], action.value)
    case SET_LOADERS:
      return state.setIn(['loaders', action.section], action.loading)
    case SET_URL_IMAGE_LIST: {
      const currentImage = state.getIn(['secondaryHeader', action.index]).toJS()
      currentImage[action.imageType] = action.url
      return state.setIn(
        ['secondaryHeader', action.index],
        fromJS(currentImage)
      )
    }
    case SET_LOADING_LIST: {
      const currentLoader = state
        .getIn(['secondaryHeaderLoading', action.index])
        .toJS()
      currentLoader[action.imageType] = action.loading
      return state.setIn(
        ['secondaryHeaderLoading', action.index],
        fromJS(currentLoader)
      )
    }
    case SET_URL_LIST: {
      const currentUrl = state.getIn(['secondaryHeader', action.index]).toJS()
      currentUrl.url = action.value
      return state.setIn(['secondaryHeader', action.index], fromJS(currentUrl))
    }
    default:
      return state
  }
}

export default homepageAdminReducer
