/**
 * OrderHistoryAdmin Reducer - Created by eduardoquintero on 07/05/19.
 */

import { fromJS } from 'immutable'
import { SET_PRODUCT_DATA } from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  product: {}
})

const productFormReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DATA:
      return state.set('product', action.product)
    default:
      return state
  }
}

export default productFormReducer
