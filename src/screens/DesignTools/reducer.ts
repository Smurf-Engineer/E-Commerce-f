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
  SET_GOOGLE_FONTS,
  ADD_FONT_ACTION,
  UPDATE_SEARCH_TEXT_ACTION,
  CHANGE_FONT_ACTION,
  SET_UPLOADING_ACTION
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  colors: [],
  fonts: [],
  visibleFonts: [],
  searchText: '',
  uploadingColors: false,
  loading: false,
  uploadingStitchingColors: false,
  uploadingSymbol: false,
  selectedTab: CustomizeTabs.ColorTab,
  stitchingColors: [],
  selectedFonts: {}
})

const designToolsReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_RESET_REDUCER:
      return initialState
    case SET_GOOGLE_FONTS: {
      const {
        data: { items }
      } = action
      const fonts = items.map((item: any) => item.family)
      return state.set('fonts', fromJS(fonts))
    }
    case CHANGE_FONT_ACTION:
      return state.setIn(['selectedFonts', action.font], action.active)
    case UPDATE_SEARCH_TEXT_ACTION:
      return state.set('searchText', action.text)
    case SET_UPLOADING_ACTION:
      return state.set('loading', action.isLoading)
    case ADD_FONT_ACTION: {
      return state.set(
        'visibleFonts',
        state.get('visibleFonts').push({ font: action.font })
      )
    }
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
