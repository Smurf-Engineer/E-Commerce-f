/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'
import Radio from 'antd/lib/radio'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import Tabs from './Tabs'
import message from 'antd/lib/message'
import PlaceholdersRender3D from '../../../components/PlaceholdersRender3D'
import {
  getProductFromCode,
  updateThemesOrderMutation,
  updateStylesOrderMutation
} from './data'
import Render3D from './Render3D'
import SaveModal from './SaveModal'
import { Container, Modes } from './styledComponents'
import {
  ModelConfig,
  DesignConfig,
  UploadFile,
  QueryProps,
  Product,
  DesignObject,
  ModelDesign,
  Theme,
  DesignItem,
  CanvasType,
  SelectedAsset,
  CanvasDragged,
  CanvasResized,
  CanvasRotated,
  CanvasObjects,
  ConfigCanvasObj,
  TextFormat,
  CanvasElement,
  AccessoriesColor,
  Change
} from '../../../types/common'

import { CanvasElements } from '../../DesignCenter/constants'

export const Mode = {
  Style: 'style',
  Placeholder: 'placeholder'
}

export interface Data extends QueryProps {
  product: Product
}

const RadioGroup = Radio.Group
const RadioButton = Radio.Button

interface Props {
  data?: Data
  designConfig: DesignConfig[]
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  areas: string[]
  files: ModelConfig
  loadingModel: boolean
  uploadingFiles: boolean
  themeImage?: UploadFile[]
  selectedTheme: number
  selectedStyle: number
  productCode: string
  themeName: string
  design: ModelDesign
  uploadingThumbnail: boolean
  extraFiles: string[]
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  colorIdeaItem: number
  designName: string
  colorIdeas: DesignObject[]
  openSaveDesign: boolean
  saveDesignLoading: boolean
  fonts: string[]
  visibleFonts: any[]
  searchText: string
  colorsList: any
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  uploadingSymbol: boolean
  searchClipParam: string
  styleMode: string
  styleColors: string[]
  selectedItem: SelectedAsset
  selectedElement: string
  designHasChanges: boolean
  canvas: CanvasType
  text: string
  textFormat: TextFormat
  installedFonts: any
  originalPaths: any[]
  undoChanges: Change[]
  redoChanges: Change[]
  selectedTab: number
  stitchingColor: string
  bindingColor: string
  zipperColor: string
  bibColor: string
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onDeleteInspiration: (id: number, index: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onLoadModel: (loading: boolean) => void
  onHoverColorBlock: (index: number) => void
  onUploadFiles: (files: any, areas: any, extra: any) => void
  onUploadDesign: (areas: any, config: any) => void
  onSelectConfig: (config: DesignConfig) => void
  onSelectInspirationColor: (index: number) => void
  onSaveDesign: () => void
  onUpdateProductCode: (code: string) => void
  onUpdateThemeName: (name: string) => void
  onUpdateDesignName: (name: string) => void
  onSelectComplexity: (design: number, complexity: number) => void
  onSaveThumbnail: (item: number, image: string) => void
  onUploadingThumbnail: (uploading: boolean) => void
  onUpdateColorIdeaName: (
    name: string,
    updateColors: boolean,
    item?: number
  ) => void
  formatMessage: (messageDescriptor: any) => string
  onLoadDesign: (
    config: ModelConfig,
    colorIdeas: DesignObject[],
    design: ModelDesign
  ) => void
  onAddExtraFile: (file: string) => void
  onRemoveExtraFile: (index: number) => void
  onToggleColor: (color: string) => void
  onEditColorIdea: (item: number) => void
  onAddColorIdea: () => void
  onEditTheme: (theme: Theme | null) => void
  updateThemesOrder: (variables: {}) => Promise<any>
  updateStylesOrder: (variables: {}) => Promise<any>
  onDesignName: (name: string) => void
  openSaveDesignAction: (open: boolean) => void
  onConfirmDesignToSave: () => void
  setGoogleFontsList: (data: any) => void
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  onUploadColorsList: (file: any, type: string) => void
  onUploadFile: (file: any) => void
  setSearchClipParamAction: (param: string) => void
  onSetCanvasObject: (el: CanvasType, paths: any[]) => void
  getGoogleFonts: () => void
  setStyleMode: (mode: string) => void
  onSelectEl: (id: string, typeEl: string) => void
  onCanvasElementDragged: (element: CanvasDragged) => void
  onCanvasElementResized: (element: CanvasResized) => void
  onCanvasElementRotated: (element: CanvasRotated) => void
  onCanvasElementDuplicated: (
    canvasEl: any,
    elementType: CanvasObjects,
    oldId?: string
  ) => void
  onRemoveEl: (id: string, typeEl: string, canvasObj: ConfigCanvasObj) => void
  onUpdateText: (text: string) => void
  onSelectedItem: (item: SelectedAsset, name?: string) => void
  onApplyCanvasEl: (
    text: CanvasElement,
    typeEl: string,
    update?: boolean
  ) => void
  onCanvasElementTextChanged: (oldText: string, newText: string) => void
  onSelectTextFormat: (
    key: string,
    value: string | number,
    fontStyle: boolean
  ) => void
  onUnmountTab: (mounted: string) => void
  onSetEditConfig: (
    colors: string[],
    accessoriesColor: AccessoriesColor,
    savedDesignId: string
  ) => void
  onResetEditing: (
    canvas: CanvasType,
    accessoriesColor?: AccessoriesColor
  ) => void
  onReApplyImageEl: (el: CanvasElement) => void
  onSelectArtFormat: (key: string, value: string | number) => void
  saveStyleCanvas: (design: any) => void
  onTabClick: (selectedIndex: number) => void
}

class DesignCenterCustomize extends React.PureComponent<Props> {
  render3D: any
  render3DPlaceholder: any
  render() {
    const {
      onSelectColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      colors,
      loadingModel,
      onLoadModel,
      onHoverColorBlock,
      files,
      uploadingFiles,
      onUploadFiles,
      onUploadDesign,
      onSelectConfig,
      areas,
      designConfig,
      onSelectInspirationColor,
      onSaveDesign,
      themeImage,
      selectedTheme,
      selectedStyle,
      onSelectTheme,
      onSelectStyle,
      onDeleteTheme,
      onDeleteStyle,
      onDeleteInspiration,
      onSelectImage,
      onDeleteImage,
      onUpdateProductCode,
      productCode,
      data,
      themeName,
      design,
      uploadingThumbnail,
      onUpdateThemeName,
      onUpdateDesignName,
      onSelectComplexity,
      onSaveThumbnail,
      onUploadingThumbnail,
      onLoadDesign,
      onAddExtraFile,
      onRemoveExtraFile,
      extraFiles,
      formatMessage,
      onToggleColor,
      bibBrace,
      zipper,
      binding,
      colorIdeaItem,
      onEditColorIdea,
      colorIdeas,
      onUpdateColorIdeaName,
      onAddColorIdea,
      onEditTheme,
      onConfirmDesignToSave,
      saveDesignLoading,
      openSaveDesign,
      setGoogleFontsList,
      fonts,
      addFont,
      visibleFonts,
      onUpdateSearchText,
      searchText,
      onUploadColorsList,
      colorsList,
      uploadingColors,
      uploadingStitchingColors,
      onUploadFile,
      uploadingSymbol,
      searchClipParam,
      setSearchClipParamAction,
      onSetCanvasObject,
      getGoogleFonts,
      styleMode,
      styleColors,
      onSelectEl,
      selectedItem,
      selectedElement,
      onCanvasElementDragged,
      designHasChanges,
      canvas,
      onCanvasElementResized,
      onCanvasElementRotated,
      onCanvasElementDuplicated,
      onRemoveEl,
      onUpdateText,
      text,
      onSelectedItem,
      onApplyCanvasEl,
      onCanvasElementTextChanged,
      textFormat,
      onSelectTextFormat,
      installedFonts,
      onUnmountTab,
      originalPaths,
      onSetEditConfig,
      onResetEditing,
      onReApplyImageEl,
      undoChanges,
      redoChanges,
      onSelectArtFormat,
      saveStyleCanvas,
      selectedTab,
      onTabClick,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor
    } = this.props
    const uploadNewModel =
      !!files && !!files.obj && !!files.mtl && !!files.label && !!files.bumpMap
    return (
      <Container>
        <Tabs
          {...{
            designConfig,
            colorBlock,
            colorBlockHovered,
            onSelectColorBlock,
            onHoverColorBlock,
            onSelectColor,
            colors,
            onUploadFiles,
            onUploadDesign,
            uploadingFiles,
            onSelectConfig,
            onSelectInspirationColor,
            themeImage,
            selectedTheme,
            selectedStyle,
            onSaveDesign,
            onSelectTheme,
            onSelectStyle,
            onDeleteInspiration,
            onDeleteTheme,
            onDeleteStyle,
            onSelectImage,
            onDeleteImage,
            onUpdateProductCode,
            productCode,
            themeName,
            design,
            onUpdateThemeName,
            onUpdateDesignName,
            onSelectComplexity,
            uploadingThumbnail,
            onLoadDesign,
            onAddExtraFile,
            onRemoveExtraFile,
            extraFiles,
            formatMessage,
            onToggleColor,
            bibBrace,
            zipper,
            binding,
            colorIdeaItem,
            onEditColorIdea,
            colorIdeas,
            onUpdateColorIdeaName,
            onAddColorIdea,
            onEditTheme,
            openSaveDesign,
            changeThemesPosition: this.changeThemesPosition,
            changeStylesPosition: this.changeStylesPosition,
            setGoogleFontsList,
            fonts,
            visibleFonts,
            addFont,
            onUpdateSearchText,
            searchText,
            onUploadColorsList,
            colorsList,
            uploadingColors,
            uploadingStitchingColors,
            onUploadFile,
            uploadingSymbol,
            searchClipParam,
            setSearchClipParamAction,
            getGoogleFonts,
            styleMode,
            canvas,
            selectedElement,
            onUpdateText,
            text,
            textFormat,
            onSelectTextFormat,
            installedFonts,
            selectedItem,
            onSelectArtFormat,
            selectedTab,
            onTabClick
          }}
          productData={data}
          uploadNewModel={uploadNewModel}
          onSaveThumbnail={this.handleOnSaveThumbnail}
          onApplyText={this.handleOnApplyText}
          onApplyArt={this.handleOnApplyArt}
        />

        {styleMode === Mode.Style ? (
          <Render3D
            {...{
              files,
              areas,
              colors,
              onSaveDesign,
              onLoadModel,
              designConfig,
              loadingModel,
              colorBlockHovered,
              onSaveThumbnail,
              onUploadingThumbnail,
              uploadingThumbnail,
              bibBrace,
              zipper,
              binding,
              design,
              onSetCanvasObject,
              styleMode
            }}
            ref={render3D => (this.render3D = render3D)}
          />
        ) : (
          <PlaceholdersRender3D
            ref={placeHolder => (this.render3DPlaceholder = placeHolder)}
            {...{
              colors,
              design,
              colorBlockHovered,
              styleColors,
              onLoadModel,
              loadingModel,
              undoEnabled: false,
              redoEnabled: false,
              formatMessage,
              currentStyle: design,
              onApplyCanvasEl,
              onSelectEl,
              onRemoveEl,
              onUnmountTab,
              product: files,
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
              onSetEditConfig,
              onSetCanvasObject,
              originalPaths,
              onResetEditing,
              onSelectedItem,
              selectedItem,
              redoChanges,
              undoChanges,
              saveStyleCanvas,
              saveDesignLoading
            }}
            isMobile={false}
            isUserAuthenticated={true}
            responsive={false}
          />
        )}
        {!isEmpty(design) && (
          <Modes>
            <RadioGroup value={styleMode} onChange={this.handleChangeMode}>
              <RadioButton value={Mode.Style}>Style Mode</RadioButton>
              <RadioButton value={Mode.Placeholder}>
                Placeholder Mode
              </RadioButton>
            </RadioGroup>
          </Modes>
        )}
        <SaveModal
          visible={openSaveDesign}
          designName={design.name}
          requestClose={this.closeSaveDesignModal}
          onDesignName={onUpdateDesignName}
          formatMessage={formatMessage}
          saveDesign={onConfirmDesignToSave}
          uploadingThumbnail={false}
          saveDesignLoading={saveDesignLoading}
        />
      </Container>
    )
  }
  componentWillReceiveProps(nextProps: any) {
    const { colorsList } = this.props
    if (
      (!nextProps.uploadingColors || !nextProps.uploadingStitchingColors) &&
      colorsList
    ) {
      colorsList.refetch()
    }
  }

  handleOnSaveThumbnail = (item: number, colors: string[]) => {
    if (this.render3D) {
      this.render3D.saveThumbnail(item, colors)
    }
  }
  closeSaveDesignModal = () => {
    const { openSaveDesignAction } = this.props
    openSaveDesignAction(false)
  }
  changeThemesPosition = async (dragIndex: number, dropIndex: number) => {
    try {
      const { updateThemesOrder, data, productCode } = this.props
      const themes = orderBy(
        get(cloneDeep(data), 'product.themes', []),
        'itemOrder',
        'ASC'
      )
      const temporalTheme = cloneDeep(themes[dragIndex])
      themes[dragIndex].itemOrder = themes[dropIndex].itemOrder
      themes[dropIndex].itemOrder = temporalTheme.itemOrder
      const themesToSend = map(themes, ({ id, itemOrder }) => ({
        id,
        item_order: itemOrder
      }))
      await updateThemesOrder({
        variables: { themes: themesToSend },
        update: (store: any) => {
          const storeData = store.readQuery({
            query: getProductFromCode,
            variables: { code: productCode }
          })
          storeData.product.themes = themes
          store.writeQuery({
            query: getProductFromCode,
            data: storeData
          })
        }
      })
    } catch (e) {
      message.error(e.message)
    }
  }
  changeStylesPosition = async (dragIndex: number, dropIndex: number) => {
    try {
      const { selectedTheme, data, updateStylesOrder, productCode } = this.props
      let currentTheme: DesignItem[] = []

      currentTheme = find(
        get(data, 'product.themes', []),
        ({ id }) => id === selectedTheme
      )

      const styles = orderBy(
        get(cloneDeep(currentTheme), 'styles', []),
        'itemOrder',
        'ASC'
      )

      styles.map((style: any, index: number) => {
        if (!style.itemOrder) {
          styles[index].itemOrder = 1
        }
        if (
          styles[index - 1] &&
          styles[index - 1].itemOrder !== style.itemOrder - 1
        ) {
          styles[index].itemOrder = styles[index - 1].itemOrder + 1
        }
      })
      const temporalStyle = cloneDeep(styles[dragIndex])
      styles[dragIndex].itemOrder = styles[dropIndex].itemOrder
      styles[dropIndex].itemOrder = temporalStyle.itemOrder
      const stylesToSend = map(styles, ({ id, itemOrder }) => ({
        id,
        item_order: itemOrder
      }))

      await updateStylesOrder({
        variables: { styles: stylesToSend, themeId: selectedTheme },
        update: (store: any) => {
          const storeData = store.readQuery({
            query: getProductFromCode,
            variables: { code: productCode }
          })
          const indexToUpdate = findIndex(storeData.product.themes, {
            id: selectedTheme
          })

          storeData.product.themes[indexToUpdate].styles = styles
          store.writeQuery({
            query: getProductFromCode,
            data: storeData
          })
        }
      })
    } catch (e) {
      message.error(e.message)
    }
  }
  handleOnApplyText = (text: string, style: TextFormat) => {
    const { selectedElement, canvas } = this.props
    if (!!canvas.text[selectedElement]) {
      this.render3DPlaceholder.applyText(text, style)
    } else {
      this.render3DPlaceholder.applyCanvasEl({
        text,
        style,
        type: CanvasElements.Text
      })
    }
  }
  handleOnApplyArt = (
    url: string,
    style?: CanvasElement,
    fileId?: number,
    name?: string
  ) => {
    const { selectedElement, canvas, onSelectedItem } = this.props
    if (!!canvas.path[selectedElement]) {
      this.render3DPlaceholder.applyClipArt(url, style)
    } else {
      onSelectedItem({ id: fileId, type: CanvasElements.Path }, name || '')
      this.render3DPlaceholder.applyCanvasEl({
        url,
        style,
        type: CanvasElements.Path,
        fileId
      })
    }
  }
  handleChangeMode = (event: any) => {
    const {
      target: { value: mode }
    } = event
    const { setStyleMode } = this.props
    setStyleMode(mode)
  }
}

type OwnProps = {
  productCode?: string
}

const EnhanceDesignCenterCustomize = compose(
  graphql<Data>(getProductFromCode, {
    options: ({ productCode }: OwnProps) => ({
      skip: !productCode,
      fetchPolicy: 'network-only',
      variables: { code: productCode },
      notifyOnNetworkStatusChange: true
    })
  }),
  updateThemesOrderMutation,
  updateStylesOrderMutation
)(DesignCenterCustomize)

export default EnhanceDesignCenterCustomize
