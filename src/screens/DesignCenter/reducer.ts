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
  SET_TEXT_ACTION,
  SET_STYLE_COMPLEXITY_ACTION,
  OPEN_ADD_TOTEAMSTORE,
  SET_ITEM_TOADD,
  SET_CANVAS_ELEMENT_ACTION,
  SET_SELECTED_ELEMENT_ACTION,
  REMOVE_CANVAS_ELEMENT_ACTION,
  SET_TEXT_FORMAT_ACTION,
  OPEN_DELETE_OR_APPLY_PALETTE_MODAL,
  OPEN_RESET_DESIGN_MODAL,
  EDIT_DESIGN_ACTION,
  OPEN_NEW_THEME_MODAL,
  OPEN_NEW_STYLE_MODAL
} from './constants'
import { Reducer } from '../../types/common'

const colorsInit = fill(Array(5), '')

export const initialState = fromJS({
  currentTab: 0,
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
  themeId: -1,
  style: -1,
  openShareModal: false,
  openSaveDesign: false,
  checkedTerms: false,
  savedDesignId: '',
  designBase64: '',
  saveDesignLoading: false,
  text: '',
  openAddToStoreModal: false,
  teamStoreId: '',
  itemToAdd: {},
  canvas: {
    text: {},
    image: {},
    art: {}
  },
  textFormat: {
    fontFamily: 'Avenir',
    stroke: '#000',
    fill: '#000',
    strokeWidth: 0
  },
  selectedElement: '',
  myPaletteModals: {
    openDeletePaletteModal: false,
    openApplyPaletteModal: false,
    idPaletteToExecuteAction: -1
  },
  openResetDesignModal: false,
  themeModalData: {
    openNewThemeModal: false,
    themeId: -1
  },
  styleModalData: {
    openNewStyleModal: false,
    indexStyle: -1,
    idStyle: -1
  },
  designHasChanges: false
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
        redoChanges: redoChanges.clear(),
        designHasChanges: true
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
        redoChanges: redoChanges.clear(),
        designHasChanges: true
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
      return state.merge({
        colors: List.of(...colorsInit),
        openResetDesignModal: false
      })
    case EDIT_DESIGN_ACTION:
      return state.merge({
        currentTab: 2,
        designName: '',
        checkedTerms: false
      })
    case SET_SWIPING_TAB_ACTION:
      return state.set('swipingView', action.isSwiping)
    case SET_THEME_SELECTED_ACTION:
      return state.merge({
        themeId: action.id,
        swipingView: true,
        currentTab: 1,
        themeModalData: {
          openNewThemeModal: false,
          themeId: action.id
        },
        designHasChanges: false
      })
    case SET_STYLE_SELECTED_ACTION: {
      return state.merge({
        swipingView: true,
        currentTab: 2,
        style: action.style,
        colors: action.colors,
        styleModalData: {
          openNewStyleModal: false,
          indexStyle: action.index,
          idStyle: action.id
        },
        designHasChanges: false
      })
    }
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
      return state.merge({ checkedTerms: false })
    case SET_TEXT_ACTION:
      return state.set('text', action.text)
    case OPEN_ADD_TOTEAMSTORE:
      return state.set('openAddToStoreModal', action.open)
    case SET_ITEM_TOADD:
      return state.merge({
        teamStoreId: action.teamStoreId,
        itemToAdd: action.teamStoreItem
      })
    case SET_CANVAS_ELEMENT_ACTION: {
      const { el, typeEl } = action
      const canvas = state.get('canvas')
      const selectedElement = state.get('selectedElement')
      const updatedCanvas = canvas.setIn([typeEl, el.id], el)
      if (selectedElement) {
        return state.set('canvas', updatedCanvas)
      }
      return state.merge({
        canvas: updatedCanvas,
        text: '',
        designHasChanges: true
      })
    }
    case SET_SELECTED_ELEMENT_ACTION: {
      const { id, typeEl } = action
      const canvasElement = state.getIn(['canvas', typeEl, id])
      const selectedElement = state.get('selectedElement')
      if (typeEl === 'text' && canvasElement) {
        return state.merge({
          selectedElement: id,
          textFormat: canvasElement.textFormat,
          text: canvasElement.text
        })
      }

      if (!id && selectedElement) {
        return state.merge({ text: '', selectedElement: id })
      }

      return state.set('selectedElement', id)
    }
    case REMOVE_CANVAS_ELEMENT_ACTION:
      return state.deleteIn(['canvas', action.typeEl, action.id])
    case SET_TEXT_FORMAT_ACTION:
      return state.setIn(['textFormat', action.key], action.value)
    case OPEN_DELETE_OR_APPLY_PALETTE_MODAL: {
      const { key, open, value } = action
      const myPaletteModals = state.get('myPaletteModals')
      let updatedMyPalette
      if (key === 'delete') {
        updatedMyPalette = myPaletteModals.merge({
          openDeletePaletteModal: open,
          idPaletteToExecuteAction: value
        })
      } else {
        updatedMyPalette = myPaletteModals.merge({
          openApplyPaletteModal: open,
          idPaletteToExecuteAction: value
        })
      }
      return state.set('myPaletteModals', updatedMyPalette)
    }
    case OPEN_RESET_DESIGN_MODAL:
      return state.set('openResetDesignModal', action.open)
    case OPEN_NEW_THEME_MODAL: {
      const { open, themeId } = action
      const newThemeId =
        themeId !== -1 ? themeId : state.getIn(['themeModalData', 'themeId'])
      const themeModalData = {
        openNewThemeModal: open,
        themeId: newThemeId
      }
      return state.set('themeModalData', themeModalData)
    }
    case OPEN_NEW_STYLE_MODAL: {
      const { open, indexStyle, idStyle } = action
      const newIndexStyle =
        indexStyle !== -1
          ? indexStyle
          : state.getIn(['styleModalData', 'indexStyle'])
      const newIdStyle =
        idStyle !== -1 ? idStyle : state.getIn(['styleModalData', 'idStyle'])
      const styleModalData = {
        openNewStyleModal: open,
        indexStyle: newIndexStyle,
        idStyle: newIdStyle
      }
      return state.set('styleModalData', styleModalData)
    }
    default:
      return state
  }
}

export default designCenterReducer
