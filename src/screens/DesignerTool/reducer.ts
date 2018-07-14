/**
 * DesignerTool Reducer - Created by david on 08/05/18.
 */
import { fromJS, List } from 'immutable'
import {
  Tabs,
  DEFAULT_ACTION,
  SET_LOADING_MODEL,
  SET_COLOR_ACTION,
  SET_COLOR_BLOCK_ACTION,
  COLOR_BLOCK_HOVERED_ACTION,
  SET_UPLOADING_ACTION,
  SET_UPLOADING_SUCCESS,
  SET_UPLOADING_DESIGN_SUCCESS,
  SET_CURRENT_TAB_ACTION,
  SET_SWIPING_TAB_ACTION,
  SET_SELECTED_THEME_ACTION,
  SET_SELECTED_STYLE_ACTION,
  SET_DESIGN_CONFIG_ACTION
} from './constants'
import { Reducer } from '../../types/common'

const NONE = -1

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  colorBlock: NONE,
  colorBlockHovered: NONE,
  colors: [],
  styleColors: [],
  loadingModel: false,
  uploadingFiles: false,
  modelConfig: null,
  areas: [],
  swipingView: false,
  currentTab: Tabs.RenderTab,
  selectedTheme: NONE,
  selectedStyle: NONE,
  designConfig: {}
})

const designerToolReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state.set('someKey', action.someValue)
    case SET_LOADING_MODEL:
      return state.set('loadingModel', action.isLoading)
    case SET_COLOR_BLOCK_ACTION:
      return state.set('colorBlock', action.index)
    case COLOR_BLOCK_HOVERED_ACTION:
      return state.set('colorBlockHovered', action.index)
    case SET_COLOR_ACTION: {
      const { color } = action
      const colors = state.get('colors')
      const colorBlock = state.get('colorBlock')
      const updatedColors = colors.updateIn([colorBlock], () => color)
      return state.set('colors', List.of(...updatedColors))
    }
    case SET_UPLOADING_ACTION:
      return state.set('uploadingFiles', action.isLoading)
    case SET_UPLOADING_SUCCESS:
      return state.merge({
        uploadingFiles: false,
        modelConfig: action.modelConfig,
        colors: List.of(...action.modelConfig.design.colors)
      })
    case SET_UPLOADING_DESIGN_SUCCESS:
      return state.merge({
        uploadingFiles: false,
        areas: List.of(...action.design.areas),
        colors: List.of(...action.design.design.colors)
      })
    case SET_CURRENT_TAB_ACTION:
      return state.set('currentTab', action.index)
    case SET_SWIPING_TAB_ACTION:
      return state.set('swipingView', action.isSwiping)
    case SET_SELECTED_THEME_ACTION:
      return state.set('selectedTheme', action.id)
    case SET_SELECTED_STYLE_ACTION:
      return state.set('selectedStyle', action.id)
    case SET_DESIGN_CONFIG_ACTION:
      return state.set('designConfig', action.config)
    default:
      return state
  }
}

export default designerToolReducer
