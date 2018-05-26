/**
 * DesignCenter Reducer - Created by david on 23/02/18.
 */
import { fromJS, List } from 'immutable'
import fill from 'lodash/fill'
import isEqual from 'lodash/isEqual'
import {
  CLEAR_STORE_ACTION,
  SET_CURRENT_TAB_ACTION,
  SET_COLOR_BLOCK_ACTION,
  SET_COLOR_ACTION,
  SET_PALETTE_ACTION,
  SET_PALETTE_NAME_ACTION,
  SET_PALETTES_ACTION,
  SET_LOADING_MODEL,
  DESIGN_RESET_ACTION,
  DESIGN_UNDO_ACTION,
  DESIGN_REDO_ACTION,
  SET_SWIPING_TAB_ACTION,
  SET_THEME_SELECTED_ACTION,
  SET_STYLE_SELECTED_ACTION,
  OPEN_SHARE_MODAL,
  OPEN_SAVEDESIGN,
  SET_DESIGN_NAME,
  SAVE_DESIGN_ID,
  COLOR_BLOCK_HOVERED_ACTION,
  SET_CHECKED_TERMS,
  CLEAR_DESIGN_INFO,
  SAVE_DESIGN_LOADING,
  SET_STYLE_COMPLEXITY_ACTION,
  OPEN_ADD_TOTEAMSTORE
} from './constants'
import { Reducer } from '../../types/common'

const colorsInit = fill(Array(5), '')

export const initialState = fromJS({
  currentTab: 3,
  colorBlock: -1,
  colorBlockHovered: -1,
  colors: ['#B9B9B9', '#D2D2D2', '#255B2D', '#096F39', '#A9A9A9'],
  palettes: [],
  paletteName: '',
  designName: '',
  loadingModel: false,
  undoChanges: [],
  redoChanges: [],
  swipingView: false,
  themeId: null,
  style: 0,
  openShareModal: false,
  openSaveDesign: false,
  checkedTerms: false,
  savedDesignId: '',
  designBase64: '',
  saveDesignLoading: false,
  openAddToStoreModal: false
})

const designCenterReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STORE_ACTION:
      return initialState
    case SET_CURRENT_TAB_ACTION:
      return state.merge({
        currentTab: action.index,
        swipingView: true
      })
    case SET_COLOR_BLOCK_ACTION:
      return state.set('colorBlock', action.index)
    case COLOR_BLOCK_HOVERED_ACTION:
      return state.set('colorBlockHovered', action.index)
    case SET_COLOR_ACTION: {
      const { color } = action
      const colors = state.get('colors')
      const colorBlock = state.get('colorBlock')
      const prevColor = colors.get(colorBlock)

      if (colorBlock < 0 || color === prevColor) {
        return state
      }

      const updatedColors = colors.updateIn([colorBlock], () => color)
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const lastStep = { type: 'colors', state: colors }

      return state.merge({
        colors: List.of(...updatedColors),
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case SET_PALETTE_ACTION: {
      const { colors } = action
      const prevColors = state.get('colors')
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const equalColors = isEqual(colors, prevColors.toJS())

      if (equalColors) {
        return state
      }

      const lastStep = { type: 'colors', state: prevColors }

      return state.merge({
        colors: List.of(...colors),
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case DESIGN_UNDO_ACTION: {
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const undoStep = undoChanges.first()
      const oldState = state.get(undoStep.type)
      const redoStep = { type: undoStep.type, state: oldState }

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
      const undoStep = { type: redoStep.type, state: currentState }

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
    case SET_SWIPING_TAB_ACTION:
      return state.set('swipingView', action.isSwiping)
    case SET_THEME_SELECTED_ACTION:
      return state.merge({
        themeId: action.id,
        currentTab: 1
      })
    case SET_STYLE_SELECTED_ACTION:
      return state.set('currentTab', 2)
    case SET_STYLE_COMPLEXITY_ACTION:
      return state.merge({
        style: action.index,
        colors: action.colors
      })
    case OPEN_SHARE_MODAL:
      return state.set('openShareModal', action.open)
    case OPEN_SAVEDESIGN:
      return state.merge({
        openSaveDesign: action.open,
        designBase64: action.imageBase64
      })
    case SET_DESIGN_NAME:
      return state.merge({ designName: action.param })
    case SAVE_DESIGN_ID:
      return state.set('savedDesignId', action.id)
    case SET_CHECKED_TERMS:
      return state.set('checkedTerms', action.checked)
    case SAVE_DESIGN_LOADING:
      return state.set('saveDesignLoading', action.loading)
    case CLEAR_DESIGN_INFO:
      return state.merge({ checkedTerms: false, designName: '' })
    case OPEN_ADD_TOTEAMSTORE:
      return state.set('openAddToStoreModal', action.open)
    default:
      return state
  }
}

export default designCenterReducer
