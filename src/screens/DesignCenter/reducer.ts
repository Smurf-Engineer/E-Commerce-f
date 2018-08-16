/**
 * DesignCenter Reducer - Created by david on 23/02/18.
 */
import { fromJS, List } from 'immutable'
import isEqual from 'lodash/isEqual'
import {
  CLEAR_STORE_ACTION,
  SET_CURRENT_TAB_ACTION,
  SET_COLOR_BLOCK_ACTION,
  SET_COLOR_ACTION,
  SET_STITCHING_COLOR_ACTION,
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
  OPEN_SAVE_DESIGN_ACTION,
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
  SET_ART_FORMAT_ACTION,
  OPEN_DELETE_OR_APPLY_PALETTE_MODAL,
  OPEN_RESET_DESIGN_MODAL,
  EDIT_DESIGN_ACTION,
  OPEN_NEW_THEME_MODAL,
  OPEN_NEW_STYLE_MODAL,
  OPEN_OUT_WITHOUT_SAVE_MODAL,
  SET_CUSTOMIZE_3D_MOUNTED,
  SET_CANVAS_JSON_ACTION,
  SET_ACCESSORY_COLOR_ACTION,
  CANVAS_ELEMENT_RESIZED_ACTION,
  UPLOAD_FILE_ACTION_SUCCESS,
  SET_UPLOADING_FILE_ACTION,
  SET_SEARCH_CLIPARTPARAM,
  CANVAS_ELEMENT_DRAGGED_ACTION,
  CANVAS_ELEMENT_ROTATED_ACTION,
  CANVAS_ELEMENT_TEXT_CHANGED,
  REAPPLY_CANVAS_IMAGE_ACTION,
  SET_EDIT_DESIGN_CONFIG_ACTION,
  Changes,
  CanvasElements,
  WHITE,
  BLACK,
  AccessoryColors,
  ElementsToApplyScale
} from './constants'
import { Reducer, Change } from '../../types/common'

export const initialState = fromJS({
  currentTab: 0,
  tabChanged: false,
  colorBlock: -1,
  colorBlockHovered: -1,
  colors: [],
  stitchingColor: { name: 'FSC-17', value: '#FFFFFF' },
  bindingColor: WHITE,
  zipperColor: WHITE,
  bibColor: WHITE,
  styleColors: [],
  palettes: [],
  paletteName: '',
  designName: '',
  loadingModel: false,
  undoChanges: [],
  redoChanges: [],
  swipingView: false,
  themeId: -1,
  styleIndex: -1,
  openShareModal: false,
  openSaveDesign: false,
  checkedTerms: false,
  savedDesignId: '',
  design: {},
  style: {},
  complexity: 0,
  saveDesignLoading: false,
  text: '',
  openAddToStoreModal: false,
  teamStoreId: '',
  itemToAdd: {},
  canvas: {
    text: {},
    image: {},
    path: {}
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
  designHasChanges: false,
  openOutWithoutSaveModal: false,
  routeToGoWithoutSave: '',
  customize3dMounted: false,
  svgOutputUrl: '',
  uploadingFile: false,
  images: [],
  searchClipParam: '',
  savedDesign: {}
})

const designCenterReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STORE_ACTION:
      return initialState
    case SET_CURRENT_TAB_ACTION: {
      if (action.index === 2) {
        return state.merge({
          currentTab: action.index,
          swipingView: true,
          customize3dMounted: true,
          tabChanged: true
        })
      }
      return state.merge({
        currentTab: action.index,
        swipingView: true,
        tabChanged: true
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
      const prevColor = colors.get(colorBlock)

      if (colorBlock < 0 || color === prevColor) {
        return state
      }

      const updatedColors = colors.updateIn([colorBlock], () => color)
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const lastStep = { type: Changes.Colors, state: colors }

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

      const lastStep = { type: Changes.Colors, state: prevColors }

      return state.merge({
        colors: List.of(...colors),
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear(),
        designHasChanges: true
      })
    }
    case SET_STITCHING_COLOR_ACTION: {
      const oldColor = state.get('stitchingColor').toJS()
      const newColor = action.stitchingColor
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const lastStep = {
        type: Changes.AccessoryColors,
        state: { id: AccessoryColors.Stitching, oldColor, newColor }
      }
      return state.merge({
        stitchingColor: newColor,
        designHasChanges: true,
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case SET_ACCESSORY_COLOR_ACTION: {
      const { id, color } = action
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const lastStep = {
        type: Changes.AccessoryColors,
        state: { id, newColor: color }
      }
      return state.merge({
        [id]: color,
        designHasChanges: true,
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case DESIGN_UNDO_ACTION: {
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const undoStep = undoChanges.first()

      const {
        type,
        state: { type: canvasType, id }
      } = undoStep
      switch (type) {
        case Changes.Add: {
          const canvas = state.get('canvas')
          const updatedCanvas = canvas.deleteIn([canvasType, id])

          return state.merge({
            undoChanges: undoChanges.shift(),
            redoChanges: redoChanges.unshift(undoStep),
            canvas: updatedCanvas,
            selectedElement: ''
          })
        }
        case Changes.Delete: {
          const updatedCanvas = addCanvasElement(state, undoStep)
          return state.merge({
            undoChanges: undoChanges.shift(),
            redoChanges: redoChanges.unshift(undoStep),
            canvas: updatedCanvas,
            selectedElement: ''
          })
        }
        case Changes.CanvasStyle: {
          const updatedCanvas = changeStyleCanvasElement(state, undoStep)
          return state.merge({
            undoChanges: undoChanges.shift(),
            redoChanges: redoChanges.unshift(undoStep),
            canvas: updatedCanvas,
            selectedElement: ''
          })
        }
        case Changes.Rotate:
        case Changes.Resize:
        case Changes.Drag:
          return state.merge({
            undoChanges: undoChanges.shift(),
            redoChanges: redoChanges.unshift(undoStep),
            selectedElement: ''
          })
        case Changes.AccessoryColors: {
          const {
            state: { id: accessory, newColor: color, oldColor }
          } = undoStep
          if (accessory !== AccessoryColors.Stitching) {
            const newColor = color === WHITE ? BLACK : WHITE
            return state.merge({
              undoChanges: undoChanges.shift(),
              redoChanges: redoChanges.unshift(undoStep),
              [accessory]: newColor
            })
          }
          return state.merge({
            undoChanges: undoChanges.shift(),
            redoChanges: redoChanges.unshift(undoStep),
            stitchingColor: oldColor
          })
        }
        case Changes.ChangeText: {
          const updatedCanvas = changeTextCanvasElement(state, undoStep)
          return state.merge({
            undoChanges: undoChanges.shift(),
            redoChanges: redoChanges.unshift(undoStep),
            canvas: updatedCanvas,
            selectedElement: ''
          })
        }
        case Changes.Colors:
        default:
          const oldState = state.get(undoStep.type)
          const redoStep = { type: undoStep.type, state: oldState }
          return state.merge({
            undoChanges: undoChanges.shift(),
            redoChanges: redoChanges.unshift(redoStep),
            colors: undoStep.state,
            selectedElement: ''
          })
      }
    }
    case DESIGN_REDO_ACTION: {
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const redoStep = redoChanges.first()
      const {
        type,
        state: { type: canvasType, id }
      } = redoStep
      switch (type) {
        case Changes.Add: {
          const updatedCanvas = addCanvasElement(state, redoStep)
          return state.merge({
            undoChanges: undoChanges.unshift(redoStep),
            redoChanges: redoChanges.shift(),
            canvas: updatedCanvas,
            selectedElement: ''
          })
        }
        case Changes.Delete: {
          const canvass = state.get('canvas')
          const updatedCanvas = canvass.deleteIn([canvasType, id])
          return state.merge({
            undoChanges: undoChanges.unshift(redoStep),
            redoChanges: redoChanges.shift(),
            canvas: updatedCanvas
          })
        }
        case Changes.CanvasStyle: {
          const updatedCanvas = changeStyleCanvasElement(state, redoStep, true)
          return state.merge({
            undoChanges: undoChanges.unshift(redoStep),
            redoChanges: redoChanges.shift(),
            canvas: updatedCanvas,
            selectedElement: ''
          })
        }
        case Changes.Rotate:
        case Changes.Resize:
        case Changes.Drag:
          return state.merge({
            undoChanges: undoChanges.unshift(redoStep),
            redoChanges: redoChanges.shift(),
            selectedElement: ''
          })
        case Changes.AccessoryColors: {
          const {
            state: { id: accessory, newColor: color }
          } = redoStep
          if (accessory !== AccessoryColors.Stitching) {
            const newColor = color === WHITE ? WHITE : BLACK
            return state.merge({
              undoChanges: undoChanges.unshift(redoStep),
              redoChanges: redoChanges.shift(),
              [accessory]: newColor
            })
          }
          return state.merge({
            undoChanges: undoChanges.unshift(redoStep),
            redoChanges: redoChanges.shift(),
            stitchingColor: color
          })
        }
        case Changes.ChangeText: {
          const updatedCanvas = changeTextCanvasElement(state, redoStep, true)
          return state.merge({
            undoChanges: undoChanges.unshift(redoStep),
            redoChanges: redoChanges.shift(),
            canvas: updatedCanvas,
            selectedElement: ''
          })
        }
        case Changes.Colors:
        default:
          const currentState = state.get(redoStep.type)
          const undoStep = { type: redoStep.type, state: currentState }
          return state.merge({
            undoChanges: undoChanges.unshift(undoStep),
            redoChanges: redoChanges.shift(),
            colors: redoStep.state
          })
      }
    }
    case SET_PALETTE_NAME_ACTION:
      return state.set('paletteName', action.name)
    case SET_PALETTES_ACTION:
      return state.set('palettes', action.palettes)
    case SET_LOADING_MODEL:
      return state.set('loadingModel', action.loading)
    case DESIGN_RESET_ACTION:
      return state.merge({
        colors: state.get('styleColors'),
        stitchingColor: { name: 'FSC-17', value: '#FFFFFF' },
        bindingColor: WHITE,
        zipperColor: WHITE,
        bibColor: WHITE,
        canvas: {
          text: {},
          image: {},
          path: {}
        },
        undoChanges: [],
        redoChanges: [],
        openResetDesignModal: false,
        designHasChanges: false
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
        designHasChanges: false,
        customize3dMounted: false,
        product: action.product
      })
    case SET_STYLE_SELECTED_ACTION: {
      return state.merge({
        currentTab: 2,
        swipingView: true,
        style: action.style,
        styleIndex: action.index,
        colors: action.colors,
        designHasChanges: false,
        styleColors: action.colors,
        customize3dMounted: false,
        styleModalData: {
          idStyle: action.id,
          indexStyle: action.index,
          openNewStyleModal: false
        }
      })
    }
    case SET_STYLE_COMPLEXITY_ACTION:
      return state.set('complexity', action.index)
    case OPEN_SHARE_MODAL:
      return state.set('openShareModal', action.open)
    case OPEN_SAVE_DESIGN_ACTION: {
      if (action.open) {
        return state.merge({
          openSaveDesign: action.open,
          design: action.design
        })
      }

      return state.set('openSaveDesign', action.open)
    }
    case SET_DESIGN_NAME:
      return state.merge({ designName: action.param })
    case SAVE_DESIGN_ID:
      return state.merge({
        savedDesignId: action.id,
        designHasChanges: false,
        svgOutputUrl: action.svgUrl,
        savedDesign: action.design
      })
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
      const { el, typeEl, canvasObj } = action
      const canvas = state.get('canvas')
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')

      const lastStep = {
        type: Changes.Add,
        state: { id: el.id, type: typeEl, ...canvasObj }
      }

      const selectedElement = state.get('selectedElement')
      const updatedCanvas = canvas.setIn([typeEl, el.id], el)

      if (selectedElement) {
        return state.merge({
          canvas: updatedCanvas,
          undoChanges: undoChanges.unshift(lastStep),
          redoChanges: redoChanges.clear()
        })
      }

      return state.merge({
        selectedElement: el.id,
        canvas: updatedCanvas,
        designHasChanges: true,
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case REAPPLY_CANVAS_IMAGE_ACTION: {
      const { el } = action
      return state.setIn(['canvas', CanvasElements.Image, el.id], el)
    }
    case REMOVE_CANVAS_ELEMENT_ACTION: {
      const { id, typeEl, canvasObj } = action
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const canvas = state.get('canvas')
      const updatedCanvas = canvas.deleteIn([action.typeEl, action.id])

      const lastStep = {
        type: Changes.Delete,
        state: { id, type: typeEl, ...canvasObj }
      }

      return state.merge({
        canvas: updatedCanvas,
        selectedElement: '',
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case SET_SELECTED_ELEMENT_ACTION: {
      const { id, typeEl } = action
      const canvasElement = state.getIn(['canvas', typeEl, id])
      if (canvasElement && typeEl === CanvasElements.Text) {
        return state.merge({
          selectedElement: id,
          textFormat: canvasElement.textFormat,
          text: canvasElement.text
        })
      }

      const selectedElement = state.get('selectedElement')

      if (!id && selectedElement) {
        return state.merge({
          text: '',
          selectedElement: id,
          searchClipParam: ''
        })
      }

      return state.merge({ selectedElement: id, searchClipParam: '' })
    }
    case SET_TEXT_FORMAT_ACTION: {
      const { key, value } = action
      const selectedElement = state.get('selectedElement')
      if (selectedElement) {
        const canvas = state.get('canvas')
        const element = canvas.getIn(['text', selectedElement])
        if (element) {
          const undoChanges = state.get('undoChanges')
          const redoChanges = state.get('redoChanges')
          const newFormat = {
            ...element.textFormat,
            [key]: value
          }
          const lastStep = {
            type: Changes.CanvasStyle,
            state: {
              id: selectedElement,
              type: CanvasElements.Text,
              newFormat,
              oldFormat: element.textFormat
            }
          }

          const updatedCanvas = canvas.setIn(['text', selectedElement], {
            ...element,
            textFormat: newFormat
          })

          return state.merge({
            canvas: updatedCanvas,
            textFormat: newFormat,
            undoChanges: undoChanges.unshift(lastStep),
            redoChanges: redoChanges.clear()
          })
        }
        return state
      }
      return state.setIn(['textFormat', key], value)
    }
    case SET_ART_FORMAT_ACTION: {
      const { key, value } = action
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const canvas = state.get('canvas')
      const selectedElement = state.get('selectedElement')
      const element = canvas.getIn(['path', selectedElement])

      const lastStep = {
        type: Changes.CanvasStyle,
        state: {
          id: selectedElement,
          type: CanvasElements.Path,
          newFormat: { ...element, [key]: value },
          oldFormat: { ...element }
        }
      }

      const updatedCanvas = canvas.setIn(['path', selectedElement], {
        ...element,
        [key]: value
      })

      return state.merge({
        canvas: updatedCanvas,
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
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
    case OPEN_OUT_WITHOUT_SAVE_MODAL:
      return state.merge({
        openOutWithoutSaveModal: action.open,
        routeToGoWithoutSave: action.route
      })
    case SET_CUSTOMIZE_3D_MOUNTED:
      return state.set('customize3dMounted', action.mounted)
    case SET_CANVAS_JSON_ACTION:
      return state.setIn(['design', 'canvasJson'], action.canvas)
    case CANVAS_ELEMENT_RESIZED_ACTION: {
      const { element } = action
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const lastStep = { type: Changes.Resize, state: { ...element } }

      if (ElementsToApplyScale.includes(element.elementType)) {
        const { id, scaleY, scaleX } = element
        const canvas = state.get('canvas')
        const updatedCanvas = canvas.updateIn(
          [element.elementType, id],
          (canvasEl: any) => {
            const updatedCanvasEl = Object.assign({ scaleX, scaleY }, canvasEl)
            updatedCanvasEl.scaleX = scaleX
            updatedCanvasEl.scaleY = scaleY
            return updatedCanvasEl
          }
        )
        return state.merge({
          canvas: updatedCanvas,
          undoChanges: undoChanges.unshift(lastStep),
          redoChanges: redoChanges.clear()
        })
      }

      return state.merge({
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case CANVAS_ELEMENT_DRAGGED_ACTION: {
      const { element } = action
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const lastStep = { type: Changes.Drag, state: { ...element } }

      return state.merge({
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case CANVAS_ELEMENT_ROTATED_ACTION: {
      const { element } = action
      const undoChanges = state.get('undoChanges')
      const redoChanges = state.get('redoChanges')
      const lastStep = { type: Changes.Rotate, state: { ...element } }

      return state.merge({
        undoChanges: undoChanges.unshift(lastStep),
        redoChanges: redoChanges.clear()
      })
    }
    case UPLOAD_FILE_ACTION_SUCCESS: {
      const images = state.get('images')
      const updatedImages = images.push(action.url)
      return state.merge({
        uploadingFile: false,
        images: updatedImages
      })
    }
    case CANVAS_ELEMENT_TEXT_CHANGED: {
      const { newText, oldText } = action
      const selectedElement = state.get('selectedElement')
      if (selectedElement) {
        const canvas = state.get('canvas')
        const element = canvas.getIn(['text', selectedElement])
        if (element) {
          const undoChanges = state.get('undoChanges')
          const redoChanges = state.get('redoChanges')
          const lastStep = {
            type: Changes.ChangeText,
            state: {
              id: selectedElement,
              oldText,
              newText
            }
          }
          const updatedCanvas = canvas.setIn(['text', selectedElement], {
            ...element,
            text: newText
          })

          return state.merge({
            canvas: updatedCanvas,
            undoChanges: undoChanges.unshift(lastStep),
            redoChanges: redoChanges.clear()
          })
        }
      }
      return state
    }
    case SET_UPLOADING_FILE_ACTION:
      return state.set('uploadingFile', action.isUploading)
    case SET_SEARCH_CLIPARTPARAM:
      return state.set('searchClipParam', action.param)
    case SET_EDIT_DESIGN_CONFIG_ACTION: {
      const { colors, accessoriesColor } = action
      const {
        bindingColor,
        zipperColor,
        bibBraceColor,
        flatlockColor,
        flatlockCode
      } = accessoriesColor
      const stitchingColor = { name: flatlockCode, value: flatlockColor }
      return state.merge({
        colors: colors,
        styleColors: colors,
        stitchingColor: fromJS(stitchingColor),
        bindingColor,
        zipperColor,
        bibColor: bibBraceColor
        // TODO: Set these fields
        // styleId
        // savedDesignId
      })
    }
    default:
      return state
  }
}

export default designCenterReducer

const addCanvasElement = (state: any, canvasToAdd: Change) => {
  const canvas = state.get('canvas')
  const {
    state: { src, style, type: canvasType, id }
  } = canvasToAdd
  const canvasObject: any = { id }
  switch (canvasType) {
    case CanvasElements.Text:
      canvasObject.text = src
      canvasObject.textFormat = style
      break
    case CanvasElements.Path:
      canvasObject.fill = style.fill || '#000000'
      canvasObject.stroke = style.stroke || '#000000'
      canvasObject.strokeWidth = style.strokeWidth || 0
      break
    case CanvasElements.Image:
    default:
      return canvas
  }
  const updatedCanvas = canvas.setIn([canvasType, id], canvasObject)
  return updatedCanvas
}

const changeStyleCanvasElement = (
  state: any,
  styleCanvas: Change,
  newStyle = false
) => {
  const canvas = state.get('canvas')
  const {
    state: { type: canvasType, id, newFormat, oldFormat }
  } = styleCanvas
  const format = newStyle ? newFormat : oldFormat
  switch (canvasType) {
    case CanvasElements.Path:
      return canvas.setIn([canvasType, id], { ...format })
    case CanvasElements.Text:
      const canvasElement = canvas.getIn([canvasType, id])
      return canvas.setIn([canvasType, id], {
        ...canvasElement,
        textFormat: newFormat
      })
    default:
      return state
  }
}

const changeTextCanvasElement = (
  state: any,
  textChange: Change,
  newTextToApply = false
) => {
  const canvas = state.get('canvas')
  const {
    state: { id, oldText, newText }
  } = textChange
  const text = newTextToApply ? newText : oldText
  const canvasElement = canvas.getIn([CanvasElements.Text, id])
  return canvas.setIn([CanvasElements.Text, id], { ...canvasElement, text })
}
