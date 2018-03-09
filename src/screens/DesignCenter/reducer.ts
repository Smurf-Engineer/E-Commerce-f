/**
 * DesignCenter Reducer - Created by david on 23/02/18.
 */
import { fromJS, List } from 'immutable'
import fill from 'lodash/fill'
import {
  SET_CURRENT_TAB_ACTION,
  SET_COLOR_BLOCK_ACTION,
  SET_COLOR_ACTION,
  SET_PALETTE_ACTION,
  SET_PALETTE_NAME_ACTION,
  SET_PALETTES_ACTION,
  SET_LOADING_MODEL,
  DESIGN_RESET_ACTION,
  DESIGN_UNDO_ACTION,
  DESIGN_REDO_ACTION
} from './constants'
import { Reducer } from '../../types/common'

const colorsInit = fill(Array(5), '')

export const initialState = fromJS({
  currentTab: 0,
  colorBlock: -1,
  colors: ['#F0AAB4', '#EE3C6F', '#94CFBB', '#00ADEE', '#FFFFFF'],
  styleColors: ['#F0AAB4', '#EE3C6F', '#94CFBB', '#00ADEE', '#FFFFFF'],
  palettes: [],
  paletteName: '',
  loadingModel: false,
  undoChanges: [],
  redoChanges: []
})

const designCenterReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB_ACTION:
      return state.set('currentTab', action.index)
    case SET_COLOR_BLOCK_ACTION:
      return state.set('colorBlock', action.index)
    case SET_COLOR_ACTION: {
      const colorBlock = state.get('colorBlock')
      if (colorBlock < 0) {
        return state
      }
      const { color } = action
      const colors = state.get('colors')
      const undoChanges = state.get('undoChanges')
      const updatedColors = colors.updateIn([colorBlock], () => color)
      const redoChanges = state.get('redoChanges')

      const lastStep = {
        type: 'colors',
        state: colors
      }

      return state.merge({
        colors: List.of(...updatedColors),
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case SET_PALETTE_ACTION: {
      const colors = state.get('colors')
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')

      const lastStep = {
        type: 'colors',
        state: colors
      }

      return state.merge({
        colors: List.of(...action.colors),
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case DESIGN_UNDO_ACTION: {
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')

      const undoStep = undoChanges.first()

      const oldState = state.get(undoStep.type)

      const redoStep = {
        type: undoStep.type,
        state: oldState
      }

      return state.merge({
        undoChanges: undoChanges.shift(),
        redoChanges: redoChanges.unshift(redoStep),
        [undoStep.type]: undoStep.state
      })
    }
    case DESIGN_REDO_ACTION: {
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')

      const redoStep = redoChanges.first()

      const currentState = state.get(redoStep.type)

      const undoStep = {
        type: redoStep.type,
        state: currentState
      }

      return state.merge({
        undoChanges: undoChanges.unshift(undoStep),
        redoChanges: redoChanges.shift(),
        [redoStep.type]: redoStep.state
      })
    }
    case SET_PALETTE_NAME_ACTION:
      return state.set('paletteName', action.name)
    case SET_PALETTES_ACTION:
      return state.set('palettes', action.palettes)
    case SET_LOADING_MODEL:
      return state.set('loadingModel', action.loading)
    case DESIGN_RESET_ACTION:
      return state.set('colors', List.of(...colorsInit))
    default:
      return state
  }
}

export default designCenterReducer
