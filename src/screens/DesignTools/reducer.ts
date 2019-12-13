/**
 * DesignTools Reducer - Created by Jesús Apodaca on 04/12/19.
 */
import { fromJS } from 'immutable'
import {
  ON_RESET_REDUCER,
  CustomizeTabs,
  SET_COLORS,
  ON_TAB_CLICK_ACTION,
  SET_UPLOADING_COLORS_ACTION,
  SET_UPLOADING_ACTION
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  colors: [],
  uploadingColors: false,
  loading: false,
  uploadingStitchingColors: false,
  selectedTab: CustomizeTabs.ColorTab,
  stitchingColors: []
})

const designToolsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_RESET_REDUCER:
      return initialState
    case SET_UPLOADING_ACTION:
      return state.set('loading', action.isLoading)
    case ON_TAB_CLICK_ACTION:
      return state.set('selectedTab', action.selectedIndex)
    case SET_COLORS: {
      const keyName =
        action.listType === 'colors'
          ? 'uploadingColors'
          : 'uploadingStitchingColors'
      return state.merge({
        [keyName]: false,
        [action.listType]: action.colors
      })
    }
    case SET_UPLOADING_COLORS_ACTION: {
      const keyName =
        action.listType === 'colors'
          ? 'uploadingColors'
          : 'uploadingStitchingColors'
      return state.set(keyName, action.isUploading)
    }
    default:
      return state
  }
}

export default designToolsReducer
