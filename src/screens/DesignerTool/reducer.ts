/**
 * DesignerTool Reducer - Created by david on 08/05/18.
 */
import { fromJS, List } from 'immutable'
import reverse from 'lodash/reverse'
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
  SET_DESIGN_CONFIG_ACTION,
  SET_INSPIRATION_COLOR_ACTION,
  SET_PRODCUT_CODE_ACTION,
  SET_THEME_NAME_ACTION,
  SET_STYLE_NAME_ACTION,
  SET_COMPLEXITY_ACTION,
  SET_THUMBNAIL_ACTION,
  SET_UPLOADING_THUMBNAIL_ACTION,
  ADD_EXTRA_FILE_ACTION,
  REMOVE_EXTRA_FILE_ACTION,
  TOGGLE_EXTRA_COLOR_ACTION,
  SAVE_DESIGN_SUCCESS_ACTION
} from './constants'
import { Reducer } from '../../types/common'

const NONE = -1
const NONE_ID = 0
const DESIGN_THUMBNAIL = -1

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
  themeName: '',
  styleName: '',
  selectedTheme: NONE_ID,
  selectedStyle: NONE_ID,
  designConfig: [],
  productCode: '',
  uploadingThumbnail: false,
  extraFiles: [],
  bibBrace: true,
  zipper: true,
  binding: true
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
    case SET_UPLOADING_SUCCESS: {
      const { modelConfig } = action
      const colors = reverse(modelConfig.design.colors)
      return state.merge({
        uploadingFiles: false,
        modelConfig: action.modelConfig,
        colors: List.of(...colors)
      })
    }
    case SET_UPLOADING_DESIGN_SUCCESS: {
      const { design: config } = action
      const {
        areasPng,
        areasSvg,
        design: { colors },
        size
      } = config
      const reverseColors = reverse(colors)
      const modelConfig = state.get('modelConfig')
      const updatedModelConfig = modelConfig.merge({
        areasPng: List.of(...areasPng),
        areasSvg: List.of(...areasSvg),
        colors: List.of(...colors),
        size
      })
      return state.merge({
        modelConfig: updatedModelConfig,
        uploadingFiles: false,
        areas: List.of(...areasPng),
        colors: List.of(...reverseColors)
      })
    }
    case SET_CURRENT_TAB_ACTION:
      return state.set('currentTab', action.index)
    case SET_SWIPING_TAB_ACTION:
      return state.set('swipingView', action.isSwiping)
    case SET_SELECTED_THEME_ACTION:
      return state.set('selectedTheme', action.id)
    case SET_SELECTED_STYLE_ACTION:
      return state.set('selectedStyle', action.id)
    case SET_DESIGN_CONFIG_ACTION: {
      const { config } = action
      const designConfig = state.get('designConfig')
      const updatedDesignConfig = designConfig.push(fromJS(config))
      return state.set('designConfig', List.of(...updatedDesignConfig))
    }
    case SET_INSPIRATION_COLOR_ACTION: {
      const colors = state.getIn([
        'designConfig',
        'inspiration',
        action.index,
        'colors'
      ])
      return state.set('colors', colors)
    }
    case SET_COMPLEXITY_ACTION:
      return state.setIn(
        ['designConfig', action.design, 'complexity'],
        action.complexity
      )
    case SET_PRODCUT_CODE_ACTION:
      return state.merge({
        productCode: action.code,
        selectedTheme: NONE_ID,
        selectedStyle: NONE_ID
      })
    case SET_THEME_NAME_ACTION:
      return state.set('themeName', action.name)
    case SET_STYLE_NAME_ACTION:
      return state.setIn(['designConfig', action.design, 'name'], action.name)
    case SET_THUMBNAIL_ACTION: {
      const { item, thumbnail } = action
      if (item === DESIGN_THUMBNAIL) {
        return state.setIn(
          ['designConfig', action.design, 'thumbnail'],
          thumbnail
        )
      }

      return state.setIn(
        ['designConfig', action.design, 'inspiration', item, 'thumbnail'],
        thumbnail
      )
    }
    case SET_UPLOADING_THUMBNAIL_ACTION:
      return state.set('uploadingThumbnail', action.uploadingItem)
    case ADD_EXTRA_FILE_ACTION: {
      const { file } = action
      const extraFiles = state.get('extraFiles')
      const updatedList = extraFiles.push(file)
      return state.set('extraFiles', List.of(...updatedList))
    }
    case REMOVE_EXTRA_FILE_ACTION: {
      const { index } = action
      const extraFiles = state.get('extraFiles')
      const updatedList = extraFiles.remove(index)
      return state.set('extraFiles', List.of(...updatedList))
    }
    case TOGGLE_EXTRA_COLOR_ACTION: {
      const { color } = action
      const currentValue = state.get(color)
      return state.set(color, !currentValue)
    }
    case SAVE_DESIGN_SUCCESS_ACTION:
      return state.set('designConfig', state.get('designConfig').clear())
    default:
      return state
  }
}

export default designerToolReducer
