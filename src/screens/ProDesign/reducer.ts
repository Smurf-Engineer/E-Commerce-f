/**
 * ProDesign Reducer - Created by eduardoquintero on 19/09/19.
 */
import { fromJS } from 'immutable'
import {
  ON_TAB_CLICK,
  UPLOAD,
  SET_SEARCH_PRODUCT,
  SET_PRODUCT_CODE
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  selectedKey: UPLOAD,
  productSearchResults: [],
  productCode: ''
})

const proDesignReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_TAB_CLICK:
      return state.set('selectedKey', action.selectedKey)
    case SET_SEARCH_PRODUCT:
      return state.merge({ productSearchResults: action.products })
    case SET_PRODUCT_CODE:
      return state.set('productCode', action.productCode)
    default:
      return state
  }
}

export default proDesignReducer
