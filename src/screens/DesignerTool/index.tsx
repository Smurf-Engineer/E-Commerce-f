/**
 * DesignerTool Screen - Created by david on 08/05/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import get from 'lodash/get'
import queryString from 'query-string'
import GoogleFontLoader, { Font } from 'react-google-font-loader'
import set from 'lodash/set'
import remove from 'lodash/remove'
import findIndex from 'lodash/findIndex'
import every from 'lodash/every'
import { connect } from 'react-redux'
import { injectIntl, InjectedIntl } from 'react-intl'
import CustomizeTab from './DesignCenterCustomize'
import {
  saveDesignMutation,
  uploadThumbnailMutation,
  createThemeMutation,
  deleteThemeMutation,
  deleteStyleMutation,
  deleteInspirationMutation,
  getFonts,
  saveStyleCanvas,
  getColorsQuery
} from './data'
import EditTheme from '../../components/ThemeModal'
import * as thunkActions from './thunkActions'
import { getProductFromCode } from './DesignCenterCustomize/data'
import * as designerToolActions from './actions'
import * as designerToolApi from './api'
import {
  ModelConfig,
  UploadFile,
  DesignConfig,
  MessagePayload,
  DesignObject,
  ModelDesign,
  Theme as ThemeInput,
  CanvasType,
  SelectedAsset,
  CanvasDragged,
  CanvasResized,
  CanvasRotated,
  CanvasObjects,
  ConfigCanvasObj,
  CanvasElement,
  Style,
  TextFormat,
  AccessoriesColor,
  Change
} from '../../types/common'

const { confirm } = Modal
const { uploadThemeImage } = designerToolApi

type Thumbnail = {
  style: {
    image: string
  }
}

type Design = {
  design: {
    message: string
  }
}

type Theme = {
  id: string
  name: string
  image: string
}

type DataTheme = {
  data: {
    theme: Theme
  }
}

interface Props {
  intl: InjectedIntl
  designConfig: DesignConfig[]
  colors: string[]
  styleColors: string[]
  areas: string[]
  location: any
  extraFiles: string[]
  colorBlock: number
  colorBlockHovered: number
  loadingModel: boolean
  uploadingFiles: boolean
  modelConfig: ModelConfig
  currentTab: number
  swipingView: boolean
  selectedTheme: number
  selectedStyle: number
  productCode: string
  themeName: string
  design: ModelDesign
  uploadingThumbnail: boolean
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  colorIdeaItem: number
  colorIdeas: DesignObject[]
  editableTheme: ThemeInput | null
  saveDesignLoading: boolean
  openSaveDesign: boolean
  fonts: string[]
  visibleFonts: any[]
  searchText: string
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  uploadingSymbol: boolean
  searchClipParam: string
  fontsData: any
  styleMode: string
  selectedItem: SelectedAsset
  selectedElement: string
  designHasChanges: boolean
  canvas: CanvasType
  text: string
  style: Style
  textFormat: TextFormat
  originalPaths: any[]
  undoChanges: Change[]
  redoChanges: Change[]
  selectedTab: number
  stitchingColor: string
  bindingColor: string
  zipperColor: string
  bibColor: string
  colorsList: any
  // Redux Actions
  setLoadingAction: (loading: boolean) => void
  setColorAction: (color: string) => void
  setColorBlockAction: (index: number) => void
  setHoverColorBlockAction: (index: number) => void
  uploadFilesAction: (files: any, areas: any, extra: any) => void
  uploadDesignAction: (areas: any, config: any) => void
  setUploadingAction: (loading: boolean) => void
  setCurrentTabAction: (index: number) => void
  setSwipingTabAction: (swiping: boolean) => void
  setSelectedThemeAction: (id: number) => void
  setSelectedStyleAction: (id: number) => void
  setDesignConfigAction: (config: DesignConfig) => void
  setInspirationColorAction: (index: number) => void
  setProductCodeAction: (code: string) => void
  setThemeNameAction: (name: string) => void
  setDesignNameAction: (name: string) => void
  setComplexityAction: (design: number, complexity: number) => void
  setThumbnailAction: (item: number, thumbnail: string) => void
  setUploadingThumbnailAction: (uploading: boolean) => void
  setUploadingSuccess: (config: ModelConfig) => void
  setModelAction: (
    config: ModelConfig,
    colorIdeas: DesignObject[],
    design: ModelDesign
  ) => void
  uploadThemeImage: (file: any) => void
  addExtraFileAction: (file: string) => void
  removeExtraFileAction: (index: number) => void
  toggleExtraColorAction: (color: string) => void
  saveDesignSuccessAction: () => void
  setColorIdeaItemAction: (item: number) => void
  deleteColorIdeaAction: (index: number) => void
  setColorIdeaNameAction: (
    name: string,
    updateColors: boolean,
    item?: number
  ) => void
  addColorIdeaAction: () => void
  setThemeToEditAction: (theme: Theme | null) => void
  updateThemeNameAction: (name: string) => void
  changeThemesPositionAction: (dragIndex: number, dropIndex: number) => void
  changeDesignsPositionAction: (dragIndex: number, dropIndex: number) => void
  // Apollo Mutations
  uploadThumbnail: (variables: {}) => Promise<Thumbnail>
  saveDesign: (variables: {}) => Promise<Design>
  createTheme: (variables: {}) => Promise<DataTheme>
  deleteTheme: (variables: {}) => Promise<MessagePayload>
  deleteStyle: (variables: {}) => Promise<MessagePayload>
  saveCanvas: (variables: {}) => Promise<MessagePayload>
  deleteInspiration: (variables: {}) => Promise<MessagePayload>
  openSaveDesignAction: (open: boolean) => void
  setSavingDesign: (saving: boolean) => void
  setGoogleFontsListAction: (data: any) => void
  addFontAction: (font: string) => void
  onUpdateSearchTextAction: (text: string) => void
  onUploadColorsListAction: (file: any, type: string) => void
  uploadSymbolAction: (file: any) => void
  setSearchClipParamAction: (param: string) => void
  getGoogleFonts: () => void
  setLoadedCanvasAction: (canvas: CanvasType, paths: any[]) => void
  setStyleModeAction: (mode: string) => void
  setSelectedElement: (id: string, typeEl: string) => void
  onCanvasElementDraggedAction: (element: CanvasDragged) => void
  onCanvasElementResizedAction: (element: CanvasResized) => void
  onCanvasElementRotatedAction: (element: CanvasRotated) => void
  onCanvasElementDuplicatedAction: (
    canvasEl: any,
    elementType: CanvasObjects,
    oldId?: string
  ) => void
  removeCanvasElement: (
    id: string,
    typeEl: string,
    canvasObj: ConfigCanvasObj
  ) => void
  setTextAction: (text: string) => void
  setCanvasElement: (
    text: CanvasElement,
    typeEl: string,
    update?: boolean,
    canvasObj?: ConfigCanvasObj
  ) => void
  setSelectedItemAction: (item: SelectedAsset) => void
  onCanvasElementTextChangedAction: (oldText: string, newText: string) => void
  setTextFormatAction: (key: string, value: string | number) => void
  setCanvasJsonAction: (canvas: string) => void
  setEditConfigAction: (
    colors: string[],
    accessoriesColor: AccessoriesColor,
    savedDesignId: string
  ) => void
  onResetEditingAction: (
    canvas: CanvasType,
    accessoriesColor?: AccessoriesColor
  ) => void
  onReApplyImageElementAction: (el: CanvasElement) => void
  setArtFormatAction: (key: string, value: string | number) => void
  onTabClickAction: (selectedIndex: number) => void
}

export class DesignerTool extends React.Component<Props, {}> {
  state = {
    themeImage: []
  }
  componentDidMount() {
    const { setProductCodeAction, location } = this.props
    const queryParams = queryString.parse(location.search)
    const code = get(queryParams, 'code', '')
    if (code) {
      setProductCodeAction(code)
    }
  }
  render() {
    const {
      intl: { formatMessage },
      colors,
      colorBlock,
      colorBlockHovered,
      setLoadingAction,
      loadingModel,
      setColorAction,
      setColorBlockAction,
      setHoverColorBlockAction,
      uploadFilesAction,
      uploadDesignAction,
      uploadingFiles,
      uploadingThumbnail,
      modelConfig,
      areas,
      setSelectedThemeAction,
      setSelectedStyleAction,
      setDesignConfigAction,
      setInspirationColorAction,
      designConfig,
      selectedTheme,
      selectedStyle,
      setProductCodeAction,
      productCode,
      themeName,
      design,
      extraFiles,
      bibBrace,
      zipper,
      binding,
      colorIdeaItem,
      setThemeNameAction,
      setDesignNameAction,
      setComplexityAction,
      setUploadingThumbnailAction,
      setModelAction,
      addExtraFileAction,
      removeExtraFileAction,
      toggleExtraColorAction,
      setColorIdeaItemAction,
      colorIdeas,
      setColorIdeaNameAction,
      addColorIdeaAction,
      setThemeToEditAction,
      editableTheme,
      updateThemeNameAction,
      changeThemesPositionAction,
      changeDesignsPositionAction,
      openSaveDesign,
      openSaveDesignAction,
      saveDesignLoading,
      setSavingDesign,
      setGoogleFontsListAction,
      fonts,
      addFontAction,
      visibleFonts,
      searchText,
      onUpdateSearchTextAction,
      onUploadColorsListAction,
      uploadingColors,
      uploadingStitchingColors,
      uploadSymbolAction,
      uploadingSymbol,
      searchClipParam,
      setSearchClipParamAction,
      getGoogleFonts,
      setLoadedCanvasAction,
      fontsData,
      setStyleModeAction,
      styleMode,
      styleColors,
      setSelectedElement,
      selectedItem,
      selectedElement,
      onCanvasElementDraggedAction,
      designHasChanges,
      canvas,
      onCanvasElementResizedAction,
      onCanvasElementRotatedAction,
      onCanvasElementDuplicatedAction,
      removeCanvasElement,
      setTextAction,
      text,
      setCanvasElement,
      onCanvasElementTextChangedAction,
      textFormat,
      setTextFormatAction,
      setSelectedItemAction,
      setCanvasJsonAction,
      originalPaths,
      setEditConfigAction,
      onResetEditingAction,
      onReApplyImageElementAction,
      undoChanges,
      redoChanges,
      setArtFormatAction,
      selectedTab,
      onTabClickAction,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      colorsList
    } = this.props
    const { themeImage } = this.state
    const fontList: Font[] = get(fontsData, 'fonts', [])

    const installedFonts = fontList.reduce<{ font: string }[]>(
      (fontObject, { active, family }: any) => {
        if (active) {
          fontObject.push({ font: family })
        }
        return fontObject
      },
      []
    )
    return (
      <div>
        {installedFonts.length ? (
          <GoogleFontLoader fonts={installedFonts} />
        ) : null}
        <CustomizeTab
          {...{
            colors,
            colorBlock,
            colorBlockHovered,
            loadingModel,
            uploadingFiles,
            areas,
            designConfig,
            themeImage,
            selectedTheme,
            selectedStyle,
            productCode,
            themeName,
            design,
            uploadingThumbnail,
            extraFiles,
            formatMessage,
            bibBrace,
            zipper,
            binding,
            colorIdeaItem,
            colorIdeas,
            openSaveDesignAction,
            saveDesignLoading,
            openSaveDesign,
            fonts,
            visibleFonts,
            searchText,
            uploadingColors,
            uploadingStitchingColors,
            uploadingSymbol,
            searchClipParam,
            setSearchClipParamAction,
            getGoogleFonts,
            styleMode,
            styleColors,
            selectedItem,
            selectedElement,
            designHasChanges,
            canvas,
            text,
            textFormat,
            installedFonts,
            originalPaths,
            undoChanges,
            redoChanges,
            selectedTab,
            stitchingColor,
            bindingColor,
            zipperColor,
            bibColor,
            colorsList
          }}
          onSetCanvasObject={setLoadedCanvasAction}
          onUpdateSearchText={onUpdateSearchTextAction}
          addFont={addFontAction}
          setGoogleFontsList={setGoogleFontsListAction}
          files={modelConfig}
          onEditColorIdea={setColorIdeaItemAction}
          onSaveDesign={this.handleOpenModal}
          setSavingDesign={setSavingDesign}
          onConfirmDesignToSave={this.handleSaveDesign}
          onSelectTheme={setSelectedThemeAction}
          onSelectStyle={setSelectedStyleAction}
          onDeleteTheme={this.handleOnDeleteTheme}
          onDeleteStyle={this.handleOnDeleteStyle}
          onDeleteInspiration={this.handleOnDeleteInspiration}
          onSelectImage={this.handleOnSelectThemeImage}
          onDeleteImage={this.handleOnDeleteThemeImage}
          onLoadModel={setLoadingAction}
          onSelectColorBlock={setColorBlockAction}
          onHoverColorBlock={setHoverColorBlockAction}
          onSelectColor={setColorAction}
          onUploadFiles={uploadFilesAction}
          onUploadDesign={uploadDesignAction}
          onSelectConfig={setDesignConfigAction}
          onSelectInspirationColor={setInspirationColorAction}
          onUpdateProductCode={setProductCodeAction}
          onUpdateThemeName={setThemeNameAction}
          onUpdateDesignName={setDesignNameAction}
          onSelectComplexity={setComplexityAction}
          onSaveThumbnail={this.handleUploadThumbnail}
          onUploadingThumbnail={setUploadingThumbnailAction}
          onLoadDesign={setModelAction}
          onAddExtraFile={addExtraFileAction}
          onRemoveExtraFile={removeExtraFileAction}
          onToggleColor={toggleExtraColorAction}
          onUpdateColorIdeaName={setColorIdeaNameAction}
          onAddColorIdea={addColorIdeaAction}
          onEditTheme={setThemeToEditAction}
          changeThemesPosition={changeThemesPositionAction}
          changeDesignsPosition={changeDesignsPositionAction}
          onUploadColorsList={onUploadColorsListAction}
          onUploadFile={uploadSymbolAction}
          setStyleMode={setStyleModeAction}
          onSelectEl={setSelectedElement}
          onCanvasElementDragged={onCanvasElementDraggedAction}
          onCanvasElementResized={onCanvasElementResizedAction}
          onCanvasElementRotated={onCanvasElementRotatedAction}
          onCanvasElementDuplicated={onCanvasElementDuplicatedAction}
          onRemoveEl={removeCanvasElement}
          onUpdateText={setTextAction}
          onApplyCanvasEl={setCanvasElement}
          onSelectedItem={setSelectedItemAction}
          onCanvasElementTextChanged={onCanvasElementTextChangedAction}
          onSelectTextFormat={setTextFormatAction}
          onUnmountTab={setCanvasJsonAction}
          onSetEditConfig={setEditConfigAction}
          onResetEditing={onResetEditingAction}
          onReApplyImageEl={onReApplyImageElementAction}
          onSelectArtFormat={setArtFormatAction}
          saveStyleCanvas={this.handleSaveStyleCanvas}
          onTabClick={onTabClickAction}
        />
        <EditTheme
          {...{ productCode }}
          theme={editableTheme}
          onCancel={this.handleOnCancel}
          onUpdateName={updateThemeNameAction}
        />
      </div>
    )
  }

  handleOnCancel = () => {
    const { setThemeToEditAction } = this.props
    setThemeToEditAction(null)
  }

  handleOnTransitionEnd = () => {
    const { setSwipingTabAction } = this.props
    setSwipingTabAction(false)
  }

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

  handleOnDeleteTheme = (id: number) => {
    confirm({
      title: 'Are you sure?',
      content:
        'If you remove this theme, all designs linked to it will be delete too.',
      onOk: async () => {
        try {
          const { deleteTheme, productCode } = this.props
          await deleteTheme({
            variables: { id },
            update: (store: any) => {
              const data = store.readQuery({
                query: getProductFromCode,
                variables: { code: productCode }
              })
              const themes = get(data, 'product.themes', [])
              const updatedThemes = remove(
                themes,
                ({ id: themeId }) => themeId !== id
              )
              set(data, 'product.themes', updatedThemes)
              store.writeQuery({
                query: getProductFromCode,
                data,
                variables: { code: productCode }
              })
            }
          })
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  handleOnDeleteStyle = async (id: number) => {
    confirm({
      title: 'Are you sure?',
      content: 'Design will be deleted.',
      onOk: async () => {
        try {
          const { deleteStyle, productCode, selectedTheme } = this.props
          await deleteStyle({
            variables: { id },
            update: (store: any) => {
              const data = store.readQuery({
                query: getProductFromCode,
                variables: { code: productCode }
              })
              const themes = get(data, 'product.themes', [])
              const themeIndex = findIndex(
                themes,
                ({ id: themeId }) => themeId === selectedTheme
              )
              const { styles } = themes[themeIndex]
              const updatedStyles = remove(
                styles,
                ({ id: styleId }) => styleId !== id
              )
              set(data, `product.themes[${themeIndex}].styles`, updatedStyles)
              store.writeQuery({
                query: getProductFromCode,
                data,
                variables: { code: productCode }
              })
            }
          })
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  handleOnDeleteInspiration = (id: number, index: number) => {
    confirm({
      title: 'Are you sure?',
      content: 'Color idea will be deleted.',
      onOk: async () => {
        const {
          deleteInspiration,
          productCode,
          selectedTheme,
          selectedStyle,
          deleteColorIdeaAction
        } = this.props
        if (!!id) {
          try {
            await deleteInspiration({
              variables: { id },
              update: (store: any) => {
                const data = store.readQuery({
                  query: getProductFromCode,
                  variables: { code: productCode }
                })
                const themes = get(data, 'product.themes', [])
                const themeIndex = findIndex(
                  themes,
                  ({ id: themeId }) => themeId === selectedTheme
                )
                const { styles } = themes[themeIndex]
                const styleIndex = findIndex(
                  styles,
                  ({ id: styleId }) => styleId === selectedStyle
                )
                const { colorIdeas } = styles[styleIndex]
                const updatedInspiration = remove(
                  colorIdeas,
                  ({ id: inspirationId }) => inspirationId !== id
                )
                set(
                  data,
                  `product.themes[${themeIndex}].styles[${styleIndex}].colorIdeas`,
                  updatedInspiration
                )
                store.writeQuery({
                  query: getProductFromCode,
                  data,
                  variables: { code: productCode }
                })
              }
            })
          } catch (e) {
            message.error(e.message)
          }
        }
        deleteColorIdeaAction(index)
      }
    })
  }

  handleOnSelectThemeImage = (file: UploadFile) => {
    this.setState({ themeImage: [file] })
  }

  handleOnDeleteThemeImage = () => {
    this.setState({ themeImage: [] })
  }

  handleUploadThumbnail = async (item: number, image: string) => {
    const {
      uploadThumbnail,
      setThumbnailAction,
      setUploadingThumbnailAction
    } = this.props
    try {
      const response = await uploadThumbnail({ variables: { image } })
      const thumbnailUrl = get(response, 'data.style.image', '')
      setThumbnailAction(item, thumbnailUrl)
    } catch (e) {
      setUploadingThumbnailAction(false)
      message.error(e.message)
    }
  }
  handleOpenModal = () => {
    const { openSaveDesignAction, productCode, modelConfig } = this.props
    if (!productCode) {
      message.error('Please enter a product code')
      return
    }
    if (!modelConfig) {
      message.error('Upload model files first')
      return
    }

    openSaveDesignAction(true)
  }
  handleSaveStyleCanvas = async (styleData: any) => {
    const {
      selectedStyle,
      uploadThumbnail,
      saveCanvas,
      setSavingDesign
    } = this.props
    const { canvasJson, designBase64 } = styleData
    setSavingDesign(true)
    try {
      const response = await uploadThumbnail({
        variables: { image: designBase64 }
      })
      const thumbnail = get(response, 'data.style.image', '')
      await saveCanvas({
        variables: { id: selectedStyle, data: { canvasJson, thumbnail } }
      })
      setSavingDesign(false)
      message.success('Placeholder design saved!')
    } catch (e) {
      setSavingDesign(false)
      message.error(e.message)
    }
  }
  handleSaveDesign = async () => {
    const { setSavingDesign } = this.props
    try {
      const {
        design,
        saveDesign,
        themeName,
        productCode,
        createTheme,
        modelConfig,
        colorIdeas,
        selectedTheme,
        saveDesignSuccessAction,
        openSaveDesignAction
      } = this.props

      if (!productCode) {
        message.error('Please enter a product code')
        return
      }

      if (!modelConfig) {
        message.error('Upload model files first')
        return
      }

      if (!design.name) {
        message.error('To proceed, enter design name first')
        return
      }

      if (!design.image) {
        message.error('To proceed, save design thumbnail first')
        return
      }

      setSavingDesign(true)
      const hasAllInspirationThumbnail = every(colorIdeas, 'image')
      if (!hasAllInspirationThumbnail) {
        message.error('Unable to find one or more color idea thumbnails')
        return
      }

      const hasAllInspirationName = every(colorIdeas, 'name')
      if (!hasAllInspirationName) {
        message.error('To proceed, enter all the color idea name')
        return
      }

      const {
        obj,
        mtl,
        label,
        bumpMap,
        flatlock,
        brandingPng,
        brandingSvg,
        areasSvg,
        areasPng,
        bibBraceWhite,
        bibBraceBlack,
        zipperWhite,
        zipperBlack,
        bindingWhite,
        bindingBlack,
        size
      } = modelConfig
      const inspiration = colorIdeas.map(item => ({
        id: item.id,
        name: item.name,
        colors: item.colors,
        image: item.image
      }))
      const designs: any = []
      const style = {
        colors: design.colors,
        image: design.image,
        name: design.name,
        branding: brandingSvg,
        brandingPng,
        svgs: areasSvg,
        pngs: areasPng,
        inspiration,
        width: size.width,
        height: size.height
      }

      designs.push(style)

      const { themeImage } = this.state
      let themeResponse = null
      const hasSelectedTheme = selectedTheme > 0
      if (!hasSelectedTheme && !!themeImage.length && !!themeName) {
        const responseImage = await uploadThemeImage(themeImage[0])
        if (!!responseImage) {
          const { image } = responseImage
          const theme = {
            image,
            name: themeName
          }
          themeResponse = await createTheme({ variables: { theme } })
        }
      }

      if (!themeResponse && !hasSelectedTheme) {
        message.error('Select a theme or create new one')
        return
      }

      const themeId = get(themeResponse, 'data.theme.id', selectedTheme)

      const model = {
        productCode,
        label,
        bumpMap,
        flatLock: flatlock,
        obj,
        mtl,
        bibBraceWhite,
        bibBraceBlack,
        zipperWhite,
        zipperBlack,
        bindingWhite,
        bindingBlack,
        theme_id: themeId,
        styles: designs
      }

      const saveResponse = await saveDesign({
        variables: { design: model },
        refetchQueries: [
          { query: getProductFromCode, variables: { code: productCode } }
        ]
      })

      saveDesignSuccessAction()
      openSaveDesignAction(false)
      setSavingDesign(false)
      const successMessage = get(saveResponse, 'data.design.message')
      message.success(successMessage)
    } catch (e) {
      setSavingDesign(false)
      message.error(e.message)
    }
  }
}

const mapStateToProps = (state: any) => state.get('designerTool').toJS()

const DesignerToolEnhance = compose(
  injectIntl,
  graphql(saveDesignMutation, { name: 'saveDesign' }),
  graphql(uploadThumbnailMutation, { name: 'uploadThumbnail' }),
  graphql(createThemeMutation, { name: 'createTheme' }),
  graphql(deleteThemeMutation, { name: 'deleteTheme' }),
  graphql(deleteStyleMutation, { name: 'deleteStyle' }),
  graphql(deleteInspirationMutation, { name: 'deleteInspiration' }),
  graphql(saveStyleCanvas, { name: 'saveCanvas' }),
  graphql(getColorsQuery, { name: 'colorsList' }),
  connect(
    mapStateToProps,
    { ...designerToolActions, ...designerToolApi, ...thunkActions }
  ),
  getFonts
)(DesignerTool)

export default DesignerToolEnhance
