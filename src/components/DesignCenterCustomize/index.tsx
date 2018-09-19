/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tabs from './Tabs'
import Render3D from './Render3D'
import Spin from 'antd/lib/spin'
import Message from 'antd/lib/message'
import {
  Palette,
  CanvasElement,
  TextFormat,
  CanvasType,
  MyPaletteDesignCenterModals,
  ArtFormat,
  SaveDesignType,
  Style,
  Change,
  Product,
  StitchingColor,
  AccesoryColor,
  ConfigCanvasObj,
  ImageFile,
  CanvasResized,
  CanvasDragged,
  CanvasRotated,
  AccessoriesColor,
  CanvasObjects,
  SelectedAsset
} from '../../types/common'
import { Container, LoadingContainer } from './styledComponents'
import {
  DesignTabs,
  CanvasElements
} from '../../screens/DesignCenter/constants'
import messages from './messages'

const SVG_FILE = 'image/svg+xml'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  paletteName: string
  palettes: Palette[]
  colors: string[]
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bibColor?: AccesoryColor
  styleColors: string[]
  currentStyle: Style
  loadingModel: boolean
  undoEnabled: boolean
  redoEnabled: boolean
  currentTab: number
  swipingView: boolean
  text: string
  productName: string
  canvas: CanvasType
  selectedElement: string
  textFormat: TextFormat
  artFormat: ArtFormat
  myPaletteModals: MyPaletteDesignCenterModals
  openResetDesignModal: boolean
  customize3dMounted: boolean // TODO: is necessary?
  design: SaveDesignType
  loadingData?: boolean
  undoChanges: Change[]
  redoChanges: Change[]
  product?: Product
  images: ImageFile[]
  uploadingFile: boolean
  searchClipParam: string
  designHasChanges: boolean
  isUserAuthenticated: boolean
  isEditing: boolean
  originalPaths: any[]
  selectedItem: SelectedAsset
  isMobile: boolean
  // Redux actions
  onUploadFile: (file: any) => void
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  setStitchingColorAction: (color: StitchingColor) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onLoadModel: (loading: boolean) => void
  onUndoAction: () => void
  onRedoAction: () => void
  onResetAction: () => void
  onClearAction: () => void
  onPressQuickView: () => void
  onOpenSaveDesign: (open: boolean, imageBase64: string) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  onUpdateText: (text: string) => void
  onApplyCanvasEl: (
    text: CanvasElement,
    typeEl: string,
    update?: boolean
  ) => void
  onRemoveEl: (id: string, typeEl: string, canvasObj: ConfigCanvasObj) => void
  onSelectEl: (id: string, typeEl: string) => void
  onSelectTextFormat: (key: string, value: string | number) => void
  onSelectArtFormat: (key: string, value: string | number) => void
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
  openResetDesignModalAction: (open: boolean) => void
  setCustomize3dMountedAction: (mounted: boolean) => void
  onUnmountTab: (mounted: string) => void
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
  setSearchClipParamAction: (searchParam: string) => void
  onCanvasElementResized: (element: CanvasResized) => void
  onCanvasElementDragged: (element: CanvasDragged) => void
  onCanvasElementRotated: (element: CanvasRotated) => void
  onCanvasElementTextChanged: (oldText: string, newText: string) => void
  onReApplyImageEl: (el: CanvasElement) => void
  onSelectedItem: (item: SelectedAsset) => void
  onCanvasElementDuplicated: (
    canvasEl: any,
    elementType: CanvasObjects,
    oldId?: string
  ) => void
  onSetCanvasObject: (el: CanvasType, paths: any[]) => void
  onResetEditing: (
    canvas: CanvasType,
    accessoriesColor?: AccessoriesColor
  ) => void
  onSetEditConfig: (
    colors: string[],
    accessoriesColor: AccessoriesColor,
    savedDesignId: string
  ) => void
  openLoginModalAction: (open: boolean) => void
}

class DesignCenterCustomize extends React.PureComponent<Props> {
  render3D: any
  render() {
    const {
      onSelectColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      setStitchingColorAction,
      onSelectPalette,
      onChangePaletteName,
      paletteName,
      palettes,
      onSetPalettes,
      currentTab,
      colors,
      styleColors,
      currentStyle,
      loadingModel,
      onLoadModel,
      onUndoAction,
      onRedoAction,
      onResetAction,
      onClearAction,
      onPressQuickView,
      undoEnabled,
      redoEnabled,
      swipingView,
      onOpenSaveDesign,
      onHoverColorBlock,
      formatMessage,
      text,
      onUpdateText,
      productName,
      canvas,
      onSelectEl,
      onRemoveEl,
      onApplyCanvasEl,
      selectedElement,
      textFormat,
      artFormat,
      design,
      onSelectTextFormat,
      openPaletteModalAction,
      myPaletteModals,
      openResetDesignModal,
      openResetDesignModalAction,
      setCustomize3dMountedAction,
      onSelectArtFormat,
      onUnmountTab,
      loadingData,
      undoChanges,
      redoChanges,
      product,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      onAccessoryColorSelected,
      onUploadFile,
      images,
      uploadingFile,
      searchClipParam,
      setSearchClipParamAction,
      onCanvasElementResized,
      onCanvasElementDragged,
      onCanvasElementRotated,
      onCanvasElementTextChanged,
      onReApplyImageEl,
      onCanvasElementDuplicated,
      designHasChanges,
      isUserAuthenticated,
      isEditing,
      onSetEditConfig,
      onSetCanvasObject,
      originalPaths,
      onResetEditing,
      onSelectedItem,
      selectedItem,
      isMobile
    } = this.props

    const showRender3d = currentTab === DesignTabs.CustomizeTab && !swipingView
    const loadingView = loadingData && (
      <LoadingContainer>
        <Spin />
      </LoadingContainer>
    )

    return (
      <Container>
        <Tabs
          {...{
            palettes,
            colorBlock,
            colorBlockHovered,
            onSelectColorBlock,
            onHoverColorBlock,
            onSelectColor,
            colors,
            styleColors,
            onSelectPalette,
            onChangePaletteName,
            paletteName,
            onSetPalettes,
            text,
            onUpdateText,
            formatMessage,
            productName,
            canvas,
            selectedElement,
            textFormat,
            artFormat,
            onSelectTextFormat,
            onSelectArtFormat,
            openPaletteModalAction,
            myPaletteModals,
            stitchingColor,
            bindingColor,
            zipperColor,
            bibColor,
            onAccessoryColorSelected,
            product,
            onUploadFile,
            images,
            uploadingFile,
            searchClipParam,
            setSearchClipParamAction,
            isUserAuthenticated,
            selectedItem
          }}
          onSelectStitchingColor={setStitchingColorAction}
          onApplyText={this.handleOnApplyText}
          onApplyImage={this.handleOnApplyImage}
          onApplyArt={this.handleOnApplyArt}
        />
        {showRender3d && !loadingData ? (
          <Render3D
            ref={render3D => (this.render3D = render3D)}
            openLoginAction={this.handleOnOpenLogin}
            {...{
              text,
              colors,
              design,
              colorBlockHovered,
              styleColors,
              onLoadModel,
              loadingModel,
              onUndoAction,
              onRedoAction,
              onResetAction,
              onClearAction,
              onPressQuickView,
              undoEnabled,
              redoEnabled,
              onOpenSaveDesign,
              formatMessage,
              currentStyle,
              productName,
              onApplyCanvasEl,
              onSelectEl,
              onRemoveEl,
              openResetDesignModal,
              openResetDesignModalAction,
              setCustomize3dMountedAction,
              onUnmountTab,
              undoChanges,
              redoChanges,
              product,
              stitchingColor,
              bindingColor,
              zipperColor,
              bibColor,
              onCanvasElementResized,
              onCanvasElementDragged,
              onCanvasElementRotated,
              onCanvasElementTextChanged,
              onReApplyImageEl,
              onCanvasElementDuplicated,
              designHasChanges,
              canvas,
              selectedElement,
              isEditing,
              onSelectPalette,
              onSetEditConfig,
              onSetCanvasObject,
              originalPaths,
              onResetEditing,
              onSelectedItem,
              isMobile,
              isUserAuthenticated
            }}
          />
        ) : (
          loadingView
        )}
      </Container>
    )
  }

  handleOnOpenLogin = () => {
    const { openLoginModalAction, formatMessage } = this.props
    Message.warning(formatMessage(messages.invalidUser))
    openLoginModalAction(true)
  }

  handleOnApplyText = (text: string, style: TextFormat) => {
    const { selectedElement, canvas } = this.props
    if (!!canvas.text[selectedElement]) {
      this.render3D.applyText(text, style)
    } else {
      this.render3D.applyCanvasEl({ text, style, type: CanvasElements.Text })
    }
  }

  handleOnApplyImage = (file: ImageFile) => {
    const { onSelectedItem } = this.props

    if (file.type === SVG_FILE) {
      this.render3D.applyCanvasEl({
        file,
        type: CanvasElements.Group
      })
    } else {
      this.render3D.applyCanvasEl({ file, type: CanvasElements.Image })
    }
    onSelectedItem({ id: file.id, type: CanvasElements.Image })
  }

  handleOnApplyArt = (url: string, style?: CanvasElement, fileId?: number) => {
    const { selectedElement, canvas, onSelectedItem } = this.props
    if (!!canvas.path[selectedElement]) {
      this.render3D.applyClipArt(url, style)
    } else {
      onSelectedItem({ id: fileId, type: CanvasElements.Path })
      this.render3D.applyCanvasEl({
        url,
        style,
        type: CanvasElements.Path,
        fileId
      })
    }
  }
}

export default DesignCenterCustomize
