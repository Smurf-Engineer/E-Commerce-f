/**
 * ProductForm Reducer - Created by Apodaca on 16/05/19.
 */

import { fromJS } from 'immutable'
import {
  SET_PRODUCT_DATA,
  CHANGE_VALUE,
  RESET_DATA,
  SET_LOADING,
  SET_BANNERS,
  SET_GENDERS,
  SET_CURRENCIES
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  product: {},
  loading: false,
  loadingMessage: 'Uploading...',
  bannerMaterials: [],
  fixed: false
})

const productFormReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATA:
      return initialState
    case SET_PRODUCT_DATA:
      return state.set('product', fromJS(action.product))
    case SET_CURRENCIES:
      return state.setIn(['product', 'priceRange'], action.currencies)
    case SET_LOADING:
      return state.merge({
        loading: action.loading,
        loadingMessage: action.loadingMessage
      })
    case SET_BANNERS:
      return state.merge({ bannerMaterials: action.banners, fixed: true })
    case SET_GENDERS: {
      const pictures = action.genders.map((gender: any) => ({
        front_image: '',
        back_image: '',
        left_image: '',
        right_image: '',
        gender_id: gender.id
      }))
      return state
        .setIn(['product', 'genders'], action.genders)
        .setIn(['product', 'pictures'], pictures)
    }
    case CHANGE_VALUE:
      return state.setIn(['product', action.field], fromJS(action.value))
    default:
      return state
  }
}

export default productFormReducer
