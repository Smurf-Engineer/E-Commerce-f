/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tabs from './Tabs'
import Render3D from './Render3D'
import Spin from 'antd/lib/spin'
import InfoModal from '../../components/InfoModal'
import Message from 'antd/lib/message'
import MobileSelectColors from './MobileSelectColors'
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
  SelectedAsset,
  Responsive,
  SimpleFont,
  UserInfo,
  ModelVariant,
  PositionSize
} from '../../types/common'
import backIcon from '../../assets/leftarrow.svg'
import artIcon from '../../assets/art-icon.svg'
import PROAssistButton from '../../assets/PROAssist-button.svg'
import saveIcon from '../../assets/save-icon.svg'
import {
  Container,
  LoadingContainer,
  MobileToolBar,
  MobileTitle,
  MobileItem,
  ActionMobileItems,
  ButtonText,
  ButtonImg,
  BackCircle,
  BackIcon
} from './styledComponents'
import {
  DesignTabs,
  CanvasElements
} from '../../screens/DesignCenter/constants'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import { PREDYED_TRANSPARENT } from '../../constants'

const SVG_FILE = 'image/svg+xml'
const POSCRIPT_FILE = 'application/postscript'
const PDF_FILE = 'application/pdf'

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
  videos: object[]
  text: string
  productName: string
  canvas: CanvasType
  selectedElement: string
  bindingName: string
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
  responsive: Responsive
  callbackToSave: boolean
  loggedUserId: string
  infoModalOpen: boolean
  saveAndBuy: boolean
  selectedTab: number
  fonts: SimpleFont[]
  colorsList: any
  userEmail: string
  name: string
  lastName: string
  designId: string
  proAssistId: string
  selectedVariant: number
  variants: ModelVariant[]
  placeholders: boolean
  openResetPlaceholderModal: boolean
  colorChartSending: boolean
  colorChartModalOpen: boolean
  colorChartModalFormOpen: boolean
  tutorialPlaylist: string
  userCode: string
  selectedPredyed: string
  showGuidelines: boolean
  previewImage: string
  openPreviewModal: boolean
  // Redux actions
  onClickGuides: () => void
  openPreview: () => void
  selectVariantAction: (index: number) => void
  onUploadFile: (file: any) => void
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string, name: string) => void
  setStitchingColorAction: (color: StitchingColor) => void
  setPredyedColor: (predyedColor: string) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onLoadModel: (loading: boolean) => void
  onUndoAction: () => void
  setVideos: (videos: object[]) => void
  onRedoAction: () => void
  onResetAction: () => void
  onClearAction: () => void
  onPressQuickView: () => void
  onOpenSaveDesign: (
    open: boolean,
    imageBase64: string,
    automaticSave?: boolean
  ) => void
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
  onSelectTextFormat: (
    key: string,
    value: string | number,
    fontStyle: boolean
  ) => void
  onSelectArtFormat: (key: string, value: string | number) => void
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
  openResetDesignModalAction: (open: boolean) => void
  openResetPlaceholderModalAction: (open: boolean) => void
  setCustomize3dMountedAction: (mounted: boolean) => void
  onUnmountTab: (mounted: string) => void
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
  setSearchClipParamAction: (searchParam: string) => void
  onCanvasElementResized: (element: CanvasResized) => void
  onCanvasElementDragged: (element: CanvasDragged) => void
  onCanvasElementRotated: (element: CanvasRotated) => void
  onCanvasElementTextChanged: (oldText: string, newText: string) => void
  onReApplyImageEl: (el: CanvasElement) => void
  onSelectedItem: (item: SelectedAsset, name?: string) => void
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
  openLoginModalAction: (open: boolean, callback?: boolean) => void
  handleOnGoBack: () => void
  handleOnCloseInfo: () => void
  handleOnSaveAndBuy: (buy: boolean) => void
  onTabClick: (selectedIndex: number) => void
  onLockElement: (id: string, type: string) => void
  onRequestColorChart: (userInfo: UserInfo) => void
  onCloseColorChart: () => void
  onCloseColorChartForm: () => void
  onOpenFormChart: () => void
  onOpenColorChart: () => void
  openDesignCheckModal: () => void
}

class DesignCenterCustomize extends React.PureComponent<Props> {
  render3D: any
  componentWillReceiveProps(nextProps: any) {
    const { callbackToSave, loggedUserId, isUserAuthenticated } = nextProps
    if (
      callbackToSave &&
      loggedUserId &&
      loggedUserId !== this.props.loggedUserId &&
      isUserAuthenticated
    ) {
      setTimeout(() => this.handleOnSave, 500)
    }
    const { handleOnSaveAndBuy } = this.props
    const { saveAndBuy } = nextProps
    if (saveAndBuy) {
      handleOnSaveAndBuy(false)
      this.render3D.takeDesignPicture(true)
    }
  }

  render() {
    const {
      onSelectColorBlock,
      colorBlock,
      bindingName,
      colorBlockHovered,
      onSelectColor,
      setStitchingColorAction,
      setPredyedColor,
      onSelectPalette,
      onChangePaletteName,
      paletteName,
      palettes,
      onSetPalettes,
      currentTab,
      colors,
      styleColors,
      currentStyle,
      videos,
      selectedPredyed,
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
      userCode,
      onSelectEl,
      onRemoveEl,
      onApplyCanvasEl,
      selectedElement,
      textFormat,
      artFormat,
      design,
      selectVariantAction,
      onSelectTextFormat,
      openPaletteModalAction,
      myPaletteModals,
      openResetDesignModal,
      openResetDesignModalAction,
      openResetPlaceholderModalAction,
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
      selectedVariant,
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
      openPreview,
      designHasChanges,
      isUserAuthenticated,
      isEditing,
      onSetEditConfig,
      onSetCanvasObject,
      originalPaths,
      onResetEditing,
      onSelectedItem,
      onClickGuides,
      selectedItem,
      isMobile,
      responsive,
      handleOnGoBack,
      handleOnCloseInfo,
      userEmail,
      name,
      lastName,
      designId,
      loggedUserId,
      proAssistId,
      infoModalOpen,
      selectedTab,
      onTabClick,
      setVideos,
      onLockElement,
      openLoginModalAction,
      fonts,
      variants,
      colorsList,
      showGuidelines,
      placeholders,
      previewImage,
      openPreviewModal,
      openResetPlaceholderModal,
      onRequestColorChart,
      colorChartSending,
      colorChartModalOpen,
      colorChartModalFormOpen,
      onCloseColorChart,
      onCloseColorChartForm,
      onOpenFormChart,
      onOpenColorChart,
      tutorialPlaylist,
      openDesignCheckModal
    } = this.props
    const showRender3d = currentTab === DesignTabs.CustomizeTab && !swipingView
    const loadingView = loadingData && (
      <LoadingContainer>
        <Spin />
      </LoadingContainer>
    )
    const activeEl = this.getActiveElement()
    const layers = this.getLayers()

    return (
      <Container className={isMobile ? 'column' : ''}>
        {!isMobile && (
          <Tabs
            {...{
              palettes,
              bindingName,
              colorBlock,
              activeEl,
              colorBlockHovered,
              onSelectColorBlock,
              onHoverColorBlock,
              videos,
              selectedPredyed,
              setVideos,
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
              layers,
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
              selectedItem,
              selectedTab,
              onTabClick,
              onLockElement,
              openLoginModalAction,
              fonts,
              colorsList,
              onRequestColorChart,
              colorChartSending,
              colorChartModalOpen,
              colorChartModalFormOpen,
              onCloseColorChart,
              onCloseColorChartForm,
              onOpenFormChart,
              onOpenColorChart,
              tutorialPlaylist
            }}
            hoverBlurLayer={this.hoverBlurLayer}
            moveLayer={this.moveLayer}
            onDeleteLayer={this.onDeleteLayer}
            onSelectEl={this.setSelectedLayer}
            onPositionChange={this.handleApplyPosition}
            onSelectPredyed={setPredyedColor}
            onSelectStitchingColor={setStitchingColorAction}
            onApplyText={this.handleOnApplyText}
            onApplyImage={this.handleOnApplyImage}
            onApplyArt={this.handleOnApplyArt}
            disableTooltip={responsive.tablet}
          />
        )}
        {isMobile && (
          <MobileToolBar>
            <BackCircle className={'customizeTab'} onClick={handleOnGoBack}>
              <BackIcon src={backIcon} />
            </BackCircle>
            <MobileTitle>{productName}</MobileTitle>
            <ActionMobileItems>
              {!proAssistId &&
                <MobileItem wide={true} onClick={openDesignCheckModal}>
                  <ButtonImg src={PROAssistButton} />
                  <ButtonText secondary={true}>
                    <FormattedMessage
                      {...messages.proAssist}
                      values={{
                        proLabel: <b>{formatMessage(messages.proLabel)}</b>
                      }}
                    />
                  </ButtonText>
                </MobileItem>
              }
              <MobileItem onClick={this.handleOnAddArt}>
                <ButtonImg src={artIcon} />
                <ButtonText>{formatMessage({ ...messages.addArt })}</ButtonText>
              </MobileItem>
              <MobileItem onClick={this.handleOnSave}>
                <ButtonImg src={saveIcon} />
                <ButtonText>{formatMessage({ ...messages.save })}</ButtonText>
              </MobileItem>
            </ActionMobileItems>
          </MobileToolBar>
        )}
        {showRender3d && !loadingData ? (
          <Render3D
            ref={render3D => (this.render3D = render3D)}
            openLoginAction={this.handleOnOpenLogin}
            showBranding={selectedPredyed !== PREDYED_TRANSPARENT}
            {...{
              text,
              loggedUserId,
              designId,
              proAssistId,
              openPreview,
              userEmail,
              name,
              lastName,
              colors,
              previewImage,
              openPreviewModal,
              onClickGuides,
              showGuidelines,
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
              onTabClick,
              onRemoveEl,
              openResetDesignModal,
              openResetDesignModalAction,
              openResetPlaceholderModalAction,
              setCustomize3dMountedAction,
              onUnmountTab,
              undoChanges,
              redoChanges,
              selectVariantAction,
              selectedVariant,
              variants,
              product,
              userCode,
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
              isUserAuthenticated,
              responsive,
              placeholders,
              openResetPlaceholderModal,
              openDesignCheckModal
            }}
          />
        ) : (
            loadingView
          )}
        {isMobile && !loadingData && showRender3d && !loadingModel && (
          <MobileSelectColors
            onSelectStitchingColor={setStitchingColorAction}
            onSelectPredyed={setPredyedColor}
            {...{
              formatMessage,
              onSelectColorBlock,
              onSelectPalette,
              colorBlock,
              bindingName,
              onSelectColor,
              colors,
              styleColors,
              stitchingColor,
              selectedPredyed,
              bindingColor,
              zipperColor,
              bibColor,
              onAccessoryColorSelected,
              product,
              colorsList
            }}
          />
        )}
        <InfoModal
          open={infoModalOpen}
          formatMessage={formatMessage}
          title={messages.unsupportedDeviceTitle}
          text={messages.unsupportedDeviceContent}
          extraContent={messages.unsupportedDeviceExtraContent}
          buttonText={messages.unsupportedDeviceButton}
          requestClose={handleOnCloseInfo}
        />
      </Container>
    )
  }

  getActiveElement = () => {
    const { selectedElement } = this.props
    let activeEl = {}
    if (selectedElement && this.render3D) {
      const active = this.render3D.getElementById(selectedElement, true)
      const { top = 0, left = 0, angle = 0, width = 1, height = 1 } = active
      activeEl = {
        height,
        width,
        horizontal: left,
        vertical: top,
        rotation: angle
      }
    }
    return activeEl
  }

  hoverBlurLayer = (id: string, hover: boolean) => {
    if (this.render3D) {
      this.render3D.hoverBlur(id, hover)
      this.forceUpdate()
    }
  }

  moveLayer = (id: string, index: number) => {
    if (this.render3D) {
      this.render3D.changeLayerIndex(id, index)
      this.forceUpdate()
    }
  }

  getLayers = () => {
    const { canvas } = this.props
    const layers = this.render3D
      ? this.render3D.getLayersIndexed(canvas)
      : {
        image: {},
        path: {},
        text: {}
      }
    return layers
  }

  handleOnSave = () => {
    this.render3D.takeDesignPicture()
  }
  handleOnAddArt = () => {
    const { handleOnCloseInfo } = this.props
    handleOnCloseInfo()
  }

  handleOnOpenLogin = () => {
    const { openLoginModalAction, formatMessage } = this.props
    Message.warning(formatMessage(messages.invalidUser))
    openLoginModalAction(true, true)
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
    if (
      file.type === SVG_FILE ||
      file.type === PDF_FILE ||
      file.type === POSCRIPT_FILE
    ) {
      this.render3D.applyCanvasEl({
        file,
        type: CanvasElements.Group,
        isImage: true
      })
    } else {
      this.render3D.applyCanvasEl({ file, type: CanvasElements.Image, isImage: true })
    }
    onSelectedItem({ id: file.id, type: CanvasElements.Image })
  }

  handleOnApplyArt = (
    url: string,
    style?: CanvasElement,
    fileId?: number,
    name?: string
  ) => {
    const { selectedElement, canvas, onSelectedItem } = this.props
    if (!!canvas.path[selectedElement]) {
      this.render3D.applyClipArt(url, style)
    } else {
      this.render3D.applyCanvasEl({
        url,
        style,
        type: CanvasElements.Path,
        fileId
      })
      onSelectedItem({ id: fileId, type: CanvasElements.Path }, name || '')
    }
  }

  setSelectedLayer = (id: string, type?: string) => {
    if (this.render3D) {
      this.render3D.setSelectedLayer(id, type)
    }
  }

  onDeleteLayer = (id: string) => {
    if (this.render3D) {
      this.render3D.deleteLayer(id)
    }
  }

  handleApplyPosition = (data: PositionSize, type: string) => {
    const { selectedElement } = this.props
    if (selectedElement && this.render3D) {
      this.render3D.applyPosition(data, type)
      this.forceUpdate()
    }
  }
}

export default DesignCenterCustomize
