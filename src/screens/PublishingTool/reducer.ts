/**
 * PublishingTool Reducer - Created by eduardoquintero on 02/12/19.
 */
import { fromJS, List } from 'immutable'
import isEmpty from 'lodash/isEmpty'
import reverse from 'lodash/reverse'
import fill from 'lodash/fill'
import {
  ON_RESET_REDUCER,
  SET_PRODUCT_CODE,
  ON_CHANGE_THEME,
  SET_THEME_TO_EDIT_ACTION,
  UPDATE_THEME_NAME_ACTION,
  SET_CURRENT_PAGE,
  TOGGLE_ADD_DESIGN,
  UPDATE_DESIGN_NAME,
  SET_UPLOADING,
  SET_UPLOADING_DESIGN_SUCCESS,
  ON_SELECT_TAB,
  SET_MODEL_ACTION,
  UNSELECT,
  EDIT_COLOR_IDEA_ACTION,
  SET_COLOR_BLOCK_ACTION,
  COLOR_BLOCK_HOVERED_ACTION,
  SET_COLOR_ACTION,
  UPDATE_COLOR_IDEA_NAME_ACTION,
  SET_INSPIRATION_COLOR_ACTION,
  SET_LOADING_MODEL,
  ADD_COLOR_IDEA_ACTION,
  SET_THUMBNAIL_ACTION,
  SET_UPLOADING_THUMBNAIL_ACTION,
  OPEN_SAVE_DESIGN_ACTION,
  SET_SAVING_DESIGN,
  UPDATE_COLOR_IDEAS_LIST,
  SET_DESIGN_NAME_ACTION,
  DELETE_COLOR_IDEA_ACTION,
  SET_CANVAS_JSON_ACTION,
  Sections
} from './constants'
import { Reducer } from '../../types/common'

export const NONE = -1
export const NONE_ID = 0
export const DESIGN_THUMBNAIL = -1
export const DESIGN_COLORS = -2

export const initialState = fromJS({
  productCode: '',
  selectedTheme: -1,
  currentTab: 0,
  currentPage: 0,
  designModalOpen: false,
  designName: '',
  uploading: false,
  modelConfig: {
    size: {},
    colors: [],
    areasSvg: [],
    areasPng: []
  },
  colorIdeas: [],
  colors: [],
  design: {},
  areas: [],
  selectedDesign: -1,
  colorIdeaItem: NONE,
  colorBlock: NONE,
  colorBlockHovered: NONE,
  canvas: {
    text: {},
    image: {},
    path: {}
  },
  selectedElement: '',
  loadingModel: false,
  uploadingThumbnail: false,
  openSaveDesign: false,
  productId: -1,
  saveDesignLoading: false
})

const publishingToolReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case ON_RESET_REDUCER:
      return initialState
    case SET_PRODUCT_CODE:
      return state.set('productCode', action.value)
    case ON_CHANGE_THEME: {
      const { id, section } = action
      const selectedKey =
        section === Sections.Theme ? 'selectedTheme' : 'selectedDesign'
      return state.merge({ [selectedKey]: id })
    }
    case SET_THEME_TO_EDIT_ACTION:
      return state.merge({ editableTheme: action.theme })
    case UPDATE_THEME_NAME_ACTION:
      return state.setIn(['editableTheme', 'name'], action.name)
    case SET_CURRENT_PAGE:
      return state.merge({ currentPage: action.page, selectedDesign: -1 })
    case TOGGLE_ADD_DESIGN:
      return state.merge({
        designModalOpen: !state.get('designModalOpen'),
        productId: action.id
      })
    case UPDATE_DESIGN_NAME:
      return state.set('designName', action.value)
    case UNSELECT: {
      const { section } = action
      const selectedKey =
        section === Sections.Theme ? 'selectedTheme' : 'selectedDesign'
      return state.merge({ [selectedKey]: -1 })
    }
    case SET_UPLOADING:
      return state.set('uploading', action.uploading)
    case SET_UPLOADING_DESIGN_SUCCESS: {
      const { design } = action
      const { colorIdeas, config, design: updatedDesign } = design
      updatedDesign.name = state.get('designName')
      const {
        areasPng,
        areasSvg,
        size,
        obj,
        mtl,
        label,
        flatlock,
        bumpMap,
        bibBrace,
        zipper,
        binding
      } = config

      const modelConfig = state.get('modelConfig')
      if (isEmpty(updatedDesign)) {
        const defaultColors = fill(Array(config.areasPng.length), 'black')
        const defaultDesign = { name: '', colors: defaultColors }
        const updatedConfig = modelConfig.merge({
          size,
          colors: List.of(...defaultColors),
          areasSvg: List.of(...areasSvg),
          areasPng: List.of(...areasPng),
          obj,
          mtl,
          label,
          flatlock,
          bumpMap,
          bibBrace,
          zipper,
          binding
        })
        return state.merge({
          uploading: false,
          design: defaultDesign,
          areas: List.of(...areasPng),
          colorIdeas: [],
          colors: List.of(...defaultColors),
          modelConfig: updatedConfig
        })
      }
      const colors = [...updatedDesign.colors]

      while (areasPng.length < 5) {
        areasPng.push('black')
      }
      const reverseColors = reverse(colors)
      const updatedModelConfig = modelConfig.merge({
        size,
        colors: List.of(...colors),
        areasSvg: List.of(...areasSvg),
        areasPng: List.of(...areasPng),
        obj,
        mtl,
        label,
        flatlock,
        bumpMap,
        bibBrace,
        zipper,
        binding
      })

      return state.merge({
        uploading: false,
        design: updatedDesign,
        areas: List.of(...areasPng),
        colorIdeas: fromJS(colorIdeas),
        colors: List.of(...reverseColors),
        modelConfig: updatedModelConfig,
        designModalOpen: false,
        currentTab: 1
      })
    }
    case ON_SELECT_TAB:
      return state.set('currentTab', action.index)
    case SET_MODEL_ACTION: {
      const { modelConfig, colorIdeas, design } = action
      const colors = [...design.colors]
      return state.merge({
        design,
        modelConfig,
        uploading: false,
        colorIdeas: fromJS(colorIdeas),
        colors: List.of(...reverse(colors)),
        currentTab: 1
      })
    }
    case EDIT_COLOR_IDEA_ACTION: {
      const { item } = action
      if (item !== NONE) {
        const keyPath =
          item !== DESIGN_COLORS ? ['colorIdeas', item] : ['design', 'colors']

        const colors = state.getIn(keyPath) || []
        return state.merge({
          colors: item !== DESIGN_COLORS ? colors.colors : colors,
          colorIdeaItem: item
        })
      }
      return state.merge({
        colorBlock: NONE,
        colorIdeaItem: item,
        colorBlockHovered: NONE
      })
    }
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
    case SET_INSPIRATION_COLOR_ACTION: {
      const colors = state.getIn([
        'colors',
        'inspiration',
        action.index,
        'designConfig'
      ])
      return state.set('colors', colors)
    }
    case SET_LOADING_MODEL:
      return state.set('loadingModel', action.isLoading)
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
    case OPEN_SAVE_DESIGN_ACTION:
      return state.set('openSaveDesign', action.open)
    case SET_SAVING_DESIGN:
      return state.set('saveDesignLoading', action.saving)
    case UPDATE_COLOR_IDEAS_LIST:
      return state.set('colorIdeas', List.of(...action.colorIdeas))
    case SET_DESIGN_NAME_ACTION:
      return state.setIn(['design', 'name'], action.name)
    case DELETE_COLOR_IDEA_ACTION: {
      const { index } = action
      const colorsIdeas = state.get('colorIdeas')
      const colorIdeasUpdated = colorsIdeas.remove(index)
      return state.set('colorIdeas', colorIdeasUpdated)
    }
    case SET_CANVAS_JSON_ACTION:
      return state.setIn(['design', 'canvasJson'], action.canvas)
    default:
      return state
  }
}

export default publishingToolReducer
