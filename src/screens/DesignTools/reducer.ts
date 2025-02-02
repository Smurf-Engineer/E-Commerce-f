/**
 * DesignTools Reducer - Created by Jesús Apodaca on 04/12/19.
 */
import { fromJS } from 'immutable'
import {
  ON_RESET_REDUCER,
  CustomizeTabs,
  SET_COLORS,
  ON_TAB_CLICK_ACTION,
  SET_SEARCH_CLIPARTPARAM,
  SET_UPLOADING_COLORS_ACTION,
  UPLOADING_SYMBOL_ACTION,
  ADD_SYMBOL_ACTION,
  HIDE_SYMBOL_ACTION,
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
  searchClipParam: '',
  selectedTab: CustomizeTabs.ColorTab,
  symbols: [],
  stitchingColors: [],
  hiddenSymbols: {},
  selectedFonts: {}
})

// TODO: Add the unit tests for each case
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
      const visibleFonts = state.get('visibleFonts')
      const newVisible = visibleFonts.push({ font: action.font })
      return state.set('visibleFonts', newVisible)
    }
    case ADD_SYMBOL_ACTION: {
      const symbols = state.get('symbols')
      const updatedSymbols = symbols.push({
        url: action.url,
        id: `SYM${symbols.size}`
      })
      return state.merge({ symbols: updatedSymbols, uploadingSymbol: false })
    }
    case HIDE_SYMBOL_ACTION:
      return state.setIn(['hiddenSymbols', action.id], true)
    case UPLOADING_SYMBOL_ACTION:
      return state.set('uploadingSymbol', action.isLoading)
    case ON_TAB_CLICK_ACTION:
      return state.set('selectedTab', action.selectedIndex)
    case SET_SEARCH_CLIPARTPARAM:
      return state.set('searchClipParam', action.param)
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
