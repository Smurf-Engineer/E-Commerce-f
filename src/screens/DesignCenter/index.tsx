/**
 * DesignCenter Screen - Created by david on 23/02/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { RouteComponentProps } from 'react-router-dom'
import MobileDesignCenterInspiration from '../../components/MobileDesignCenterInspiration'
import SwipeableBottomSheet from 'react-swipeable-clickeable-bottom-sheet'
import Message from 'antd/lib/message'
import Modal from 'antd/lib/modal/Modal'
import { saveAndBuyAction } from '../../components/MainLayout/actions'
import Spin from 'antd/lib/spin'
import get from 'lodash/get'
import find from 'lodash/find'
import colorList from '../DesignerTool/DesignCenterCustomize/ColorList/colors'
import unset from 'lodash/unset'
import Layout from '../../components/MainLayout'
import {
  COLOR_COMBO_SELECTED,
  SELECTED_THEME,
  SELECTED_FONT,
  SELECTED_COLOR,
  SELECTED_SYMBOL,
  SELECTED_PRODUCT
} from '../../constants'
import {
  openQuickViewAction,
  openLoginAction
} from '../../components/MainLayout/actions'
import * as designCenterActions from './actions'
import * as designCenterApiActions from './api'
import Header from '../../components/DesignCenterHeader'
import Tabs from '../../components/DesignCenterTabs'
import Info from '../../components/DesignCenterInfo'
import ThemeTab from '../../components/DesignCenterTheme'
import StyleTab from '../../components/DesignCenterStyle'
import CustomizeTab from '../../components/DesignCenterCustomize'
import PreviewTab from '../../components/DesignCenterPreview'
import SaveDesign from '../../components/SaveDesign'
import {
  Container,
  StyledTitle,
  BottomSheetWrapper,
  ModalMessage,
  StyledGhostButton,
  StyledButton,
  LoadingContainer,
  Error,
  Title,
  ErrorMessage,
  BackCircle,
  BackIcon
} from './styledComponents'
import {
  Palette,
  QueryProps,
  Product,
  TeamStoreItemtype,
  TextFormat,
  CanvasElement,
  CanvasType,
  MyPaletteDesignCenterModals,
  StyleModalType,
  ThemeModalType,
  ArtFormat,
  SaveDesignType,
  DesignType,
  Style,
  Change,
  ConfigCanvasObj,
  StitchingColor,
  AccesoryColor,
  ImageFile,
  DesignSaved,
  CanvasResized,
  CanvasDragged,
  CanvasRotated,
  Responsive,
  AccessoriesColor,
  CanvasObjects,
  SelectedAsset,
  SaveDesignData,
  Message as MessageType,
  MessagePayload,
  UserInfo
} from '../../types/common'
import {
  getProductQuery,
  addTeamStoreItemMutation,
  getDesignQuery,
  getColorsQuery,
  requestColorChartMutation,
  getDesignLabInfo
} from './data'
import backIcon from '../../assets/leftarrow.svg'
import DesignCenterInspiration from '../../components/DesignCenterInspiration'
import messages from './messages'
import ModalTitle from '../../components/ModalTitle'
import { DesignTabs } from './constants'
import { DEFAULT_ROUTE } from '../../constants'
import DesignCheckModal from '../../components/DesignCheckModal'

interface DataProduct extends QueryProps {
  product?: Product
}

interface DataDesign extends QueryProps {
  designData?: DesignType
}

interface Props extends RouteComponentProps<any> {
  dataProduct?: DataProduct
  dataDesign?: DataDesign
  intl: InjectedIntl
  client: any
  currentTab: number
  colorBlock: number
  colorBlockHovered: number
  palettes: Palette[]
  paletteName: string
  colors: string[]
  design: SaveDesignType
  videos: object[]
  styleColors: string[]
  loadingModel: boolean
  undoChanges: Change[]
  redoChanges: Change[]
  swipingView: boolean
  openShareModal: boolean
  openSaveDesign: boolean
  checkedTerms: boolean
  designName: string
  savedDesignId: string
  saveDesignLoading: boolean
  saveDesignChangesLoading: boolean
  text: string
  style: Style
  themeId: number
  styleIndex: number
  openAddToStoreModal: boolean
  addItemToStore: any
  teamStoreId: string
  itemToAdd: TeamStoreItemtype
  canvas: CanvasType
  selectedElement: string
  textFormat: TextFormat
  artFormat: ArtFormat
  myPaletteModals: MyPaletteDesignCenterModals
  openResetDesignModal: boolean
  themeModalData: ThemeModalType
  styleModalData: StyleModalType
  designHasChanges: boolean
  openOutWithoutSaveModal: boolean
  routeToGoWithoutSave: string
  customize3dMounted: boolean
  svgOutputUrl: string
  tabChanged: boolean
  product: Product
  complexity: number
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bibColor?: AccesoryColor
  images: ImageFile[]
  uploadingFile: boolean
  searchClipParam: string
  savedDesign: SaveDesignData
  user: object
  responsive: Responsive
  originalPaths: any[]
  selectedItem: SelectedAsset
  layout: any
  infoModalOpen: boolean
  automaticSave: boolean
  selectedTab: number
  colorsList: any
  navigation: any
  openResetPlaceholderModal: boolean
  colorChartSending: boolean
  colorChartModalOpen: boolean
  colorChartModalFormOpen: boolean
  deliveryDays: number
  tutorialPlaylist: string
  designCheckModalOpen: boolean
  // Redux Actions
  clearStoreAction: () => void
  setCurrentTabAction: (index: number) => void
  openQuickViewAction: (index: number) => void
  setColorBlockAction: (index: number) => void
  setVideos: (videos: object[]) => void
  setHoverColorBlockAction: (index: number) => void
  setColorAction: (color: string) => void
  setPaletteAction: (colors: string[]) => void
  setDesignNameAction: (name: string) => void
  setPaletteNameAction: (name: string) => void
  setPalettesAction: (palettes: Palette[]) => void
  setLoadingModel: (loading: boolean) => void
  designUndoAction: () => void
  designRedoAction: () => void
  designResetAction: () => void
  designClearAction: () => void
  setSwipingTabAction: (swiping: boolean) => void
  setThemeAction: (id: number, product: Product) => void
  setStyleAction: (style: any, id: number, index: any, colors: string[]) => void
  openShareModalAction: (open: boolean) => void
  openSaveDesignAction: (
    open: boolean,
    imageBase64: string,
    automaticSave?: boolean
  ) => void
  saveDesignIdAction: (
    id: string,
    svgUrl: string,
    design: DesignSaved,
    updateColors?: boolean
  ) => void
  setCheckedTermsAction: (checked: boolean) => void
  clearDesignInfoAction: () => void
  saveDesignLoadingAction: (loading: boolean) => void
  saveDesignChangesLoadingAction: (loading: boolean) => void
  setTextAction: (text: string) => void
  setStyleComplexity: (index: number, colors: string[]) => void
  openAddToTeamStoreModalAction: (open: boolean) => void
  setItemToAddAction: (teamStoreItem: {}, teamStoreId: string) => void
  setCanvasElement: (
    text: CanvasElement,
    typeEl: string,
    update?: boolean,
    canvasObj?: ConfigCanvasObj
  ) => void
  setSelectedElement: (id: string, typeEl: string) => void
  removeCanvasElement: (
    id: string,
    typeEl: string,
    canvasObj: ConfigCanvasObj
  ) => void
  setTextFormatAction: (key: string, value: string | number) => void
  setArtFormatAction: (key: string, value: string | number) => void
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
  openResetDesignModalAction: (open: boolean) => void
  openResetPlaceholderModalAction: (open: boolean) => void
  openNewThemeModalAction: (open: boolean, themeId: number) => void
  openNewStyleModalAction: (
    open: boolean,
    indexStyle?: any,
    idStyle?: number
  ) => void
  editDesignAction: () => void
  openOutWithoutSaveModalAction: (open: boolean, route?: string) => void
  setCustomize3dMountedAction: (mounted: boolean) => void
  setCanvasJsonAction: (canvas: string) => void
  setStitchingColorAction: (stitchingColor: StitchingColor) => void
  setAccessoryColorAction: (color: AccesoryColor, id: string) => void
  uploadFileAction: (file: any) => void
  uploadFileSuccessAction: (url: string) => void
  uploadFileSuccessFailure: () => void
  setSearchClipParamAction: (searchParam: string) => void
  onCanvasElementResizedAction: (element: CanvasResized) => void
  onCanvasElementDraggedAction: (element: CanvasDragged) => void
  onCanvasElementRotatedAction: (element: CanvasRotated) => void
  onCanvasElementTextChangedAction: (oldText: string, newText: string) => void
  setSelectedItemAction: (item: SelectedAsset) => void
  formatMessage: (messageDescriptor: MessageType) => string
  onReApplyImageElementAction: (el: CanvasElement) => void
  onCanvasElementDuplicatedAction: (
    canvasEl: any,
    elementType: CanvasObjects,
    oldId?: string
  ) => void
  setLoadedCanvasAction: (canvas: CanvasType, paths: any[]) => void
  onResetEditingAction: (
    canvas: CanvasType,
    accessoriesColor?: AccessoriesColor
  ) => void
  setEditConfigAction: (
    colors: string[],
    accessoriesColor: AccessoriesColor,
    savedDesignId: string
  ) => void
  openLoginAction: (open: boolean, callback?: boolean) => void
  handleOnCloseInfo: () => void
  saveAndBuyAction: (buy: boolean) => void
  setAutomaticSave: (automaticSave: boolean) => void
  saveToCartAction: (item: DesignSaved) => void
  onTabClickAction: (selectedIndex: number) => void
  onLockElementAction: (id: string, type: string) => void
  requestColorChart: (variables: {}) => Promise<MessagePayload>
  setSendingColorChartAction: (sending: boolean) => void
  onOpenColorChartAction: (open: boolean) => void
  onOpenColorChartFormAction: (open: boolean) => void
  setDesignLabAction: (data: any) => void
  openDesignCheckModalAction: () => void
}

export class DesignCenter extends React.Component<Props, {}> {
  state = {
    openBottomSheet: false
  }

  componentWillUnmount() {
    const { clearStoreAction } = this.props
    clearStoreAction()
  }

  async componentDidMount() {
    const {
      designHasChanges,
      responsive,
      intl: { formatMessage },
      client: { query },
      setDesignLabAction
    } = this.props
    if (
      responsive.tablet &&
      window.matchMedia('(orientation: portrait)').matches
    ) {
      Message.warning(formatMessage(messages.landscapeMessage))
    }
    window.onbeforeunload = () => {
      if (designHasChanges) {
        return 'Changes you made may not be saved.'
      }
      return null
    }
    try {
      const response = await query({
        query: getDesignLabInfo,
        fetchPolicy: 'network-only'
      })
      setDesignLabAction(response.data.getDesignLabInfo)
    } catch (e) {
      console.error(e)
    }
  }

  toggleBottomSheet = (evt: React.MouseEvent<EventTarget>) => {
    const open = !this.state.openBottomSheet
    this.setState({ openBottomSheet: open })
  }

  handleAfterSaveDesign = async (
    id: string,
    svgUrl: string,
    design: DesignSaved,
    updateColors = false,
    goToCart?: boolean
  ) => {
    const {
      saveDesignIdAction,
      history,
      saveToCartAction,
      responsive
    } = this.props
    saveDesignIdAction(id, svgUrl, design, updateColors)
    if (!goToCart) {
      const isMobile = !!responsive && responsive.phone
      if (!isMobile) {
        this.handleOnSelectTab(DesignTabs.PreviewTab)
      }
    } else {
      await saveToCartAction(design)
      history.push('/shopping-cart')
    }
  }

  handleOpenQuickView = () => {
    const {
      dataDesign,
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)
    const productId = get(dataDesign, 'designData.product.id', queryParams.id)
    const { openQuickViewAction: openQuickView } = this.props
    openQuickView(productId)
  }

  handleOnPressBack = () => {
    const { designHasChanges, openOutWithoutSaveModalAction } = this.props
    if (designHasChanges) {
      openOutWithoutSaveModalAction(true)
      return
    }
    window.location.replace('/')
  }

  handleOnCancelOutWithoutSaveModal = () => {
    const { openOutWithoutSaveModalAction } = this.props
    openOutWithoutSaveModalAction(false)
  }

  handleOnDontSaveOutWithoutSaveModal = () => {
    const {
      openOutWithoutSaveModalAction,
      routeToGoWithoutSave,
      history
    } = this.props
    openOutWithoutSaveModalAction(false)
    if (!routeToGoWithoutSave) {
      window.location.replace('/')
      return
    }
    history.push(routeToGoWithoutSave)
  }

  handleOnSaveOutWithoutSaveModal = () => {
    const {
      currentTab,
      setCurrentTabAction,
      openOutWithoutSaveModalAction
    } = this.props
    if (currentTab !== DesignTabs.CustomizeTab) {
      setCurrentTabAction(DesignTabs.CustomizeTab)
    }
    openOutWithoutSaveModalAction(false)
  }

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

  handleOnTransictionEnd = () => this.props.setSwipingTabAction(false)

  closeSaveDesignModal = () => {
    const { openSaveDesignAction } = this.props
    openSaveDesignAction(false, '', false)
  }

  saveItemToStore = async () => {
    const {
      addItemToStore,
      itemToAdd,
      teamStoreId,
      openAddToTeamStoreModalAction,
      intl: { formatMessage },
      designName
    } = this.props

    const storeName = itemToAdd.team_store_name

    unset(itemToAdd, 'team_store_name')

    try {
      const { data } = await addItemToStore({
        variables: { teamStoreItem: itemToAdd, teamStoreId }
      })
      const responseMessage = get(data, 'addTeamStoreItem.message')
      if (responseMessage) {
        Message.success(
          formatMessage(messages.addedToStore, { designName, storeName })
        )
      }
      openAddToTeamStoreModalAction(false)
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      Message.error(errorMessage, 5)
    }
  }

  handleOnAddToCart = () => {
    const {
      designName,
      dataDesign,
      intl: { formatMessage }
    } = this.props
    const name = get(dataDesign, 'designData.product.name', '')
    Message.success(
      formatMessage(messages.addedToCart, { productName: designName || name })
    )
  }

  goToCustomProductPage = (designId: string) => {
    const { history } = this.props
    history.push(`/custom-product?id=${designId}`)
  }

  setPaletteEvent = (colors: string[], name: string) => {
    const { setPaletteAction, style } = this.props
    window.dataLayer.push({
      event: COLOR_COMBO_SELECTED,
      label: name,
      design: get(style, 'name', '')
    })
    setPaletteAction(colors)
  }

  setColorEvent = (color: string) => {
    const { setColorAction, style } = this.props
    const colorName = get(
      find(colorList, colorObject => colorObject.value === color),
      'name',
      ''
    )
    window.dataLayer.push({
      event: SELECTED_COLOR,
      label: colorName,
      design: get(style, 'name', '')
    })
    setColorAction(color)
  }

  setTextEvent = (key: string, value: string | number, fontStyle: boolean) => {
    const { setTextFormatAction, style } = this.props
    if (fontStyle) {
      window.dataLayer.push({
        event: SELECTED_FONT,
        label: value,
        design: get(style, 'name', '')
      })
    }
    setTextFormatAction(key, value)
  }

  setSelectedItemEvent = (item: SelectedAsset, name?: string) => {
    const { setSelectedItemAction, style } = this.props
    if (name) {
      window.dataLayer.push({
        event: SELECTED_SYMBOL,
        label: name,
        design: get(style, 'name', '')
      })
    }
    setSelectedItemAction(item)
  }

  render() {
    const {
      intl,
      history,
      text,
      currentTab,
      tabChanged,
      videos,
      setColorBlockAction,
      setHoverColorBlockAction,
      setPaletteAction,
      colorBlock,
      colorBlockHovered,
      setPaletteNameAction,
      paletteName,
      palettes,
      openSaveDesign,
      setPalettesAction,
      setVideos,
      swipingView,
      colors,
      design,
      styleColors,
      style,
      themeId,
      loadingModel,
      designName,
      saveDesignLoading,
      saveDesignChangesLoading,
      setLoadingModel,
      designUndoAction,
      designRedoAction,
      designResetAction,
      designClearAction,
      undoChanges,
      redoChanges,
      setStyleAction,
      openShareModal,
      openShareModalAction,
      openSaveDesignAction,
      setDesignNameAction,
      savedDesignId,
      checkedTerms,
      setCheckedTermsAction,
      saveDesignLoadingAction,
      saveDesignChangesLoadingAction,
      setTextAction,
      openAddToTeamStoreModalAction,
      setStyleComplexity,
      openAddToStoreModal,
      setItemToAddAction,
      teamStoreId,
      location: { search },
      dataDesign,
      dataProduct,
      canvas,
      setCanvasElement,
      setSelectedElement,
      removeCanvasElement,
      selectedElement,
      textFormat,
      artFormat,
      setArtFormatAction,
      openPaletteModalAction,
      myPaletteModals,
      openResetDesignModalAction,
      openResetPlaceholderModalAction,
      openResetDesignModal,
      editDesignAction,
      themeModalData,
      openNewThemeModalAction,
      styleModalData,
      openNewStyleModalAction,
      designHasChanges,
      openOutWithoutSaveModal,
      customize3dMounted,
      setCustomize3dMountedAction,
      svgOutputUrl,
      setCanvasJsonAction,
      styleIndex,
      product,
      complexity,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      setStitchingColorAction,
      setAccessoryColorAction,
      uploadFileAction,
      images,
      uploadingFile,
      searchClipParam,
      setSearchClipParamAction,
      savedDesign,
      onCanvasElementResizedAction,
      onCanvasElementDraggedAction,
      onCanvasElementRotatedAction,
      onCanvasElementTextChangedAction,
      user,
      responsive,
      onReApplyImageElementAction,
      onCanvasElementDuplicatedAction,
      setEditConfigAction,
      setLoadedCanvasAction,
      onResetEditingAction,
      originalPaths,
      selectedItem,
      openLoginAction: openLoginModalAction,
      layout,
      handleOnCloseInfo,
      infoModalOpen,
      automaticSave,
      saveAndBuyAction: handleOnSaveAndBuy,
      setAutomaticSave,
      selectedTab,
      onTabClickAction,
      onLockElementAction,
      colorsList,
      location,
      openResetPlaceholderModal,
      colorChartSending,
      colorChartModalOpen,
      colorChartModalFormOpen,
      deliveryDays,
      tutorialPlaylist,
      openDesignCheckModalAction,
      designCheckModalOpen
    } = this.props

    const { formatMessage } = intl
    const { openBottomSheet } = this.state
    const {
      CustomizeTab: CustomizeTabIndex,
      PreviewTab: PreviewTabIndex,
      ThemeTab: ThemeTabIndex,
      StyleTab: StyleTabIndex
    } = DesignTabs
    const isMobile = !!responsive && responsive.phone
    const redirect = <Redirect to={DEFAULT_ROUTE} />
    /**
     * Redirect for missing params
     */
    const queryParams = queryString.parse(search)
    const placeholders = location && location.pathname === '/kickstart'

    if (!queryParams.id && !queryParams.designId) {
      return redirect
    }

    const productQueryWithError = !!dataProduct && !!dataProduct.error
    const designQueryWithError = !!dataDesign && !!dataDesign.error
    if (productQueryWithError || designQueryWithError) {
      return (
        <Layout
          {...{ history, intl }}
          hideBottomHeader={true}
          hideFooter={true}
        >
          <Header {...{ deliveryDays }} onPressBack={this.handleOnPressBack} />
          <Error>
            <Title>Oops!</Title>
            <ErrorMessage>
              <FormattedMessage {...messages.errorMessage} />
            </ErrorMessage>
          </Error>
        </Layout>
      )
    }

    const isRetailProductOrDoesNotHaveFiles =
      !!dataProduct &&
      !!dataProduct.product &&
      (!dataProduct.product.isCustom ||
        !dataProduct.product.obj ||
        !dataProduct.product.mtl)

    const designDoesNotHaveFiles =
      !!dataDesign &&
      !!dataDesign.designData &&
      !!dataDesign.designData.product &&
      (!dataDesign.designData.product.obj ||
        !dataDesign.designData.product.mtl ||
        !dataDesign.designData.canEdit)

    /**
     * Redirect for retail products or missing 3D files
     */
    if (isRetailProductOrDoesNotHaveFiles || designDoesNotHaveFiles) {
      return redirect
    }

    const productId = get(dataDesign, 'designData.product.id', queryParams.id)
    const productName =
      get(dataProduct, 'product.name') ||
      get(dataDesign, 'designData.product.name', '')

    const canvasJson = get(dataDesign, 'designData.canvas')
    const styleId = get(dataDesign, 'designData.styleId')
    const highResolution = get(dataDesign, 'designData.highResolution')

    let designObject = design
    if (canvasJson) {
      designObject = { ...designObject, canvasJson, styleId, highResolution }
    }
    let tabSelected =
      !tabChanged && !dataProduct ? CustomizeTabIndex : currentTab
    let loadingData = true && !dataProduct
    let isEditing = !!dataDesign
    let productConfig = product
    let currentStyle = style
    let proDesignModel
    if (dataDesign && dataDesign.designData) {
      const { designData } = dataDesign
      const {
        shortId: designId,
        colors: designColors = [],
        style: designStyle,
        flatlockCode,
        flatlockColor,
        bibBraceColor: bibBraceAccesoryColor,
        bindingColor: bindingAccesoryColor,
        zipperColor: zipperAccesoryColor,
        product: designProduct,
        createdAt,
        code,
        name,
        shared,
        id,
        image: designImage,
        canvas: designCanvas,
        outputSvg
      } = designData
      const designConfig = {
        flatlockCode,
        flatlockColor,
        bibBraceColor: bibBraceAccesoryColor,
        bindingColor: bindingAccesoryColor,
        zipperColor: zipperAccesoryColor
      }
      tabSelected = !tabChanged ? CustomizeTabIndex : currentTab
      loadingData = !!dataDesign.loading
      productConfig = designProduct
      currentStyle = { ...designStyle }
      currentStyle.colors = designColors
      currentStyle.accessoriesColor = designConfig
      currentStyle.designId = designId

      const proDesign = get(designData, 'proDesign', false)
      if (proDesign) {
        proDesignModel = {
          createdAt,
          designCode: code,
          designId: id,
          designImage,
          designName: name,
          product: designProduct,
          shared,
          shortId: designId!,
          svg: outputSvg,
          canvas: designCanvas,
          bibBraceColor: bibBraceAccesoryColor,
          bindingColor: bindingAccesoryColor,
          flatlockCode,
          flatlockColor,
          zipperColor: zipperAccesoryColor
        }
        tabSelected = PreviewTabIndex
      }
    }

    const loadingView = (
      <LoadingContainer>
        <Spin />
      </LoadingContainer>
    )

    const isUserAuthenticated = !!user
    return (
      <Layout
        {...{ history, intl }}
        hideTopHeader={responsive.tablet}
        hideBottomHeader={true}
        hideFooter={true}
        buyNowHeader={isMobile && tabSelected > DesignTabs.StyleTab}
      >
        <Container>
          {isMobile &&
            tabSelected > DesignTabs.ThemeTab &&
            tabSelected !== DesignTabs.CustomizeTab && (
              <BackCircle onClick={this.handleOnGoBack}>
                <BackIcon src={backIcon} />
              </BackCircle>
            )}
          {!isMobile && (
            <Header
              {...{ deliveryDays }}
              onPressBack={this.handleOnPressBack}
            />
          )}
          {!isMobile && (
            <Tabs
              currentTheme={themeId}
              onSelectTab={this.handleOnSelectTab}
              currentTab={tabSelected}
              isEditing={isEditing || loadingData}
              {...{ designHasChanges, styleIndex }}
            />
          )}
          <SwipeableViews
            disabled={true}
            index={tabSelected}
            onTransitionEnd={this.handleOnTransictionEnd}
          >
            <div key="theme">
              <Info
                label="theme"
                {...{ isMobile }}
                message={isMobile ? '' : 'themeMessage'}
                model={productName}
                onPressQuickView={this.handleOpenQuickView}
              />
              {tabSelected === ThemeTabIndex && (
                <ThemeTab
                  currentTheme={themeId}
                  onSelectTheme={this.handleOnSelectTheme}
                  {...{
                    loadingModel,
                    themeModalData,
                    openNewThemeModalAction,
                    designHasChanges,
                    formatMessage,
                    productId,
                    isMobile,
                    placeholders
                  }}
                />
              )}
            </div>
            <div key="style">
              <Info
                label="style"
                {...{ isMobile }}
                message={isMobile ? '' : 'styleMessagePlaceholder'}
                model={productName}
                onPressQuickView={this.handleOpenQuickView}
              />
              {tabSelected === StyleTabIndex && (
                <StyleTab
                  onSelectStyle={setStyleAction}
                  onSelectStyleComplexity={setStyleComplexity}
                  {...{
                    styleModalData,
                    openNewStyleModalAction,
                    designHasChanges,
                    formatMessage,
                    styleIndex,
                    productId,
                    themeId,
                    isMobile
                  }}
                  complexity={complexity + 1}
                />
              )}
            </div>
            {loadingData ? (
              loadingView
            ) : (
              <CustomizeTab
                {...{
                  colorBlock,
                  colorBlockHovered,
                  colors,
                  videos,
                  loadingModel,
                  swipingView,
                  styleColors,
                  paletteName,
                  palettes,
                  text,
                  productName,
                  canvas,
                  selectedElement,
                  textFormat,
                  artFormat,
                  openPaletteModalAction,
                  myPaletteModals,
                  openResetDesignModal,
                  openResetDesignModalAction,
                  openResetPlaceholderModalAction,
                  designName,
                  formatMessage,
                  customize3dMounted,
                  setCustomize3dMountedAction,
                  loadingData,
                  currentStyle,
                  undoChanges,
                  redoChanges,
                  setStitchingColorAction,
                  stitchingColor,
                  bindingColor,
                  zipperColor,
                  bibColor,
                  images,
                  uploadingFile,
                  searchClipParam,
                  setSearchClipParamAction,
                  designHasChanges,
                  isUserAuthenticated,
                  isEditing,
                  originalPaths,
                  selectedItem,
                  openLoginModalAction,
                  isMobile,
                  responsive,
                  handleOnCloseInfo,
                  infoModalOpen,
                  selectedTab,
                  colorsList,
                  setVideos,
                  placeholders,
                  openResetPlaceholderModal,
                  colorChartSending,
                  colorChartModalOpen,
                  colorChartModalFormOpen,
                  tutorialPlaylist
                }}
                callbackToSave={get(layout, 'callback', false)}
                loggedUserId={get(user, 'id', '')}
                saveAndBuy={get(layout, 'saveAndBuy', false)}
                fonts={get(layout, 'fonts', {})}
                handleOnSaveAndBuy={handleOnSaveAndBuy}
                handleOnGoBack={this.handleOnGoBack}
                onCanvasElementDuplicated={onCanvasElementDuplicatedAction}
                product={productConfig}
                onUploadFile={uploadFileAction}
                onAccessoryColorSelected={setAccessoryColorAction}
                currentTab={tabSelected}
                design={designObject}
                onUpdateText={setTextAction}
                undoEnabled={undoChanges.length > 0}
                redoEnabled={redoChanges.length > 0}
                onSelectColorBlock={setColorBlockAction}
                onHoverColorBlock={setHoverColorBlockAction}
                onSelectColor={this.setColorEvent}
                onSelectPalette={setPaletteAction}
                onChangePaletteName={setPaletteNameAction}
                onSetPalettes={setPalettesAction}
                onLoadModel={setLoadingModel}
                onUndoAction={designUndoAction}
                onRedoAction={designRedoAction}
                onResetAction={designResetAction}
                onClearAction={designClearAction}
                onPressQuickView={this.handleOpenQuickView}
                onOpenSaveDesign={openSaveDesignAction}
                onApplyCanvasEl={setCanvasElement}
                onSelectEl={setSelectedElement}
                onRemoveEl={removeCanvasElement}
                onSelectTextFormat={this.setTextEvent}
                onSelectArtFormat={setArtFormatAction}
                onUnmountTab={setCanvasJsonAction}
                onCanvasElementResized={onCanvasElementResizedAction}
                onCanvasElementDragged={onCanvasElementDraggedAction}
                onCanvasElementRotated={onCanvasElementRotatedAction}
                onCanvasElementTextChanged={onCanvasElementTextChangedAction}
                onReApplyImageEl={onReApplyImageElementAction}
                onSetEditConfig={setEditConfigAction}
                onSetCanvasObject={setLoadedCanvasAction}
                onResetEditing={onResetEditingAction}
                onSelectedItem={this.setSelectedItemEvent}
                onTabClick={onTabClickAction}
                onLockElement={onLockElementAction}
                onRequestColorChart={this.sendColorChartRequest}
                onCloseColorChart={this.handleOnCloseColorChart}
                onCloseColorChartForm={this.handleOnCloseColorChartForm}
                onOpenFormChart={this.handleOnOpenFormChart}
                onOpenColorChart={this.handleOnOpenColorChart}
                openDesignCheckModal={openDesignCheckModalAction}
              />
            )}
            {!isMobile ? (
              <PreviewTab
                {...{
                  history,
                  colors,
                  loadingModel,
                  swipingView:
                    proDesignModel && !loadingModel ? false : swipingView,
                  openShareModal,
                  openShareModalAction,
                  savedDesignId:
                    proDesignModel && !loadingModel
                      ? proDesignModel.shortId
                      : savedDesignId,
                  productName,
                  openAddToTeamStoreModalAction,
                  openAddToStoreModal,
                  setItemToAddAction,
                  teamStoreId,
                  editDesignAction,
                  formatMessage,
                  svgOutputUrl,
                  savedDesign:
                    proDesignModel && !loadingModel
                      ? proDesignModel
                      : savedDesign,
                  stitchingColor,
                  bindingColor,
                  zipperColor,
                  bibColor
                }}
                canvas={designObject.canvasJson}
                product={productConfig}
                currentTab={tabSelected}
                onAddToCart={this.handleOnAddToCart}
                onLoadModel={setLoadingModel}
                onPressQuickView={this.handleOpenQuickView}
                addItemToStore={this.saveItemToStore}
              />
            ) : (
              <div />
            )}
          </SwipeableViews>
          <SaveDesign
            {...{
              productId,
              formatMessage,
              colors,
              stitchingColor,
              bindingColor,
              zipperColor,
              bibColor,
              canvas,
              designName,
              isUserAuthenticated,
              isEditing,
              isMobile,
              automaticSave,
              setAutomaticSave
            }}
            productMpn={get(product, 'mpn', '')}
            design={!!design.canvasJson ? design : designObject}
            hasFlatlock={!!productConfig && !!productConfig.flatlock}
            hasZipper={!!productConfig && !!productConfig.zipper}
            hasBinding={!!productConfig && !!productConfig.binding}
            hasBibBrace={!!productConfig && !!productConfig.bibBrace}
            open={openSaveDesign}
            requestClose={this.closeSaveDesignModal}
            onDesignName={setDesignNameAction}
            afterSaveDesign={this.handleAfterSaveDesign}
            savedDesignId={savedDesignId}
            checkedTerms={checkedTerms}
            setCheckedTerms={setCheckedTermsAction}
            setSaveDesignLoading={saveDesignLoadingAction}
            setSaveDesignChangesLoading={saveDesignChangesLoadingAction}
            saveDesignLoading={saveDesignLoading}
            saveDesignChangesLoading={saveDesignChangesLoading}
            goToCustomProductPage={this.goToCustomProductPage}
          />
          {tabSelected === CustomizeTabIndex && !loadingData && !isMobile ? (
            <BottomSheetWrapper>
              <SwipeableBottomSheet
                overflowHeight={64}
                open={openBottomSheet}
                overlayClicked={this.toggleBottomSheet}
                style={{ zIndex: 3 }}
              >
                <StyledTitle onClick={this.toggleBottomSheet}>
                  <FormattedMessage {...messages.inspirationTtitle} />
                </StyledTitle>
                <DesignCenterInspiration
                  styleId={currentStyle.id}
                  {...{ setPaletteAction: this.setPaletteEvent, formatMessage }}
                  hideBottomSheet={this.toggleBottomSheet}
                />
              </SwipeableBottomSheet>
            </BottomSheetWrapper>
          ) : (
            <div />
          )}
          {tabSelected === CustomizeTabIndex &&
          !loadingData &&
          isMobile &&
          !swipingView &&
          !loadingModel ? (
            <MobileDesignCenterInspiration
              styleId={currentStyle.id}
              open={openBottomSheet}
              setPaletteAction={this.setPaletteEvent}
              {...{ formatMessage }}
              hideList={this.toggleBottomSheet}
            />
          ) : null}
        </Container>
        <DesignCheckModal
          requestClose={openDesignCheckModalAction}
          handleActionButton={openDesignCheckModalAction}
          visible={designCheckModalOpen}
          {...{ formatMessage }}
        />
        <Modal
          visible={openOutWithoutSaveModal}
          title={
            <ModalTitle
              title={formatMessage(messages.outWithoutSaveModalTitle)}
            />
          }
          footer={[
            <StyledGhostButton
              key="cancel"
              onClick={this.handleOnCancelOutWithoutSaveModal}
            >
              {formatMessage(messages.outWithoutSaveDesignModalCancel)}
            </StyledGhostButton>,
            <StyledGhostButton
              key={'dontSave'}
              onClick={this.handleOnDontSaveOutWithoutSaveModal}
            >
              {formatMessage(messages.outWithoutSaveDesignModalDontSave)}
            </StyledGhostButton>,
            <StyledButton
              key={'save'}
              type="primary"
              onClick={this.handleOnSaveOutWithoutSaveModal}
            >
              {formatMessage(messages.outWithoutSaveDesignModalSave)}
            </StyledButton>
          ]}
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
        >
          <ModalMessage>
            {formatMessage(messages.outWithoutSaveDesignModalMessage)}
          </ModalMessage>
        </Modal>
      </Layout>
    )
  }

  handleOnSelectTheme = (id: number, name?: string) => {
    const { setThemeAction, dataProduct } = this.props
    if (dataProduct && dataProduct.product) {
      setThemeAction(id, dataProduct.product)
      const productSelected = get(dataProduct, 'product.name', '')
      window.dataLayer.push({
        event: SELECTED_PRODUCT,
        label: productSelected
      })
      window.dataLayer.push({
        event: SELECTED_THEME,
        label: name
      })
    }
  }
  handleOnGoBack = () => {
    const { setCurrentTabAction, currentTab, loadingModel } = this.props
    if (!loadingModel) {
      setCurrentTabAction(currentTab - 1)
    }
  }

  sendColorChartRequest = async (userInfo: UserInfo) => {
    const {
      requestColorChart,
      setSendingColorChartAction,
      formatMessage,
      onOpenColorChartFormAction
    } = this.props
    setSendingColorChartAction(true)
    try {
      const response = await requestColorChart({
        variables: { userInfo }
      })
      setSendingColorChartAction(false)
      onOpenColorChartFormAction(false)
      Message.success(get(response, 'data.requestColorChart.message', ''))
    } catch (e) {
      setSendingColorChartAction(false)
      Message.error(formatMessage(messages.colorChartRequestFailed))
    }
  }
  handleOnCloseColorChart = () => {
    const { onOpenColorChartAction } = this.props
    onOpenColorChartAction(false)
  }
  handleOnCloseColorChartForm = () => {
    const { onOpenColorChartFormAction } = this.props
    onOpenColorChartFormAction(false)
  }
  handleOnOpenColorChart = () => {
    const { onOpenColorChartAction } = this.props
    onOpenColorChartAction(true)
  }
  handleOnOpenFormChart = () => {
    const { onOpenColorChartAction, onOpenColorChartFormAction } = this.props
    onOpenColorChartAction(false)
    onOpenColorChartFormAction(true)
  }
}

interface OwnProps {
  location?: any
}

const mapStateToProps = (state: any) => {
  const layout = state.get('layout').toJS()
  const designCenter = state.get('designCenter').toJS()
  const app = state.get('app').toJS()
  const responsive = state.get('responsive').toJS()

  return { ...designCenter, ...app, responsive, layout }
}

const DesignCenterEnhance = compose(
  injectIntl,
  addTeamStoreItemMutation,
  withApollo,
  connect(
    mapStateToProps,
    {
      ...designCenterActions,
      ...designCenterApiActions,
      openQuickViewAction,
      openLoginAction,
      saveAndBuyAction
    }
  ),
  graphql<DataProduct>(getProductQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      return {
        skip: !queryParams.id,
        variables: { id: queryParams.id }
      }
    },
    name: 'dataProduct'
  }),
  graphql<DataDesign>(getDesignQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)

      return {
        skip: !queryParams.designId,
        variables: { designId: queryParams.designId },
        fetchPolicy: 'network-only'
      }
    },
    name: 'dataDesign'
  }),
  graphql(getColorsQuery, { name: 'colorsList' }),
  graphql(requestColorChartMutation, { name: 'requestColorChart' })
)(DesignCenter)

export default DesignCenterEnhance
