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
  UPLOAD_FILE_ACTION_SUCCESS,
  GO_TO_COLOR_SECTION,
  SET_STITCHING_COLOR_ACTION,
  SET_COLOR_ACTION,
  SET_USERS,
  SET_SELECTED_USER,
  SET_INPUT_VALUE,
  OPEN_MODAL,
  SET_SAVING_DESIGN
} from './constants'
import { Reducer } from '../../types/common'
import { BLACK, WHITE } from '../DesignCenter/constants'
import { BLACK as BLACK_COLOR } from '../../theme/colors'

const colorAccessories = {
  stitching: BLACK_COLOR,
  stitchingName: 'FSC-10',
  zipperColor: BLACK,
  bibColor: WHITE,
  bindingColor: BLACK
}

export const initialState = fromJS({
  selectedKey: UPLOAD,
  productSearchResults: [],
  productCode: '',
  actualImage: '',
  uploadingFile: false,
  fileName: '',
  colorSectionIndex: 0,
  colorAccessories,
  users: [],
  selectedUser: '',
  designName: '',
  legacyNumber: '',
  saveModalOpen: false,
  savingDesign: false
})

const proDesignReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_TAB_CLICK:
      return state.set('selectedKey', action.selectedKey)
    case SET_SEARCH_PRODUCT:
      return state.merge({ productSearchResults: action.products })
    case SET_PRODUCT_CODE:
      return state.merge({
        productCode: action.productCode,
        actualImage: '',
        fileName: '',
        colorAccessories
      })
    case SET_UPLOADING_FILE_ACTION:
      return state.set('uploadingFile', action.isUploading)
    case UPLOAD_FILE_ACTION_SUCCESS:
      return state.merge({
        actualImage: action.url.fileUrl,
        fileName: action.fileName
      })
    case GO_TO_COLOR_SECTION:
      return state.set('colorSectionIndex', action.index)
    case SET_STITCHING_COLOR_ACTION: {
      const {
        stitchingColor: { value, name }
      } = action
      return state.withMutations((map: any) => {
        map.update('colorAccessories', (colorAccessoriesObj: any) => {
          return colorAccessoriesObj.merge({
            stitching: value,
            stitchingName: name
          })
        })
        return map
      })
    }
    case SET_COLOR_ACTION:
      return state.setIn(['colorAccessories', action.id], action.color)
    case SET_USERS:
      const { users } = action
      return state.merge({ users })
    case SET_SELECTED_USER:
      const { email } = action
      return state.set('selectedUser', email)
    case SET_INPUT_VALUE: {
      const { id, value } = action
      return state.set(id, value)
    }
    case OPEN_MODAL:
      return state.set('saveModalOpen', !state.get('saveModalOpen'))
    case SET_SAVING_DESIGN:
      const { saving } = action
      return state.set('savingDesign', saving)
    default:
      return state
  }
}

export default proDesignReducer
