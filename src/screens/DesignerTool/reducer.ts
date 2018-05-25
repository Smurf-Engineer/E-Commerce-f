/**
 * DesignerTool Reducer - Created by david on 08/05/18.
 */
import { fromJS, List } from 'immutable'
import {
  DEFAULT_ACTION,
  SET_LOADING_MODEL,
  SET_COLOR_ACTION,
  SET_COLOR_BLOCK_ACTION,
  COLOR_BLOCK_HOVERED_ACTION,
  SET_UPLOADING_ACTION,
  SET_UPLOADING_SUCCESS,
  SET_UPLOADING_DESIGN_SUCCESS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  colorBlock: -1,
  colorBlockHovered: -1,
  colors: [],
  styleColors: [],
  loadingModel: false,
  uploadingFiles: false,
  modelConfig: null,
  areas: []
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
    default:
      return state
  }
}

export default designerToolReducer
