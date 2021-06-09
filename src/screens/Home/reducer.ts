/**
 * Home reducer
 */

import { fromJS } from 'immutable'
import {
  DEFAULT_ACTION,
  SHOW_SEARCH_RESULTS_HOME,
  SET_SEARCH_PARAM,
  OPEN_QUICKVIEW_ACTION,
  SET_HOMEPAGE_INFO
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  showSearchResults: false,
  searchString: '',
  productId: 0,
  productTiles: [],
  featuredBanners: [],
  featuredProducts: [],
  homepageImages: [],
  featuredImages: [],
  secondaryFeaturedImages: [],
  title: '',
  loading: true,
  mainHeaderImages: [],
  carouselSettings: {
    slideTransition: 'slide',
    slideDuration: '1000',
    secondarySlideTransition: 'slide',
    secondarySlideDuration: '1000'
  }
})

const homeReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_SEARCH_PARAM:
      return state.merge({
        searchString: action.param,
        showSearchResults: true
      })
    case SHOW_SEARCH_RESULTS_HOME:
      return state.set('showSearchResults', action.show)
    case OPEN_QUICKVIEW_ACTION:
      return state.set('productId', action.id)
    case SET_HOMEPAGE_INFO: {
      const {
        mainHeaderImages,
        productTiles,
        featuredBanners,
        featuredProducts,
        homepageImages,
        featuredImages,
        secondaryFeaturedImages,
        carouselSettings,
        title
      } = action.data
      return state.merge({
        mainHeaderImages,
        productTiles,
        featuredProducts,
        featuredBanners,
        homepageImages,
        featuredImages,
        secondaryFeaturedImages,
        carouselSettings,
        title,
        loading: false
      })
    }
    default:
      return state
  }
}

export default homeReducer
