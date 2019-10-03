/**
 * ProDesign Reducer - Created by eduardoquintero on 19/09/19.
 */
import { fromJS } from 'immutable'
import {
  ON_TAB_CLICK,
  UPLOAD,
  SET_PRODUCT_CODE,
  SET_PRODUCT_TO_SEARCH
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  selectedKey: UPLOAD,
  productSearchResults: [],
  productCode: '',
  productToSearch: ''
})

const proDesignReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_TAB_CLICK:
      return state.set('selectedKey', action.selectedKey)
    case SET_PRODUCT_CODE:
      return state.set('productCode', action.productCode)
    case SET_PRODUCT_TO_SEARCH:
      return state.set('productToSearch', action.value)
    default:
      return state
  }
}

export default proDesignReducer
