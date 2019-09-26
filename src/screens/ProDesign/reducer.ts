/**
 * ProDesign Reducer - Created by eduardoquintero on 19/09/19.
 */
import { fromJS } from 'immutable'
import {
  ON_TAB_CLICK,
  UPLOAD,
  SET_SEARCH_PRODUCT,
  SET_PRODUCT_CODE,
  SET_UPLOADING_FILE_ACTION,
  UPLOAD_FILE_ACTION_SUCCESS
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
      return state.set('productSearchResults', action.products)
    case SET_PRODUCT_CODE:
      return state.set('productCode', action.productCode)
    case SET_UPLOADING_FILE_ACTION:
      return state.set('uploadingFile', action.isUploading)
    case UPLOAD_FILE_ACTION_SUCCESS:
      return state.merge({
        actualSvg: action.url.fileUrl,
        changes: true
      })
    default:
      return state
  }
}

export default proDesignReducer
