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
  SET_UPLOADING_SUCCESS
} from './constants'
import { Reducer } from '../../types/common'

export const initialState = fromJS({
  someKey: 'This is a value in the reducer',
  currentTab: 0,
  colorBlock: -1,
  colorBlockHovered: -1,
  colors: ['#13185C', '#3296DC', '#363EAF', '#000000', '#13185C'],
  styleColors: ['#13185C', '#3296DC', '#363EAF', '#000000', '#13185C'],
  palettes: [],
  paletteName: '',
  designName: '',
  loadingModel: false,
  undoChanges: [],
  redoChanges: [],
  swipingView: false,
  themeId: null,
  style: null,
  openShareModal: false,
  openSaveDesign: false,
  checkedTerms: false,
  savedDesignId: '',
  designBase64: '',
  saveDesignLoading: false,
  uploadingFiles: false,
  modelConfig: null
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
        modelConfig: action.modelConfig
      })
    default:
      return state
  }
}

export default designerToolReducer
