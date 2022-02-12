/**
 * IntakeForm Screen - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, graphql, withApollo } from 'react-apollo'
import messages from './messages'
import get from 'lodash/get'
import zenscroll from 'zenscroll'
import draftToHtml from 'draftjs-to-html'
import message from 'antd/lib/message'
import DesignCenterHeader from '../../components/DesignCenterHeader'
import { Moment } from 'moment'
import Layout from '../../components/MainLayout'
import {
  saveProject,
  renameFile,
  GetColorsQuery,
  GetColorPalettes,
  profileSettingsQuery,
  addProductsProjectMutation
} from './data'
import SwipeableViews from 'react-swipeable-views'
import * as intakeFormActions from './actions'
import * as apiActions from './api'
import Modal from 'antd/lib/modal'
import queryString from 'query-string'
import loaderModern from '../../assets/loadermodern.gif'
import vector from '../../assets/vector.svg'
import raster from '../../assets/raster.png'
import ProductCatalogue from '../../components/ProductCatalogue'
import SuccessModal from '../../components/SuccessModal'
import Tabs from '../../components/IntakeFormTabs'
import { connect } from 'react-redux'
import MobileMenuNav from './MobileMenuNav'
import Menu from './Menu'
import Inspiration from './Inspiration'
import Colors from './Colors'
import Files from './Files'
import DesignPathway from './DesignPathway'
import Notifications from './Notifications'
import Review from './Review'
import Notes from './Notes'
import {
  openLoginAction
} from '../../components/MainLayout/actions'
import InspirationModal from '../../components/InspirationModal'
import { 
  profileNotificationSettingsQuery, 
  profilePhoneSettingsQuery,
  UpdateNotificationSettingMutation,
  UpdatePhoneSettingMutation, 
} from '../../components/Notifications/Preferences/data'
import { RouteComponentProps } from 'react-router-dom'
import {
  IntakeContainer,
  Title,
  TopNavHeader,
  ModalTitle,
  InfoBody,
  buttonStyle,
  Subtitle,
  FileTitle,
  ComparisonDiv,
  RasterDiv,
  RasterImage,
  RasterText,
  RasterContent,
  BottomText,
  ModalIcon,
  InfoText,
  SubTopDiv,
  SavingDiv,
  LoaderImg
} from './styledComponents'
import {
  Responsive,
  InspirationType,
  ImageFile,
  UserType,
  MessagePayload,
  Product,
  ColorsDataResult,
  QueryProps,
  ProDesignPalette,
  IProfileSettings,
  User,
  DesignType,
  NotificationOption
} from '../../types/common'
import {
  Sections,
  titleTexts,
  CUSTOM_PALETTE_INDEX,
  SELECTED_LCOKER_FILES,
  SELECTED_FILES,
  INSPIRATION_SELECTEED_ITEMS
} from './constants'
import ReactDOM from 'react-dom'
import LockerScreen from './LockerScreen'
import Helmet from 'react-helmet'
import { NotificationSetting, PhoneSetting } from '../../components/Notifications/Preferences'
import SMSAlertsModal from '../../components/SMSAlertsModal'

const { info, confirm } = Modal

interface DataColor extends QueryProps {
  rows: ProDesignPalette[]
}

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  responsive: Responsive
  selectedItems: Product[]
  currentScreen: number
  inspirationPage: number
  dataColor: DataColor
  inspirationSkip: number
  profileData: ProfileData
  inspiration: InspirationType[]
  inspirationTotal: number
  inspirationLoading: boolean
  inspirationSelectedItems: number[]
  selectedColors: string[]
  selectedPrimaryColor: string[]
  selectedEditColors: string[]
  selectedEditPrimaryColor: string[]
  selectedPaletteIndex: number
  uploadingFile: boolean
  selectedFiles: ImageFile[]
  lockerSelectedFiles: ImageFile[]
  userLockerModalOpen: boolean
  user?: UserType
  selectedTeamSize: string
  projectDescription: string
  projectName: string
  phone: string
  estimatedDate: string
  estimatedDateMoment: Moment
  sendSms: boolean
  sendEmail: boolean
  savingIntake: boolean
  successModal: boolean
  smsAlertsModal: boolean
  expandedInspiration: boolean
  expandedInspirationOpen: boolean
  fromScratch: boolean
  currentCurrency: string
  inspirationTags: string[]
  inspirationFilters: string[]
  projectCategories: string[]
  renameFileOpen: boolean
  fileIdToRename: string
  newFileName: string
  renamingFile: boolean
  fileTermsAccepted: boolean
  openBuild: boolean
  colorsList: ColorsDataResult
  validLength: boolean
  highlight: boolean
  fromDesign: boolean
  limit: number
  offset: number
  currentPage: number
  selectedDesign: string
  lockerDesign: DesignType
  adminProjectUserId: string
  userToSearch: string
  prepopulateUserText: string
  notificationSettings: NotificationSetting
  phoneSettings: PhoneSetting
  setDesignSelectedAction: (id: string, design: DesignType) => void
  setPaginationDataAction: (offset: number, page: number) => void
  setHighlight: (active: boolean) => void
  addProductsProject: (variable: {}) => Promise<MessagePayload>
  selectElementAction: (elementId: number | string, listName: string, index?: number) => void
  deselectElementAction: (elementId: number | string, listName: string, key?: number) => void
  goToPage: (page: number) => void
  setInspirationPageAction: (skip: number, newPage: number) => void
  setInspirationDataAction: (data: InspirationType[], fullCount: number, reset: boolean) => void
  setInspirationLoadingAction: (loading: boolean) => void
  selectPaletteAction: (primaryColor: string, accentColors: string[], index: number) => void
  uploadFileAction: (file: File, blurScore: number) => void
  openUserLockerAction: (open: boolean) => void
  openLoginAction: (open: boolean, callback?: boolean) => void
  setFileAction: (file: ImageFile, listName: string) => void
  onAddItemsAction: () => void
  deselectLockerItemAction: (elementId: number, listName: string) => void
  onSelectTeamSizeAction: (size: string) => void
  onSetInputAction: (key: string, value: string) => void
  onSelectDateAction: (dateMoment: Moment | null, date: string) => void
  onCheckSmsChangeAction: (checked: boolean) => void
  onCheckEmailChangeAction: (checked: boolean) => void
  createProject: (variables: {}) => Promise<MessagePayload>
  onSetSavingIntake: (saving: boolean) => void
  onSetSuccessModalOpen: (open: boolean) => void
  onSetSMSAlertsModalOpen: (open: boolean) => void
  onExpandInspirationAction:
  (inspirationId: number, image: string, name: string, isSelected: boolean, tags: string[]) => void
  onCloseInspirationAction: () => void
  setFromScratchAction: (fromScratch: boolean) => void
  setFromDesignAction: (fromDesign: boolean) => void
  resetColorSelectionAction: () => void
  setOpenBuild: (open: boolean) => void
  selectProductAction: (product: Product) => void
  addTagAction: (value: string) => void
  removeTagAction: (value: string) => void
  resetInspirationDataAction: () => void
  removeFromListAction: (listName: string, name: string) => void
  addToListAction: (listName: string, name: string) => void
  setDescriptionAction: (contentState: string | null, validLength: boolean) => void
  openRenameModalAction: (open: boolean, id?: number) => void
  onRenameChangeAction: (value: string) => void
  renameFileName: (variables: {}) => Promise<MessagePayload>
  onSetRenamingFile: (loading: boolean) => void
  changeLocalNameAction: (id: number, value: string) => void
  setFileTermsAction: (checked: boolean) => void
  setAdminProjectUserIdAction: (userId: string, prepopulateUserText: string) => void
  setUserToSearchAction: (value: string) => void
  updateNotification: (variables: {}) => void
  updatePhone: (variables: {}) => void
}

export class IntakeFormPage extends React.Component<Props, {}> {
  swipeableActions = null
  state = {
    isMobile: false,
    retrySave: false,
    isTablet: false,
    richTextEditorReady: false
  }
  private intakeRef: any
  componentDidMount() {
    const { location, selectedItems, selectProductAction, setAdminProjectUserIdAction } = this.props
    if (location.state && !selectedItems.length) {
      const { state: { product } } = location
      selectProductAction(product)
    }
    const isMobile = window.matchMedia(
      '(min-width: 320px) and (max-width: 480px)'
    ).matches
    const isTablet = window.matchMedia(
      '(min-width: 481px) and (max-width: 1024px)'
    ).matches
    if (typeof window !== undefined) {
      this.setState({
        richTextEditorReady: true,
      })
    }
    this.setState({ isMobile, isTablet })
    const { location: { search }, goToPage } = this.props
    const queryParams = queryString.parse(search)
    const { id: projectId, admProject, user: adminSelectedUser } = queryParams || {}
    if (!!projectId || !!admProject) {
      goToPage(Sections.PRODUCTS)

      if (!!adminSelectedUser) {
        const prepopulateUserText = window.sessionStorage.getItem(adminSelectedUser) || ''
        window.sessionStorage.removeItem(adminSelectedUser)

        setAdminProjectUserIdAction(adminSelectedUser, prepopulateUserText)
      }
    }
  }
  componentDidUpdate(oldProps: Props) {
    const { user: oldUser } = oldProps
    const { user, fromDesign } = this.props
    const { retrySave } = this.state
    if (retrySave && oldUser !== user && user) {
      this.setState({ retrySave: false })
      this.handleOnContinue(fromDesign)
    }
  }
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleFromScratch = () => {
    const { setFromScratchAction } = this.props
    setFromScratchAction(true)
    this.handleOnContinue()
  }

  handleFromDesign = () => {
    const { setFromDesignAction, user } = this.props
    if (!user) {
      this.setState({ retrySave: true })
      this.handleOnOpenLogin()
      return
    }
    setFromDesignAction(true)
    this.handleOnContinue(true)
  }

  showInspirationModal = () => {
    const { intl: { formatMessage } } = this.props
    const title = formatMessage(messages.inspiration)
    const body = [
      formatMessage(messages.inspirationBody),
      <Subtitle key={1} small={true} action={true}>
        {formatMessage(messages.inspirationTip)}
      </Subtitle>
    ]
    const accept = formatMessage(messages.gotIt)
    this.showAlert(title, body, accept)
  }

  handleFromExistingArtwork = () => {
    const { setFromScratchAction } = this.props
    setFromScratchAction(false)
    this.handleOnContinue()
  }

  handleOnRenameFileName = async () => {
    const {
      renameFileName,
      onSetRenamingFile,
      openRenameModalAction,
      changeLocalNameAction
    } = this.props
    onSetRenamingFile(true)
    try {
      const { fileIdToRename, newFileName } = this.props
      const results = await renameFileName({
        variables: { id: fileIdToRename, value: newFileName }
      })
      const successMessage = get(results, 'data.renameFileName.message')
      message.success(successMessage)
      changeLocalNameAction(fileIdToRename, newFileName)
      onSetRenamingFile(false)
      openRenameModalAction(false)
    } catch (e) {
      onSetRenamingFile(false)
      message.error(
        `Something wrong happened. Please try again! ${e.message}`
      )
    }
  }

  addManyProducts = async () => {
    const { selectedItems, onSetSavingIntake, addProductsProject, location: { search } } = this.props
    try {
      onSetSavingIntake(true)
      const queryParams = queryString.parse(search)
      const { id: projectId, admUser } = queryParams || {}

      const products = selectedItems.map(({ id }) => id)
      const results = await addProductsProject({
        variables: { projectId, products, admUser }
      })
      const successMessage = get(results, 'data.addProductsProject.message')
      message.success(successMessage)
      window.location.href = `/admin/kanban?id=${projectId}`
    } catch (e) {
      message.error(
        `Something wrong happened. Please try again! ${e.message}`
      )
    } finally {
      onSetSavingIntake(false)
    }
  }

  handleOnContinue = async (designMode?: boolean) => {
    const {
      goToPage,
      location: { search },
      currentScreen,
      selectedItems,
      user,
      fromDesign: fromLocker,
      fromScratch,
      history,
      intl: { formatMessage }
    } = this.props
    const { isMobile, isTablet } = this.state
    const queryParams = queryString.parse(search)
    const { id: projectId, admUser, admProject } = queryParams || {}
    const productId = get(selectedItems, '[0].id', '')
    const fromDesign = designMode || fromLocker
    if (!!admUser && !!projectId) {
      return confirm({
        icon: ' ',
        className: 'centeredButtons',
        okText: formatMessage(messages.addToProject),
        okButtonProps: {
          style: buttonStyle
        },
        onOk: async () => await this.addManyProducts(),
        content:
          <RasterContent>
            <InfoText
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.addMany, { count: selectedItems.length })
              }}
            />
          </RasterContent>
      })
    }
    if (!!projectId && !!productId && !admUser) {
      return history.push(`/approval?project=${projectId}&product=${productId}`)
    }
    if (isMobile || isTablet) {
      const node = ReactDOM.findDOMNode(this.intakeRef) as HTMLElement
      const intakeScroller = zenscroll.createScroller(node, 0)
      intakeScroller.toY(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
    if (currentScreen !== Sections.REVIEW) {
      if (currentScreen === Sections.LOCKER && fromDesign) {
        return goToPage(Sections.PRODUCTS)
      }
      if (currentScreen === Sections.PATHWAY && fromDesign) {
        return goToPage(Sections.LOCKER)
      }
      if (currentScreen === Sections.PRODUCTS) {
        if (!fromScratch || fromDesign) {
          return goToPage(currentScreen + 3)
        } else if (!!admProject) {
          return goToPage(Sections.COLORS)
        }
        if (fromScratch && !admProject && (isMobile || isTablet)) {
          this.showInspirationModal()
        }
      }
      if (currentScreen === Sections.COLORS && !!admProject) {
        return goToPage(Sections.NOTES)
      }
      return goToPage(currentScreen + 1)
    }
    if (!user) {
      this.setState({ retrySave: true })
      this.handleOnOpenLogin()
      return
    }
    const {
      selectedPaletteIndex,
      inspirationSelectedItems,
      selectedColors,
      selectedPrimaryColor,
      selectedEditColors,
      selectedEditPrimaryColor,
      selectedFiles,
      selectedTeamSize,
      projectDescription,
      projectName,
      phone,
      selectedDesign,
      estimatedDate,
      sendSms,
      sendEmail,
      projectCategories,
      adminProjectUserId,
      notificationSettings: { notificationData },
      phoneSettings: { phoneData },
      savingIntake,
      createProject,
      onSetSavingIntake,
      onSetSuccessModalOpen,
      onSetSMSAlertsModalOpen
    } = this.props
    onSetSavingIntake(true)
    const primary = selectedPaletteIndex === CUSTOM_PALETTE_INDEX
      ? selectedPrimaryColor[0] : selectedEditPrimaryColor[0]
    const accents = selectedPaletteIndex === CUSTOM_PALETTE_INDEX
      ? selectedColors : selectedEditColors
    const palette = {
      primary_color: primary,
      accent_1: accents.length >= 0 ? accents[0] : null,
      accent_2: accents.length >= 1 ? accents[1] : null,
      accent_3: accents.length >= 2 ? accents[2] : null
    }

    let contentState = null
    try {
      contentState = JSON.parse(projectDescription)
    } catch (e) {
      console.error('Error ', e)
    }

    const proDesignProject = {
      name: projectName,
      phone,
      notes: draftToHtml(contentState),
      teamSize: selectedTeamSize,
      deliveryDate: estimatedDate,
      sendEmail,
      selectedDesign,
      sendSms,
      files: selectedFiles.map((file) => file.id),
      products: selectedItems.map((item) => item.id),
      inspiration: inspirationSelectedItems,
      palette,
      fromScratch,
      categories: projectCategories
    }
    if (!savingIntake) {
      try {
        const results = await createProject({
          variables: {
            proDesignProject,
            admProject,
            userId: admProject ? adminProjectUserId : ''
          }
        })
        const successMessage = get(results, 'data.createProDesignProject.message')
        message.success(successMessage)
        if (!admProject) {
          if (notificationData &&
            (notificationData.notifyProDesign === NotificationOption.BOTH || 
            notificationData.notifyProDesign === NotificationOption.SMS) &&
            phoneData && phoneData.phone) {
            onSetSuccessModalOpen(true)
          } else {
            onSetSMSAlertsModalOpen(true)
          }
        } else {
          window.location.href = `/admin/prodesign-dashboard`
        }
        onSetSavingIntake(false)
      } catch (e) {
        onSetSavingIntake(false)
        message.error(
          `Something wrong happened. Please try again! ${e.message}`
        )
      }
    }
  }

  handleOnPrevious = () => {
    const { goToPage, currentScreen, fromScratch, fromDesign, setFromDesignAction, location: { search } } = this.props
    const queryParams = queryString.parse(search)
    const { admProject } = queryParams || {}
    if (currentScreen === Sections.COLORS && admProject) {
      return goToPage(Sections.PRODUCTS)
    }
    if (currentScreen === Sections.NOTES && admProject) {
      return goToPage(Sections.COLORS)
    }
    if (currentScreen === Sections.PRODUCTS && fromDesign) {
      return goToPage(Sections.LOCKER)
    }
    if (currentScreen === Sections.FILES && (!fromScratch || fromDesign)) {
      return goToPage(currentScreen - 3)
    }
    if (currentScreen === Sections.LOCKER && fromDesign) {
      setFromDesignAction(false)
      return goToPage(Sections.PATHWAY)
    }
    return goToPage(currentScreen - 1)
  }

  handleOnSelectTab = (selectedTab: number) => {
    const { goToPage } = this.props
    goToPage(selectedTab)
  }

  handleOnOpenLogin = () => {
    const { openLoginAction: openLoginModalAction } = this.props
    openLoginModalAction(true)
  }

  getNavButtonsValidation = (screen?: number) => {
    const {
      currentScreen,
      selectedItems = [],
      inspirationSelectedItems,
      selectedPaletteIndex,
      selectedColors,
      selectedEditColors,
      selectedDesign,
      adminProjectUserId,
      fromDesign,
      selectedPrimaryColor,
      selectedEditPrimaryColor,
      user,
      validLength,
      projectName,
      location: { search },
      selectedTeamSize,
      estimatedDate,
      projectDescription,
      intl: { formatMessage },
      fromScratch,
      fileTermsAccepted
    } = this.props
    const continueButtonText = currentScreen ===
      Sections.REVIEW ? formatMessage(messages.submitButtonText) :
      formatMessage(messages.continueButtonText)
    const queryParams = queryString.parse(search)
    const { id: projectId, admProject } = queryParams || {}
    const previousButtonText = formatMessage(messages.previousButtonText)
    const quantities = selectedItems.reduce((sum, product) => sum + product.quantity, 0)
    switch (screen || currentScreen) {
      case Sections.LOCKER:
        return {
          continueDisable: !selectedDesign && fromDesign,
          continueButtonText,
          previousButtonText
        }
      case Sections.PRODUCTS:
        return {
          continueDisable: selectedItems.length < 1 || (!admProject && quantities > 5),
          showPreviousButton: !projectId && !admProject,
          continueButtonText,
          previousButtonText
        }
      case Sections.PATHWAY:
        return {
          showPreviousButton: false,
          showContinueButton: false,
          continueButtonText,
          previousButtonText
        }
      case Sections.INSPIRATION:
        return {
          showPreviousButton: true,
          continueDisable: fromScratch && inspirationSelectedItems.length < 1,
          previousDisable: false,
          continueButtonText,
          previousButtonText
        }
      case Sections.COLORS:
        return {
          continueDisable:
            !admProject && fromScratch &&
            (selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
              (selectedColors.length === 0 || selectedPrimaryColor.length === 0) :
              (selectedEditColors.length === 0 || selectedEditPrimaryColor.length === 0)
            ),
          showPreviousButton: true,
          continueButtonText,
          previousButtonText
        }
      case Sections.FILES:
        return {
          continueDisable: (!fromScratch && !user) || !fileTermsAccepted,
          showPreviousButton: true,
          continueButtonText,
          previousButtonText
        }
      case Sections.NOTES:
        return {
          continueDisable: !projectName || !projectDescription || !validLength || (!!admProject && !adminProjectUserId),
          showPreviousButton: true,
          continueButtonText,
          previousButtonText
        }
      case Sections.NOTIFICATIONS:
        return {
          continueDisable: !selectedTeamSize
            || !estimatedDate,
          showPreviousButton: true,
          continueButtonText,
          previousButtonText
        }
      case Sections.REVIEW:
        return {
          continueButtonText,
          previousButtonText
        }
      default:
        return {}
    }
  }

  handleOnSelectLockerFile = (file: ImageFile) => {
    const { setFileAction } = this.props
    setFileAction(file, SELECTED_LCOKER_FILES)
  }

  handleOnDeselectLockerFile = (elementId: number) => {
    const { deselectLockerItemAction } = this.props
    deselectLockerItemAction(elementId, SELECTED_LCOKER_FILES)
  }

  handleOnDeleteImage = (elementId: number) => {
    const { deselectLockerItemAction } = this.props
    deselectLockerItemAction(elementId, SELECTED_FILES)
  }

  handleOnReturnHome = () => {
    const { onSetSuccessModalOpen } = this.props
    onSetSuccessModalOpen(false)
    window.location.replace(`/account?option=proDesignProjects`)
  }

  handleOnSMSAlertsClose = () => {
    const { onSetSMSAlertsModalOpen, onSetSuccessModalOpen } = this.props
    onSetSMSAlertsModalOpen(false)
    onSetSuccessModalOpen(true)
  }

  handleOnPressBack = () => {
    const { location: { search } } = this.props
    const queryParams = queryString.parse(search)
    const { admProject } = queryParams || {}
    if (admProject) {
      window.location.href = `/admin/prodesign-dashboard`
    } else {
      window.location.replace('/')
    }
  }

  handleOnselectElementAction = (elementId: number | string, listName: string, index?: number) => {
    const {
      selectElementAction,
      onCloseInspirationAction,
      inspirationSelectedItems
    } = this.props
    switch (listName) {
      case INSPIRATION_SELECTEED_ITEMS: {
        if (inspirationSelectedItems.length < 5) {
          onCloseInspirationAction()
          return selectElementAction(elementId, listName, index)
        }
        return
      }
      default:
        return selectElementAction(elementId, listName, index)
    }
  }

  handleOnselectProductAction = (product: Product) => {
    const { selectProductAction, location: { search }, selectedItems, intl: { formatMessage } } = this.props
    const queryParams = queryString.parse(search)
    const { id: projectId, admUser, admProject } = queryParams || {}
    if (admProject || (selectedItems.length < (!!projectId && !admUser ? 1 : 5))) {
      return selectProductAction(product)
    }
    const title = formatMessage(messages.maxProductsTitle)
    const body = formatMessage(messages[!projectId ? 'maxProductsBody' : 'maxProductsOne'])
    const accept = formatMessage(messages.gotIt)
    this.showAlert(title, body, accept)
  }

  showAlert = (title: string, bodyNodes: string[] | string, accept: string) => {
    const { intl: { formatMessage }, currentScreen } = this.props
    switch (currentScreen) {
      case Sections.FILES:
        info({
          icon: ' ',
          width: 762,
          title: (
            <FileTitle
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.fileTitle)
              }}
            />
          ),
          okText: accept || formatMessage(messages.gotIt),
          cancelText: 'Cancel',
          okButtonProps: {
            style: buttonStyle
          },
          content:
            <RasterContent>
              <ComparisonDiv>
                <RasterDiv>
                  <RasterImage src={vector} />
                  <RasterText
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.vectorBody)
                    }}
                  />
                </RasterDiv>
                <RasterDiv>
                  <RasterImage src={raster} />
                  <RasterText
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.rasterBody)
                    }}
                  />
                </RasterDiv>
              </ComparisonDiv>
              <BottomText>{formatMessage(messages.rasterService)}</BottomText>
            </RasterContent>
        })
        break
      default: {
        const render =
          typeof bodyNodes !== 'string' ? bodyNodes.map((node, index) => <InfoBody key={index}>{node}</InfoBody>)
            : <InfoBody dangerouslySetInnerHTML={{ __html: bodyNodes }} />
        info({
          title: (
            <ModalTitle>
              {title}
            </ModalTitle>
          ),
          okText: accept || formatMessage(messages.gotIt),
          cancelText: 'Cancel',
          okButtonProps: {
            style: buttonStyle
          },
          content: render
        })
      }
        // tslint:disable-next-line: align
        break
    }
  }

  showMissingFields = () => {
    const {
      currentScreen,
      fileTermsAccepted,
      selectedItems,
      location: {
        search
      },
      projectName,
      validLength,
      intl: { formatMessage }
    } = this.props
    let highlight = false
    let scrollCoords = 0
    const quantities = selectedItems.reduce((sum, product) => sum + product.quantity, 0)
    const queryParams = queryString.parse(search)
    const { id: projectId } = queryParams || {}
    switch (currentScreen) {
      case Sections.PRODUCTS:
        if (quantities > 5 || selectedItems.length < 1) {
          const title = formatMessage(messages.maxProductsTitle)
          const body = formatMessage(messages[!projectId ? 'maxProductsBody' : 'maxProductsOne'])
          const accept = formatMessage(messages.gotIt)
          this.showAlert(title, body, accept)
        }
        break
      case Sections.FILES:
        highlight = !fileTermsAccepted
        scrollCoords = 150
        break
      case Sections.NOTES:
        highlight = !validLength || !projectName
        scrollCoords = !projectName ? 30 : 80
        break
      default:
        highlight = false
    }
    if (highlight) {
      this.showHighlight(highlight, scrollCoords)
      message.error(formatMessage(messages.missingField))
    }
  }

  handleChangeQuantity = (key: number) => {
    const { selectedItems } = this.props
    this.handleOnselectProductAction(selectedItems[key])
  }

  changePage = (pageParam: number = 1) => {
    const { limit } = this.props
    const offsetParam = pageParam > 1 ? (pageParam - 1) * limit : 0
    const {
      offset: offsetProp,
      currentPage: pageProp,
      setPaginationDataAction
    } = this.props
    let offset = offsetParam !== undefined ? offsetParam : offsetProp
    let currentPage = pageParam !== undefined ? pageParam : pageProp

    if (!offsetParam && !pageParam) {
      const fullPage = !(offset % limit)
      const maxPageNumber = offset / limit

      if (fullPage && currentPage > maxPageNumber) {
        currentPage--
        offset = currentPage > 1 ? (currentPage - 1) * limit : 0
      }
    }

    setPaginationDataAction(offset, currentPage)
  }

  showHighlight = (active: boolean, coords: number) => {
    const { setHighlight } = this.props
    const { isTablet, isMobile } = this.state
    if (isTablet || isMobile) {
      const node = ReactDOM.findDOMNode(this.intakeRef) as HTMLElement
      const intakeScroller = zenscroll.createScroller(node, 0)
      intakeScroller.toY(coords, 50)
    } else {
      window.scrollTo(0, coords)
    }
    setHighlight(active)
  }

  showTips = () => {
    const { intl: { formatMessage }, currentScreen } = this.props
    const title = formatMessage(messages[titleTexts[currentScreen].tipTitle])
    const body = formatMessage(messages[titleTexts[currentScreen].tipBody])
    const accept = formatMessage(messages[titleTexts[currentScreen].tipAccept])

    this.showAlert(title, body, accept)
  }

  render() {
    const {
      intl: { formatMessage },
      intl,
      history,
      responsive,
      selectedItems,
      currentScreen,
      inspirationPage,
      inspirationSkip,
      inspiration,
      currentPage,
      limit,
      offset,
      selectedDesign,
      setDesignSelectedAction,
      inspirationTotal,
      inspirationLoading,
      inspirationSelectedItems,
      selectedColors,
      selectedPrimaryColor,
      selectedPaletteIndex,
      selectedEditColors,
      selectedEditPrimaryColor,
      uploadingFile,
      selectedFiles,
      userLockerModalOpen,
      highlight,
      user,
      dataColor,
      setOpenBuild,
      openBuild,
      lockerSelectedFiles,
      selectedTeamSize,
      projectDescription,
      projectName,
      phone,
      estimatedDate,
      estimatedDateMoment,
      sendSms,
      sendEmail,
      savingIntake,
      successModal,
      smsAlertsModal,
      fromDesign,
      lockerDesign,
      expandedInspiration,
      expandedInspirationOpen,
      fromScratch,
      location: {
        search
      },
      currentCurrency,
      inspirationTags,
      inspirationFilters,
      projectCategories,
      renameFileOpen,
      fileIdToRename,
      newFileName,
      renamingFile,
      fileTermsAccepted,
      colorsList,
      validLength,
      notificationSettings: { notificationData },
      phoneSettings: { phoneData },
      deselectElementAction,
      setInspirationPageAction,
      setInspirationDataAction,
      setInspirationLoadingAction,
      selectPaletteAction,
      uploadFileAction,
      openUserLockerAction,
      onAddItemsAction,
      onSelectTeamSizeAction,
      onSetInputAction,
      onSelectDateAction,
      onCheckSmsChangeAction,
      onCheckEmailChangeAction,
      onExpandInspirationAction,
      onCloseInspirationAction,
      resetColorSelectionAction,
      addTagAction,
      removeTagAction,
      resetInspirationDataAction,
      removeFromListAction,
      addToListAction,
      setDescriptionAction,
      openRenameModalAction,
      onRenameChangeAction,
      setFileTermsAction,
      setAdminProjectUserIdAction,
      userToSearch,
      setUserToSearchAction,
      prepopulateUserText,
      updateNotification,
      updatePhone
    } = this.props
    const { isMobile, isTablet, richTextEditorReady } = this.state

    let arrayColors = []
    if (colorsList && !colorsList.loading) {
      try {
        arrayColors = JSON.parse(get(colorsList, 'colorsResult.colors', []))
      } catch (e) {
        message.error(e)
      }
    }

    const queryParams = queryString.parse(search)

    const { id: projectId, admUser, admProject, user: adminSelectedUser } = queryParams || {}
    const paletteName = get(dataColor, ['rows', selectedPaletteIndex, 'name'], '')

    const colorLabels = arrayColors.reduce((obj, { value, name }: Color) => {
      obj[value] = name
      return obj
      // tslint:disable-next-line: align
    }, {})
    const validations = this.getNavButtonsValidation()
    const currentTitleHasAction = titleTexts[currentScreen].action
    let currentSubtitle = titleTexts[currentScreen].body
    if (currentScreen === Sections.FILES && (!fromDesign && !fromScratch)) {
      currentSubtitle = titleTexts[currentScreen].secondaryBody
    }
    const currentSubtitleTips = titleTexts[currentScreen].bodyWithTip
    const currentTitle = !!projectId && !admUser ? 'addProduct' : titleTexts[currentScreen].title
    const showTopNav = currentTitle.length || currentSubtitle.length || currentSubtitleTips.length
    const navTitle = currentTitle.length ? (<Title>
      {formatMessage(messages[currentTitle])}
    </Title>) : null
    const navSubtitle = currentSubtitle.length && (!projectId || !!admUser) ? <Subtitle>
      {formatMessage(messages[currentSubtitle])}
    </Subtitle> : null

    const navTips = currentSubtitleTips.length ? (<Subtitle small={true} action={currentTitleHasAction}
      onClick={currentTitleHasAction ? this.showTips : null}>
      {formatMessage(messages[currentSubtitleTips])}
    </Subtitle>) : null

    const subTop = titleTexts[currentScreen].subTopText || ''

    const subTopLabel = subTop ? <SubTopDiv>{formatMessage(messages[subTop])}</SubTopDiv> : null

    const showModal = (isTablet || isMobile) && currentScreen === Sections.INSPIRATION

    const topNavHeader = showTopNav ?
      <TopNavHeader>
        {subTopLabel}
        {navTitle}
        {showModal ?
          <ModalIcon onClick={this.showInspirationModal} theme="filled" type="question-circle" /> :
          <>
            {navSubtitle}
            {navTips}
          </>
        }
      </TopNavHeader> : null

    const navBar = currentScreen > Sections.PATHWAY ?
      <Tabs
        onSelectTab={this.handleOnSelectTab}
        currentTab={currentScreen}
        validate={this.getNavButtonsValidation}
        cantContinue={validations.continueDisable}
        adminProject={admProject}
        {...{ fromScratch }}
      /> : null
    return (
      <Layout
        {...{ history, intl }}
        hideBottomHeader={true}
        disableAssist={true}
        hideFooter={true}
        darkMode={true}
      >
        <Helmet
          meta={[
            { property: 'og:title', content: 'PRO Design Intake Form' },
            { property: 'og:url', content: 'https://designlab.jakroo.com/pro-design' },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: 'https://designlab.jakroo.com/static/media/start_pro_design.7c056bae.jpg' }
          ]}
          title={formatMessage(messages.title)}
        />
        {savingIntake &&
          <SavingDiv>
            <LoaderImg src={loaderModern} />
          </SavingDiv>
        }
        <IntakeContainer
          ref={(listObject: any) => {
            this.intakeRef = listObject
          }}
        >
          {!isMobile && !isTablet ? <>
            <DesignCenterHeader
              proDesign={true}
              onPressBack={this.handleOnPressBack}
            />
            {navBar}
            <Menu
              {...{ validations, savingIntake }}
              onPrevious={this.handleOnPrevious}
              onContinue={this.handleOnContinue}
              showMissingFields={this.showMissingFields}
            /></> : null}
          {isMobile || isTablet ?
            (<MobileMenuNav
              onContinue={this.handleOnContinue}
              onPrevious={this.handleOnPrevious}
              onSelectTab={this.handleOnSelectTab}
              validate={this.getNavButtonsValidation}
              showMissingFields={this.showMissingFields}
              currentTab={currentScreen}
              {...{ validations, savingIntake, fromScratch, formatMessage }}
            />) : null}

          {topNavHeader}
          {currentScreen === Sections.PATHWAY ? (
            <DesignPathway
              fromScratch={this.handleFromScratch}
              fromDesign={this.handleFromDesign}
              loggedIn={!!user}
              existingArtwork={this.handleFromExistingArtwork}
              {...{ formatMessage, isMobile }} />
          ) : null}
          {currentScreen === Sections.LOCKER ? (
            <LockerScreen
              {...{
                currentPage,
                limit,
                offset
              }}
              selectedItem={selectedDesign}
              onSelectItem={setDesignSelectedAction}
              changePage={this.changePage}
              userId={user ? user.id : ''}
            />
          ) : null}
          {currentScreen === Sections.PRODUCTS ?
            <ProductCatalogue
              onSelectProduct={this.handleOnselectProductAction}
              onDeselectProduct={deselectElementAction}
              hideFilters={['collection', 'season', 'fit_style']}
              fromIntakeForm={true}
              adminProject={admProject}
              isAdmin={!!admUser || !!admProject}
              changeQuantity={this.handleChangeQuantity}
              isEdit={!!projectId && !admUser}
              {...{ history, formatMessage, selectedItems }} /> : null}
          {currentScreen > Sections.PATHWAY ?
            <SwipeableViews
              disabled={true}
              enableMouseEvents={false}
              index={currentScreen}
              containerStyle={{ height: '100%' }}>
              {currentScreen === Sections.INSPIRATION ? <Inspiration
                {...{ formatMessage, inspiration, isMobile, isTablet }}
                windowWidth={responsive.fakeWidth}
                currentPage={inspirationPage}
                setPage={setInspirationPageAction}
                skip={inspirationSkip}
                setInspirationData={setInspirationDataAction}
                total={inspirationTotal}
                setLoading={setInspirationLoadingAction}
                loading={inspirationLoading}
                onSelect={this.handleOnselectElementAction}
                onDeselect={deselectElementAction}
                selectedItems={inspirationSelectedItems}
                onExpandInspiration={onExpandInspirationAction}
                addTag={addTagAction}
                removeTag={removeTagAction}
                selectedTags={inspirationTags}
                filters={inspirationFilters}
                resetInspirationData={resetInspirationDataAction}
                removeFilter={removeFromListAction}
                addFilter={addToListAction}
              /> : <div />}
              {currentScreen === Sections.COLORS ? <Colors
                {...{
                  formatMessage,
                  selectedColors,
                  selectedPrimaryColor,
                  setOpenBuild,
                  openBuild,
                  colorLabels,
                  colorsList,
                  selectedPaletteIndex,
                  selectedEditColors,
                  selectedEditPrimaryColor,
                  isTablet,
                  isMobile
                }}
                data={dataColor}
                onSelect={(this.handleOnselectElementAction)}
                onDeselect={deselectElementAction}
                selectPalette={selectPaletteAction}
                resetSelection={resetColorSelectionAction}
              /> : <div />}
              {currentScreen === Sections.FILES ? <Files
                {...{
                  formatMessage,
                  uploadingFile,
                  selectedFiles,
                  userLockerModalOpen,
                  user,
                  lockerSelectedFiles,
                  isMobile,
                  highlight,
                  renameFileOpen,
                  fileIdToRename,
                  fromDesign,
                  newFileName,
                  fromScratch,
                  renamingFile,
                  fileTermsAccepted
                }}
                onUploadFile={uploadFileAction}
                openUserLocker={openUserLockerAction}
                onOpenLogin={this.handleOnOpenLogin}
                onSelectItem={this.handleOnSelectLockerFile}
                onAddItems={onAddItemsAction}
                deselectLockerItem={this.handleOnDeselectLockerFile}
                deleteImage={this.handleOnDeleteImage}
                onOpenRenameModal={openRenameModalAction}
                handleOnRenameChange={onRenameChangeAction}
                onSaveName={this.handleOnRenameFileName}
                setFileTerms={setFileTermsAction}
              /> : <div />}
              {currentScreen === Sections.NOTES ? <Notes
                {...{
                  formatMessage,
                  user,
                  projectDescription,
                  projectName,
                  phone,
                  validLength,
                  highlight,
                  lockerDesign,
                  inspiration,
                  inspirationSelectedItems,
                  selectedColors,
                  selectedPrimaryColor,
                  selectedPaletteIndex,
                  selectedEditColors,
                  selectedEditPrimaryColor,
                  selectedFiles,
                  colorLabels,
                  paletteName,
                  selectedItems,
                  fromScratch,
                  currentCurrency,
                  richTextEditorReady,
                  userToSearch,
                  adminSelectedUser,
                  prepopulateUserText
                }}
                onChangeInput={onSetInputAction}
                goToPage={this.handleOnSelectTab}
                setDescription={setDescriptionAction}
                setAdminProjectUser={setAdminProjectUserIdAction}
                setUserToSearch={setUserToSearchAction}
                removeCategory={removeFromListAction}
                addCategory={addToListAction}
                categories={projectCategories}
                showModal={this.showAlert}
                adminProject={admProject}
              /> : <div />}
              {currentScreen === Sections.NOTIFICATIONS ? <Notifications
                {...{
                  formatMessage,
                  user,
                  selectedTeamSize,
                  phone,
                  sendSms,
                  sendEmail,
                  isMobile,
                  history
                }}
                removeCategory={removeFromListAction}
                addCategory={addToListAction}
                categories={projectCategories}
                estimatedDate={estimatedDateMoment}
                onSelectTeamSize={onSelectTeamSizeAction}
                onChangeInput={onSetInputAction}
                onSelectDate={onSelectDateAction}
                onCheckSms={onCheckSmsChangeAction}
                onCheckEmail={onCheckEmailChangeAction}
                mainProduct={selectedItems.length ? selectedItems[0].id : null}
              /> : <div />}
              {currentScreen === Sections.REVIEW ? <Review
                {...{
                  formatMessage,
                  inspiration,
                  inspirationSelectedItems,
                  selectedColors,
                  selectedPrimaryColor,
                  selectedPaletteIndex,
                  selectedEditColors,
                  selectedEditPrimaryColor,
                  selectedFiles,
                  estimatedDate,
                  lockerDesign,
                  selectedTeamSize,
                  projectName,
                  user,
                  colorLabels,
                  paletteName,
                  projectDescription,
                  selectedItems,
                  fromScratch,
                  currentCurrency
                }}
                adminProject={admProject}
                goToPage={this.handleOnSelectTab}
              /> : <div />}
            </SwipeableViews> : null}
        </IntakeContainer>
        {successModal ? <SuccessModal
          title={formatMessage(messages.successTitle)}
          text={formatMessage(messages.successMessage)}
          center={formatMessage(messages.successMessageCenter)}
          footer={formatMessage(messages.sucessMessageBottom)}
          returnHomeText={formatMessage(messages.returnToHome)}
          onReturnPage={this.handleOnReturnHome}
        /> : null}
        {expandedInspiration ? <InspirationModal
          {...{ expandedInspiration, expandedInspirationOpen, formatMessage }}
          onCloseInspiration={onCloseInspirationAction}
          onSelect={this.handleOnselectElementAction}
          addTag={addTagAction}
          removeTag={removeTagAction}
          selectedTags={inspirationTags}
        /> : null}
        {smsAlertsModal && notificationData && phoneData ? <SMSAlertsModal
          user={user}
          notificationData={notificationData}
          phoneData={phoneData}
          updateNotification={updateNotification}
          updatePhone={updatePhone}
          onClose={this.handleOnSMSAlertsClose}
          formatMessage={formatMessage}
        /> : null}
      </Layout>)
  }
}

type OwnProps = {
  user?: User
  colorsList?: ColorsDataResult
}

const mapStateToProps = (state: any) => {
  const intakeForm = state.get('intakeForm').toJS()
  const langProps = state.get('languageProvider').toJS()
  const appProps = state.get('app').toJS()
  const responsive = state.get('responsive').toJS()

  return {
    ...intakeForm,
    ...langProps,
    ...appProps,
    responsive
  }
}

const IntakeFormPageEnhance = compose(
  saveProject,
  renameFile,
  addProductsProjectMutation,
  UpdateNotificationSettingMutation,
  UpdatePhoneSettingMutation,
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    { ...intakeFormActions, ...apiActions, openLoginAction }
  ),
  graphql(profileSettingsQuery, {
    options: ({ user }: OwnProps) => ({
      fetchPolicy: 'network-only',
      skip: !user
    }),
    name: 'profileData'
  }),
  graphql<DataColor>(GetColorPalettes, { name: 'dataColor' }),
  graphql<ColorsDataResult>(GetColorsQuery, {
    options: (ownprops: OwnProps) => {
      const { colorsList } = ownprops
      return {
        skip: !!colorsList
      }
    },
    name: 'colorsList'
  }),
  graphql(profileNotificationSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'notificationSettings'
  }),
  graphql(profilePhoneSettingsQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'phoneSettings'
  }),
)(IntakeFormPage)

export default IntakeFormPageEnhance
