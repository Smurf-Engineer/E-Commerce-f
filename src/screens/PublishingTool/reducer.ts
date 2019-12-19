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
  Sections
} from './constants'
import { Reducer } from '../../types/common'

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
  selectedDesign: -1
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
      return state.set('designModalOpen', !state.get('designModalOpen'))
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
    default:
      return state
  }
}

export default publishingToolReducer
