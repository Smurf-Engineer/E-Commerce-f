/**
 * DesignerTool Reducer - Created by david on 08/05/18.
 */
import { fromJS, List } from 'immutable'
import reverse from 'lodash/reverse'
import fill from 'lodash/fill'
import isEmpty from 'lodash/isEmpty'
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
  SET_DESIGN_NAME_ACTION,
  SET_COMPLEXITY_ACTION,
  SET_THUMBNAIL_ACTION,
  SET_UPLOADING_THUMBNAIL_ACTION,
  ADD_EXTRA_FILE_ACTION,
  REMOVE_EXTRA_FILE_ACTION,
  TOGGLE_EXTRA_COLOR_ACTION,
  SAVE_DESIGN_SUCCESS_ACTION,
  EDIT_COLOR_IDEA_ACTION,
  SET_MODEL_ACTION,
  DELETE_COLOR_IDEA_ACTION,
  UPDATE_COLOR_IDEA_NAME_ACTION,
  ADD_COLOR_IDEA_ACTION,
  SET_THEME_TO_EDIT_ACTION,
  UPDATE_THEME_NAME_ACTION
} from './constants'
import { Reducer } from '../../types/common'

export const NONE = -1
export const NONE_ID = 0
export const DESIGN_THUMBNAIL = -1
export const DESIGN_COLORS = -2

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
  design: {},
  selectedTheme: NONE_ID,
  selectedStyle: NONE_ID,
  designConfig: [],
  productCode: '',
  uploadingThumbnail: false,
  extraFiles: [],
  bibBrace: true,
  zipper: true,
  binding: true,
  colorIdeaItem: NONE,
  colorIdeas: [],
  editableTheme: null,
  themes: []
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
      const { config, design, colorIdeas } = modelConfig
      if (isEmpty(design)) {
        const defaultColors = fill(Array(config.areasPng.length), 'black')
        const defaultDesign = { name: '', colors: defaultColors }
        return state.merge({
          design: defaultDesign,
          modelConfig: config,
          uploadingFiles: false,
          colors: List.of(...defaultColors)
        })
      }

      const colors = [...design.colors]
      return state.merge({
        design,
        modelConfig: config,
        uploadingFiles: false,
        colorIdeas: fromJS(colorIdeas),
        colors: List.of(...reverse(colors))
      })
    }
    case SET_MODEL_ACTION: {
      const { modelConfig, colorIdeas, design } = action
      const colors = [...design.colors]
      return state.merge({
        design,
        modelConfig,
        uploadingFiles: false,
        colorIdeas: fromJS(colorIdeas),
        colors: List.of(...reverse(colors))
      })
    }
    case SET_UPLOADING_DESIGN_SUCCESS: {
      const { design } = action
      const { colorIdeas, config, design: updatedDesign } = design
      const { areasPng, areasSvg, size } = config

      const modelConfig = state.get('modelConfig')
      if (isEmpty(updatedDesign)) {
        const defaultColors = fill(Array(config.areasPng.length), 'black')
        const defaultDesign = { name: '', colors: defaultColors }
        const updatedConfig = modelConfig.merge({
          size,
          colors: List.of(...defaultColors),
          areasSvg: List.of(...areasSvg),
          areasPng: List.of(...areasPng)
        })
        return state.merge({
          uploadingFiles: false,
          design: defaultDesign,
          areas: List.of(...areasPng),
          colorIdeas: [],
          colors: List.of(...defaultColors),
          modelConfig: updatedConfig
        })
      }
      const colors = [...updatedDesign.colors]
      while (areasPng.length < 5) {
        areasPng.unshift('black')
      }
      const reverseColors = reverse(colors)
      const updatedModelConfig = modelConfig.merge({
        size,
        colors: List.of(...colors),
        areasSvg: List.of(...areasSvg),
        areasPng: List.of(...areasPng)
      })
      return state.merge({
        uploadingFiles: false,
        design: updatedDesign,
        areas: List.of(...areasPng),
        colorIdeas: fromJS(colorIdeas),
        colors: List.of(...reverseColors),
        modelConfig: updatedModelConfig
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
        'colors',
        'inspiration',
        action.index,
        'designConfig'
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
    case SET_DESIGN_NAME_ACTION:
      return state.setIn(['design', 'name'], action.name)
    case SET_THUMBNAIL_ACTION: {
      const { item, thumbnail } = action
      if (item === DESIGN_THUMBNAIL) {
        return state.withMutations((map: any) => {
          map.setIn(['design', 'image'], thumbnail)
          map.set('uploadingThumbnail', false)
        })
      }

      return state.withMutations((map: any) => {
        map.setIn(['colorIdeas', item, 'image'], thumbnail)
        map.set('uploadingThumbnail', false)
      })
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
    case EDIT_COLOR_IDEA_ACTION: {
      const { item } = action
      if (item !== NONE) {
        const keyPath =
          item !== DESIGN_COLORS
            ? ['colorIdeas', item, 'colors']
            : ['design', 'colors']
        const colors = state.getIn(keyPath) || []
        return state.merge({
          colors: colors.reverse(),
          colorIdeaItem: item
        })
      }

      return state.merge({
        colorBlock: NONE,
        colorIdeaItem: item,
        colorBlockHovered: NONE
      })
    }
    case DELETE_COLOR_IDEA_ACTION: {
      const { index } = action
      const colorsIdeas = state.get('colorIdeas')
      const colorIdeasUpdated = colorsIdeas.remove(index)
      return state.set('colorIdeas', colorIdeasUpdated)
    }
    case ADD_COLOR_IDEA_ACTION: {
      const colorsIdeas = state.get('colorIdeas')
      const areasPng = state.getIn(['modelConfig', 'areasPng']) || []
      const colors = fill(Array(areasPng.count()), 'black')
      const updatedColorIdeas = colorsIdeas.push(
        fromJS({
          name: '',
          colors,
          image: null
        })
      )
      return state.set('colorIdeas', updatedColorIdeas)
    }
    case UPDATE_COLOR_IDEA_NAME_ACTION: {
      const { name, updateColors } = action
      const colors = state.get('colors')
      const colorIdeaItem = state.get('colorIdeaItem')
      const namePath =
        colorIdeaItem === DESIGN_COLORS
          ? ['design', 'name']
          : ['colorIdeas', colorIdeaItem, 'name']
      const imagePath =
        colorIdeaItem === DESIGN_COLORS
          ? ['design', 'image']
          : ['colorIdeas', colorIdeaItem, 'image']
      const colorPath =
        colorIdeaItem === DESIGN_COLORS
          ? ['design', 'colors']
          : ['colorIdeas', colorIdeaItem, 'colors']

      return state.withMutations((map: any) => {
        map.setIn(namePath, name)
        if (updateColors) {
          map.setIn(colorPath, colors.reverse())
          map.setIn(imagePath, null)
        }
        map.merge({
          colorBlock: NONE,
          colorIdeaItem: NONE,
          colorBlockHovered: NONE
        })
      })
    }
    case SET_THEME_TO_EDIT_ACTION:
      return state.set('editableTheme', fromJS(action.theme))
    case UPDATE_THEME_NAME_ACTION:
      return state.setIn(['editableTheme', 'name'], action.name)
    default:
      return state
  }
}

export default designerToolReducer
