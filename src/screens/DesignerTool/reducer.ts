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
  UPDATE_THEME_NAME_ACTION,
  OPEN_SAVE_DESIGN_ACTION,
  SET_SAVING_DESIGN,
  SET_GOOGLE_FONTS,
  ADD_FONT_ACTION,
  UPDATE_SEARCH_TEXT_ACTION,
  SET_UPLOADING_COLORS_ACTION,
  UPLOADING_SYMBOL_ACTION,
  SET_SEARCH_CLIPARTPARAM,
  SET_LOADED_CANVAS_ACTION,
  CanvasElements,
  SET_STYLE_MODE_ACTION,
  Mode,
  SET_SELECTED_ELEMENT_ACTION,
  CustomizeTabs,
  BLACK,
  WHITE,
  CANVAS_ELEMENT_DRAGGED_ACTION,
  CANVAS_ELEMENT_RESIZED_ACTION,
  CANVAS_ELEMENT_DUPLICATED_ACTION,
  ElementsToApplyScale,
  SET_TEXT_ACTION,
  SET_CANVAS_ELEMENT_ACTION,
  SET_SELECTED_ITEM_ACTION,
  CANVAS_ELEMENT_TEXT_CHANGED,
  SET_TEXT_FORMAT_ACTION,
  SET_CANVAS_JSON_ACTION,
  SET_CUSTOMIZE_3D_MOUNTED,
  SET_EDIT_DESIGN_CONFIG_ACTION,
  DESIGN_RESET_EDITING_ACTION,
  REAPPLY_CANVAS_IMAGE_ACTION,
  Changes,
  SET_ART_FORMAT_ACTION,
  ON_TAB_CLICK_ACTION,
  UPDATE_COLOR_IDEAS_LIST
} from './constants'
import { BLACK as BLACK_COLOR } from '../../theme/colors'
import { Reducer } from '../../types/common'

export const NONE = -1
export const NONE_ID = 0
export const DESIGN_THUMBNAIL = -1
export const DESIGN_COLORS = -2
import { DEFAULT_FONT } from '../../constants'

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
  themes: [],
  openSaveDesign: false,
  saveDesignLoading: false,
  fonts: [],
  visibleFonts: [],
  searchText: '',
  uploadingColors: false,
  uploadingStitchingColors: false,
  uploadingSymbol: false,
  searchClipParam: '',
  styleMode: Mode.Style,
  selectedElement: '',
  text: '',
  textFormat: {
    fontFamily: DEFAULT_FONT,
    stroke: BLACK,
    fill: BLACK,
    strokeWidth: 0,
    textAlign: 'left',
    charSpacing: 0,
    fontSize: 30,
    lineHeight: 1
  },
  selectedTab: CustomizeTabs.ProductTab,
  designHasChanges: false,
  canvas: {
    text: {},
    image: {},
    path: {}
  },
  selectedItem: {},
  customize3dMounted: false,
  undoChanges: [],
  redoChanges: [],
  stitchingColor: { name: 'FSC-10', value: BLACK_COLOR },
  bindingColor: BLACK,
  zipperColor: BLACK,
  bibColor: WHITE
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
        colors: List.of(...reverse(colors)),
        styleMode: Mode.Style
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
      return state.merge({
        selectedTheme: action.id,
        selectedStyle: 0
      })
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
      return state.merge({
        designConfig: state.get('designConfig').clear(),
        openSaveDesign: false,
        saveDesignLoading: false
      })
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
    case OPEN_SAVE_DESIGN_ACTION:
      return state.set('openSaveDesign', action.open)
    case SET_SAVING_DESIGN: {
      return state.set('saveDesignLoading', action.saving)
    }
    case SET_GOOGLE_FONTS: {
      const {
        data: { items }
      } = action
      const fonts = items.map((item: any) => item.family)
      return state.set('fonts', fromJS(fonts))
    }
    case ADD_FONT_ACTION: {
      return state.set(
        'visibleFonts',
        state.get('visibleFonts').push({ font: action.font })
      )
    }
    case UPDATE_SEARCH_TEXT_ACTION:
      return state.set('searchText', action.text)
    case SET_UPLOADING_COLORS_ACTION: {
      const keyName =
        action.listType === 'colors'
          ? 'uploadingColors'
          : 'uploadingStitchingColors'
      return state.set(keyName, action.isUploading)
    }
    case UPLOADING_SYMBOL_ACTION:
      return state.set('uploadingSymbol', action.isLoading)
    case SET_SEARCH_CLIPARTPARAM:
      return state.set('searchClipParam', action.param)
    case SET_LOADED_CANVAS_ACTION: {
      const { paths, canvas } = action
      const updatedCanvas = getCanvas(canvas)
      return state.merge({
        canvas: updatedCanvas,
        originalPaths: paths
      })
    }
    case SET_STYLE_MODE_ACTION:
      return state.set('styleMode', action.mode)
    case SET_SELECTED_ELEMENT_ACTION: {
      const { id, typeEl } = action
      const canvasElement = state.getIn(['canvas', typeEl, id])
      if (canvasElement && typeEl === CanvasElements.Text) {
        return state.merge({
          selectedElement: id,
          textFormat: canvasElement.textFormat,
          text: canvasElement.text,
          selectedTab: CustomizeTabs.TextTab
        })
      }

      const selectedElement = state.get('selectedElement')

      if (!id && selectedElement) {
        return state.merge({
          text: '',
          selectedElement: id,
          searchClipParam: '',
          textFormat: {
            fontFamily: DEFAULT_FONT,
            stroke: BLACK,
            fill: BLACK,
            strokeWidth: 0,
            textAlign: 'left',
            charSpacing: 0,
            fontSize: 30,
            lineHeight: 1
          }
        })
      }
      return state.merge({
        selectedElement: id,
        searchClipParam: '',
        selectedTab: CustomizeTabs.SymbolTab
      })
    }
    case CANVAS_ELEMENT_DRAGGED_ACTION: {
      return state.merge({
        designHasChanges: true
      })
    }
    case CANVAS_ELEMENT_RESIZED_ACTION: {
      const { element } = action
      if (ElementsToApplyScale.includes(element.elementType)) {
        const { id: idElement, scaleY, scaleX } = element
        const canvas = state.get('canvas')
        const updatedCanvas = canvas.updateIn(
          [element.elementType, idElement],
          (canvasEl: any) => {
            const updatedCanvasEl = Object.assign({ scaleX, scaleY }, canvasEl)
            updatedCanvasEl.scaleX = scaleX
            updatedCanvasEl.scaleY = scaleY
            return updatedCanvasEl
          }
        )
        return state.merge({
          canvas: updatedCanvas,
          designHasChanges: true
        })
      }
      return state
    }
    case CANVAS_ELEMENT_DUPLICATED_ACTION: {
      const { canvasEl, elementType, oldId } = action
      const { id, originalId } = canvasEl
      const canvas = state.get('canvas')
      const canvasToClone = canvas.getIn([elementType, originalId])
      const updatedCanvas = canvas.setIn([elementType, id], {
        ...canvasToClone,
        id
      })
      if (oldId) {
        return state.merge({
          canvas: updatedCanvas,
          selectedElement: '',
          designHasChanges: true
        })
      }
      return state.merge({
        canvas: updatedCanvas,
        selectedElement: '',
        designHasChanges: true
      })
    }
    case SET_TEXT_ACTION:
      return state.set('text', action.text)
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
          selectedElement: el.id,
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
    case SET_SELECTED_ITEM_ACTION:
      return state.set('selectedItem', action.item)
    case CANVAS_ELEMENT_TEXT_CHANGED: {
      const { newText } = action
      const selectedElement = state.get('selectedElement')
      if (selectedElement) {
        const canvas = state.get('canvas')
        const element = canvas.getIn(['text', selectedElement])
        if (element) {
          const updatedCanvas = canvas.setIn(['text', selectedElement], {
            ...element,
            text: newText
          })

          return state.merge({
            canvas: updatedCanvas,
            designHasChanges: true
          })
        }
      }
      return state
    }
    case SET_TEXT_FORMAT_ACTION: {
      const { key, value } = action
      const selectedElement = state.get('selectedElement')
      if (selectedElement) {
        const canvas = state.get('canvas')
        const element = canvas.getIn(['text', selectedElement])
        if (element) {
          const newFormat = {
            ...element.textFormat,
            [key]: value
          }

          const updatedCanvas = canvas.setIn(['text', selectedElement], {
            ...element,
            textFormat: newFormat
          })

          return state.merge({
            canvas: updatedCanvas,
            textFormat: newFormat,
            designHasChanges: true
          })
        }
        return state
      }
      return state.setIn(['textFormat', key], value)
    }
    case SET_CANVAS_JSON_ACTION:
      return state.setIn(['design', 'canvasJson'], action.canvas)
    case SET_CUSTOMIZE_3D_MOUNTED:
      return state.set('customize3dMounted', action.mounted)
    case SET_EDIT_DESIGN_CONFIG_ACTION: {
      const { colors, accessoriesColor, savedDesignId } = action
      const {
        bindingColor,
        zipperColor,
        bibBraceColor,
        flatlockColor,
        flatlockCode
      } = accessoriesColor
      const stitchingColor = { name: flatlockCode, value: flatlockColor }
      return state.merge({
        loadingModel: true,
        colors: colors,
        styleColors: colors,
        stitchingColor: fromJS(stitchingColor),
        bindingColor,
        zipperColor,
        bibColor: bibBraceColor,
        savedDesignId
      })
    }
    case DESIGN_RESET_EDITING_ACTION: {
      const { canvas, accessoriesColor } = action
      const updatedCanvas = getCanvas(canvas)
      const colors = state.get('styleColors')
      const {
        bindingColor,
        zipperColor,
        bibBraceColor: bibColor,
        flatlockColor,
        flatlockCode
      } = accessoriesColor
      const stitchingColor = { name: flatlockCode, value: flatlockColor }
      return state.merge({
        canvas: updatedCanvas,
        colors,
        undoChanges: [],
        redoChanges: [],
        openResetDesignModal: false,
        designHasChanges: false,
        stitchingColor: fromJS(stitchingColor),
        bindingColor,
        zipperColor,
        bibColor
      })
    }
    case REAPPLY_CANVAS_IMAGE_ACTION: {
      const { el } = action
      return state.setIn(['canvas', CanvasElements.Image, el.id], el)
    }
    case SET_ART_FORMAT_ACTION: {
      const { key, value } = action
      const canvas = state.get('canvas')
      const selectedElement = state.get('selectedElement')
      const element = canvas.getIn(['path', selectedElement])

      const updatedCanvas = canvas.setIn(['path', selectedElement], {
        ...element,
        [key]: value
      })

      return state.merge({
        canvas: updatedCanvas,
        designHasChanges: true
      })
    }
    case ON_TAB_CLICK_ACTION:
      return state.set('selectedTab', action.selectedIndex)
    case UPDATE_COLOR_IDEAS_LIST:
      return state.set('colorIdeas', List.of(...action.colorIdeas))
    default:
      return state
  }
}

export default designerToolReducer

const getCanvas = (canvasToSet: any) => {
  const { text, path, image } = canvasToSet
  const textIds = Object.keys(text)
  const pathIds = Object.keys(path)
  const imageds = Object.keys(image)
  const canvas = fromJS({ text: {}, image: {}, path: {} })
  const updatedCanvas = canvas.withMutations((map: any) => {
    textIds.forEach(id => map.setIn([CanvasElements.Text, id], text[id]))
    pathIds.forEach(id => map.setIn([CanvasElements.Path, id], path[id]))
    imageds.forEach(id => map.setIn([CanvasElements.Image, id], image[id]))
  })
  return updatedCanvas
}
