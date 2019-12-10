/**
 * DesignTools Reducer - Created by Jesús Apodaca on 04/12/19.
 */
import { fromJS } from 'immutable'
import {
  ON_RESET_REDUCER,
  Mode,
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
  CHANGE_FONT_ACTION
} from './constants'
import { Reducer } from '../../types/common'

export const NONE = -1

export const initialState = fromJS({
  colorBlock: NONE,
  colorBlockHovered: NONE,
  colors: [],
  styleColors: [],
  fonts: [],
  visibleFonts: [],
  searchText: '',
  uploadingColors: false,
  uploadingStitchingColors: false,
  uploadingSymbol: false,
  searchClipParam: '',
  styleMode: Mode.Style,
  selectedElement: '',
  text: '',
  selectedTab: CustomizeTabs.ColorTab,
  symbols: [],
  stitchingColors: [],
  hiddenSymbols: {},
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
    case ADD_FONT_ACTION: {
      return state.set(
        'visibleFonts',
        state.get('visibleFonts').push({ font: action.font })
      )
    }
    case ADD_SYMBOL_ACTION: {
      const symbols = state.get('symbols')
      const updatedSymbols = symbols.push(
        fromJS({ url: action.url, id: `SYM${symbols.size}` })
      )
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
