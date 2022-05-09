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
import unset from 'lodash/unset'
import Layout from '../../components/MainLayout'
import {
  COLOR_COMBO_SELECTED,
  SELECTED_THEME,
  SELECTED_FONT,
  SELECTED_COLOR,
  SELECTED_SYMBOL,
  SELECTED_PRODUCT,
  TABLET_RES,
  DESKTOP_RES,
  DATE_FORMAT,
  DIY_2D_PREVIEW,
} from '../../constants'
import {
  openQuickViewAction,
  openLoginAction,
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
  BackIcon,
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
  UserInfo,
  DesignLabInfo,
  ProAssistItem,
  UserType,
  User,
} from '../../types/common'
import {
  getProductQuery,
  addTeamStoreItemMutation,
  getDesignQuery,
  getColorsQuery,
  requestColorChartMutation,
  getDesignLabInfo,
  getVariantsFromProduct,
  getProAssist,
  getProTicket,
  getUserInfoQuery,
} from './data'
import backIcon from '../../assets/leftarrow.svg'
import DesignCenterInspiration from '../../components/DesignCenterInspiration'
import messages from './messages'
import ModalTitle from '../../components/ModalTitle'
import { defaultBindings, DesignTabs } from './constants'
import { DEFAULT_ROUTE } from '../../constants'
import DesignCheckModal from '../../components/DesignCheckModal'
import moment from 'moment'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import clone from 'lodash/clone'

const { warning } = Modal

interface DataProduct extends QueryProps {
  product?: Product
}

interface DataDesign extends QueryProps {
  designData?: DesignType
}

interface DataDesignLabInfo extends QueryProps {
  designInfo?: DesignLabInfo
}

interface DataUserInfo extends QueryProps {
  profileData?: User
}

interface ProAssistInfo extends QueryProps {
  proAssist?: ProAssistItem
}

interface Props extends RouteComponentProps<any> {
  dataProduct?: DataProduct
  dataDesign?: DataDesign
  dataDesignLabInfo?: DataDesignLabInfo
  dataUserInfo?: DataUserInfo
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
  selectedPredyed: string
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
  user: UserType
  responsive: Responsive
  originalPaths: any[]
  selectedItem: SelectedAsset
  layout: any
  infoModalOpen: boolean
  automaticSave: boolean
  selectedTab: number
  userId: number
  colorsList: any
  navigation: any
  dataVariants: any
  loadingPro: boolean
  ticket: string
  proAssist: ProAssistInfo
  openResetPlaceholderModal: boolean
  colorChartSending: boolean
  colorChartModalOpen: boolean
  colorChartModalFormOpen: boolean
  deliveryDays: number
  selectedVariant: number
  tutorialPlaylist: string
  designCheckModalOpen: boolean
  showGuidelines: boolean
  predyedChanged: boolean
  // Redux Actions
  clearStoreAction: () => void
  onClickGuides: (value: boolean) => void
  setPredyedColor: (predyedColor: string) => void
  selectVariantAction: (index: number) => void
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
  setLoadingPro: (loading: boolean) => void
  setTicketAction: (ticket: string, userId: number) => void
  getProTicketAction: () => Promise<MessagePayload>
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
  openDesignCheckModalAction: () => void
}

export class DesignCenter extends React.Component<Props, {}> {
  state = {
    isPhoneRes: false,
    isTabletRes: false,
    isDesktopRes: false,
    openBottomSheet: false,
    openPreviewModal: false,
    previewImage: '',
    previewProgress: 0,
    openedWarning: false
  }
  private saveClass: any
  componentWillUnmount() {
    const { clearStoreAction } = this.props
    clearStoreAction()
  }

  async componentDidMount() {
    const {
      designHasChanges,
      responsive,
      location: { search },
      intl: { formatMessage },
    } = this.props
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    LoadScripts(threeDScripts)
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
    if (window && window.screen) {
      const { width } = window.screen
      const isPhoneRes = width < TABLET_RES
      const isTabletRes = width >= TABLET_RES && width <= DESKTOP_RES
      const isDesktopRes = width > DESKTOP_RES
      this.setState({ isPhoneRes, isTabletRes, isDesktopRes })
    }
    const queryParams = queryString.parse(search)
    const { id, designId } = queryParams || {}
    if (id && !designId && defaultBindings[id]) {
      const { setAccessoryColorAction } = this.props
      const { value = 'black' } = defaultBindings[id] || {}
      setAccessoryColorAction(value, 'bindingColor')
    }
  }

  toggleBottomSheet = (evt: React.MouseEvent<EventTarget>) => {
    const open = !this.state.openBottomSheet
    this.setState({ openBottomSheet: open })
  }

  openPreview = async (savedDesign: SaveDesignType) => {
    const { openPreviewModal } = this.state
    if (this.saveClass && !openPreviewModal) {
      const { dataProduct, dataDesign } = this.props
      const designCode = get(dataDesign, 'designData.code', '')
      const productName = get(dataProduct, 'product.name', '')
      window.dataLayer.push({ event: DIY_2D_PREVIEW, label: designCode || productName })
      const instance = get(
        this.saveClass.getWrappedInstance(),
        'wrappedInstance.wrappedInstance.wrappedInstance',
        null
      )
      if (instance) {
        this.setState({ previewImage: '', openPreviewModal: true })
        setTimeout(() => this.setState({ previewProgress: 30 }), 700)
        setTimeout(() => this.setState({ previewProgress: 50 }), 1800)
        setTimeout(() => this.setState({ previewProgress: 80 }), 2000)
        setTimeout(() => this.setState({ previewProgress: 92 }), 3000)
        const result = await instance.generateSVG(savedDesign)
        const image = get(result, 'data.design.outputSvg', '')
        if (image) {
          this.setState({ previewImage: image, previewProgress: 100 })
        } else {
          this.setState({ openPreviewModal: false })
          Message.error('Error generating preview image.')
        }
      }
    } else {
      this.setState({ openPreviewModal: false, previewImage: '', previewProgress: 0 })
    }
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
      responsive,
    } = this.props
    const { isPhoneRes } = this.state
    saveDesignIdAction(id, svgUrl, design, updateColors)
    if (!goToCart) {
      const isMobile = (!!responsive && responsive.phone) || isPhoneRes
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
      location: { search },
    } = this.props
    const queryParams = queryString.parse(search)
    const productId = get(dataDesign, 'designData.product.id', queryParams.id)
    const { openQuickViewAction: openQuickView } = this.props
    openQuickView(productId)
  }

  handleClickGuides = () => {
    const { onClickGuides, showGuidelines } = this.props
    onClickGuides(!showGuidelines)
  }

  handleOnPressBack = () => {
    const { designHasChanges, openOutWithoutSaveModalAction } = this.props
    if (designHasChanges) {
      openOutWithoutSaveModalAction(true)
      return
    }
    history.back()
  }

  handleOnCancelOutWithoutSaveModal = () => {
    const { openOutWithoutSaveModalAction } = this.props
    openOutWithoutSaveModalAction(false)
  }

  handleOnDontSaveOutWithoutSaveModal = () => {
    const {
      openOutWithoutSaveModalAction,
      routeToGoWithoutSave,
      history,
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
      openOutWithoutSaveModalAction,
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
      designName,
    } = this.props

    const storeName = itemToAdd.team_store_name

    unset(itemToAdd, 'team_store_name')

    try {
      const { data } = await addItemToStore({
        variables: { teamStoreItem: itemToAdd, teamStoreId },
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
      intl: { formatMessage },
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
      design: get(style, 'name', ''),
    })
    setPaletteAction(colors)
  }

  setColorEvent = (color: string, colorName: string) => {
    const { setColorAction, style } = this.props
    window.dataLayer.push({
      event: SELECTED_COLOR,
      label: colorName,
      design: get(style, 'name', ''),
    })
    setColorAction(color)
  }

  setTextEvent = (key: string, value: string | number, fontStyle: boolean) => {
    const { setTextFormatAction, style } = this.props
    if (fontStyle) {
      window.dataLayer.push({
        event: SELECTED_FONT,
        label: value,
        design: get(style, 'name', ''),
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
        design: get(style, 'name', ''),
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
      setPredyedColor,
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
      selectVariantAction,
      selectedVariant,
      dataVariants,
      predyedChanged,
      selectedPredyed: storedPredyed,
      responsive: responsiveValues,
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
      showGuidelines,
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
      openDesignCheckModalAction,
      designCheckModalOpen,
      loadingPro,
      dataDesignLabInfo,
      dataUserInfo,
      ticket,
      userId,
      proAssist,
    } = this.props

    const { formatMessage } = intl
    const {
      openBottomSheet,
      isPhoneRes,
      isTabletRes,
      isDesktopRes,
      previewImage,
      openPreviewModal,
      previewProgress,
      openedWarning,
    } = this.state
    const {
      CustomizeTab: CustomizeTabIndex,
      PreviewTab: PreviewTabIndex,
      ThemeTab: ThemeTabIndex,
      StyleTab: StyleTabIndex,
    } = DesignTabs
    const { phone, tablet, desktop } = responsiveValues
    const responsive = {
      phone: phone || isPhoneRes,
      tablet: tablet || isTabletRes,
      desktop: desktop || isDesktopRes,
    }
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
    const variants = get(dataVariants, 'getVariants', [])
    const deliveryDaysResponse = get(
      dataDesignLabInfo,
      'designInfo.deliveryDays',
      ''
    )
    const deliveryDays = deliveryDaysResponse
      ? moment(deliveryDaysResponse).format('MMMM DD')
      : ''
    const tutorialPlaylist = get(
      dataDesignLabInfo,
      'designInfo.tutorialPlaylist',
      ''
    )
    const managerName = get(
      dataUserInfo,
      'profileData.userProfile.managerName',
      ''
    )
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
    const createdAtDesign = get(dataDesign, 'designData.createdAt', '')
    const triggerWarning = !!createdAtDesign && (
      ((productId === 262 || productId === '262') && moment(createdAtDesign, DATE_FORMAT).isBefore('02/23/2022')) ||
      ((productId === 265 || productId === '265') && moment(createdAtDesign, DATE_FORMAT).isBefore('02/22/2022'))
    )

    if (triggerWarning && !openedWarning) {
      this.setState({ openedWarning: true })
      warning({
        title: <strong>EDITING NOT AVAILABLE</strong>,
        width: 494,
        onOk: () => { history.goBack() },
        // tslint:disable-next-line: max-line-length
        content: 'This product has been updated and editing capabilities have been removed. Not to worry! Your design can still be added to your cart and ordered, but if you require changes to your design please contact our designers for assistance through the ProAssist chat M-F 6am-6pm PST.',
      })
      return null
    }
    const productName =
      get(dataProduct, 'product.name') ||
      get(dataDesign, 'designData.product.name', '')
    const canvasJson = get(dataDesign, 'designData.canvas')
    const styleId = get(dataDesign, 'designData.styleId')
    const highResolution = get(dataDesign, 'designData.highResolution')
    const proAssistId =
      ticket || get(proAssist, 'proAssistData.proAssistId', '')
    const userCode = userId || get(proAssist, 'proAssistData.user.id', '')
    const { email, name: firstName, lastName, id: loggedUserId } = user || {}
    const workingHours = get(dataDesignLabInfo, 'designInfo.workingHours', {})
    let designObject = design
    if (canvasJson) {
      designObject = { ...designObject, canvasJson, styleId, highResolution }
    }
    let tabSelected =
      !tabChanged && !dataProduct ? CustomizeTabIndex : currentTab
    let loadingData = true && !dataProduct
    let isEditing = !!dataDesign
    let productConfig = clone(product)
    let currentStyle = style
    let originPredyed = storedPredyed
    let proDesignModel
    if (dataDesign && dataDesign.designData) {
      const { designData } = dataDesign
      const {
        shortId: designId,
        colors: designColors = [],
        style: designStyle,
        predyedName,
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
        proCertified,
        image: designImage,
        canvas: designCanvas,
        outputSvg,
      } = designData
      if (predyedName) {
        originPredyed = predyedName
      }
      const designConfig = {
        flatlockCode,
        flatlockColor,
        bibBraceColor: bibBraceAccesoryColor,
        bindingColor: bindingAccesoryColor,
        zipperColor: zipperAccesoryColor,
      }
      tabSelected = !tabChanged ? CustomizeTabIndex : currentTab
      loadingData = !!dataDesign.loading
      productConfig = clone(designProduct)
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
          proDesign,
          proCertified,
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
          zipperColor: zipperAccesoryColor,
        }
        tabSelected = PreviewTabIndex
      }
    }
    const selectedPredyed = predyedChanged ? storedPredyed : originPredyed
    if (selectedVariant !== -1) {
      const { obj, mtl } = variants[selectedVariant]
      productConfig.obj = obj
      productConfig.mtl = mtl
    }
    const loadingView = (
      <LoadingContainer>
        <Spin />
      </LoadingContainer>
    )

    const bindingDefault = defaultBindings[productId] || {}
    const { name: bindingName } = bindingDefault || {}

    const isUserAuthenticated = !!user
    const predyedColor =
      productConfig && productConfig.hasPredyed ? selectedPredyed : null
    return (
      <Layout
        {...{ history, intl }}
        hideBottomHeader={true}
        disableAssist={true}
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
                  style={queryParams.style}
                  {...{
                    loadingModel,
                    history,
                    themeModalData,
                    openNewThemeModalAction,
                    designHasChanges,
                    formatMessage,
                    productId,
                    isMobile,
                    placeholders,
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
                  design={queryParams.design}
                  {...{
                    styleModalData,
                    openNewStyleModalAction,
                    designHasChanges,
                    formatMessage,
                    history,
                    styleIndex,
                    productId,
                    themeId,
                    isMobile,
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
                  previewImage,
                  openPreviewModal,
                  previewProgress,
                  productName,
                  canvas,
                  selectedElement,
                  selectVariantAction,
                  selectedVariant,
                  variants,
                  selectedPredyed,
                  textFormat,
                  artFormat,
                  managerName,
                  bindingName,
                  proAssistId,
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
                  showGuidelines,
                  setPredyedColor,
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
                  tutorialPlaylist,
                  loggedUserId,
                  userCode,
                }}
                openPreview={this.openPreview}
                designId={get(dataDesign, 'designData.shortId', '')}
                userEmail={email}
                name={firstName}
                lastName={lastName}
                callbackToSave={get(layout, 'callback', false)}
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
                onClickGuides={this.handleClickGuides}
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
                  bibColor,
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
            ref={(saveClass: any) => {
              this.saveClass = saveClass
            }}
            {...{
              productId,
              formatMessage,
              colors,
              colorsList,
              stitchingColor,
              bindingColor,
              zipperColor,
              bibColor,
              canvas,
              designName,
              selectedPredyed,
              isUserAuthenticated,
              isEditing,
              isMobile,
              predyedColor,
              automaticSave,
              setAutomaticSave,
            }}
            productMpn={get(product, 'mpn', '')}
            design={!!design.canvasJson ? design : designObject}
            hasFlatlock={!!productConfig && !!productConfig.flatlock}
            hasZipper={!!productConfig && !!productConfig.zipper}
            hasBinding={!!productConfig && !!productConfig.binding}
            hasBibBrace={!!productConfig && !!productConfig.bibBrace}
            hasBranding={!!productConfig && !!productConfig.branding}
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
          handleGetPro={this.handleGetPro}
          requestClose={openDesignCheckModalAction}
          visible={designCheckModalOpen}
          {...{ formatMessage, loadingPro, workingHours }}
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
            </StyledButton>,
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
        label: productSelected,
      })
      window.dataLayer.push({
        event: SELECTED_THEME,
        label: name,
      })
    }
  }

  handleGetPro = async () => {
    const {
      getProTicketAction,
      setLoadingPro,
      openLoginAction: openLoginModalAction,
      user,
      intl: { formatMessage },
      setTicketAction,
    } = this.props
    if (user) {
      try {
        setLoadingPro(true)
        const response = await getProTicketAction()
        const ticket = get(response, 'data.newProAssist.ticket', '')
        const userId = get(response, 'data.newProAssist.user.id', '')
        setTicketAction(ticket, userId)
      } catch (e) {
        Message.error(e)
        setLoadingPro(false)
      }
    } else {
      Message.warning(formatMessage(messages.loggedError))
      openLoginModalAction(true, true)
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
      onOpenColorChartFormAction,
    } = this.props
    setSendingColorChartAction(true)
    try {
      const response = await requestColorChart({
        variables: { userInfo },
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
  dataDesign?: any
  user?: UserType
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
  getProTicket,
  withApollo,
  connect(
    mapStateToProps,
    {
      ...designCenterActions,
      ...designCenterApiActions,
      openQuickViewAction,
      openLoginAction,
      saveAndBuyAction,
    }
  ),
  graphql<DataProduct>(getProductQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      return {
        skip: !queryParams.id,
        variables: { id: queryParams.id },
      }
    },
    name: 'dataProduct',
  }),
  graphql<DataDesign>(getDesignLabInfo, {
    options: () => ({
      fetchPolicy: 'network-only',
      variables: {
        date: {
          day: moment().date(),
          month: moment().month(),
          year: moment().year(),
        },
      },
    }),
    name: 'dataDesignLabInfo',
  }),
  graphql<DataDesign>(getUserInfoQuery, {
    options: ({ user }: OwnProps) => ({
      skip: !user || (user && !user.id),
    }),
    name: 'dataUserInfo',
  }),
  graphql<DataDesign>(getDesignQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)

      return {
        skip: !queryParams.designId,
        variables: { designId: queryParams.designId },
        fetchPolicy: 'network-only',
      }
    },
    name: 'dataDesign',
  }),
  graphql(getVariantsFromProduct, {
    options: ({ dataDesign, location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      const productId = get(dataDesign, 'designData.product.id', queryParams.id)
      return {
        fetchPolicy: 'network-only',
        skip: !productId,
        variables: {
          id: productId,
        },
      }
    },
    name: 'dataVariants',
  }),
  graphql(getProAssist, {
    name: 'proAssist',
    options: ({ user }: OwnProps) => ({
      fetchPolicy: 'network-only',
      skip: !user,
    }),
  }),
  graphql(getColorsQuery, { name: 'colorsList' }),
  graphql(requestColorChartMutation, { name: 'requestColorChart' })
)(DesignCenter)

export default DesignCenterEnhance
