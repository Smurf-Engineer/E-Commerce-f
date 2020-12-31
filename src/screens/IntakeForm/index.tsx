/**
 * IntakeForm Screen - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import messages from './messages'
import get from 'lodash/get'
import message from 'antd/lib/message'
import DesignCenterHeader from '../../components/DesignCenterHeader'
import { Moment } from 'moment'
import Layout from '../../components/MainLayout'
import { saveProject } from './data'
import SwipeableViews from 'react-swipeable-views'
import * as intakeFormActions from './actions'
import * as apiActions from './api'
import Modal from 'antd/lib/modal'
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
import Review from './Review'
import Notes from './Notes'
import {
  openLoginAction
} from '../../components/MainLayout/actions'
import InspirationModal from '../../components/InspirationModal'
import { RouteComponentProps } from 'react-router-dom'
import {
  IntakeContainer,
  Title,
  TopNavHeader,
  ModalTitle,
  InfoBody,
  buttonStyle,
  Subtitle
} from './styledComponents'
import {
  Responsive,
  InspirationType,
  ImageFile,
  UserType,
  MessagePayload
} from '../../types/common'
import {
  Sections,
  titleTexts,
  CUSTOM_PALETTE_INDEX,
  SELECTED_LCOKER_FILES,
  SELECTED_FILES, SELECTED_ITEMS,
  INSPIRATION_SELECTEED_ITEMS
} from './constants'

const { info } = Modal

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  responsive: Responsive
  selectedItems: number[]
  currentScreen: number
  inspirationPage: number
  inspirationSkip: number
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
  expandedInspiration: boolean
  expandedInspirationOpen: boolean
  fromScratch: boolean
  selectElementAction: (elementId: number | string, listName: string, index?: number) => void
  deselectElementAction: (elementId: number | string, listName: string) => void
  goToPage: (page: number) => void
  setInspirationPageAction: (skip: number, newPage: number) => void
  setInspirationDataAction: (data: InspirationType[], fullCount: number) => void
  setInspirationLoadingAction: (loading: boolean) => void
  selectPaletteAction: (primaryColor: string, accentColors: string[], index: number) => void
  uploadFileAction: (file: File) => void
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
  onExpandInspirationAction: (inspirationId: number, image: string, name: string, isSelected: boolean) => void
  onCloseInspirationAction: () => void
  setFromScratchAction: (fromScratch: boolean) => void
}

export class IntakeFormPage extends React.Component<Props, {}> {  
  swipeableActions = null
  state = {
    isMobile: false
  }
  componentDidMount() {
    const { location, selectElementAction, selectedItems } = this.props
    if (location.state && !selectedItems.length) {
      selectElementAction(location.state.productId, SELECTED_ITEMS)
    }
    const isMobile = window.matchMedia(
      '(min-width: 320px) and (max-width: 480px)'
    ).matches
    this.setState({ isMobile })
  }
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleFromScratch = () => {
    const { setFromScratchAction } = this.props
    setFromScratchAction(true)
    this.handleOnContinue(true)
  }

  handleFromExistingArtwork = () => {
    const { setFromScratchAction } = this.props
    setFromScratchAction(false)
    this.handleOnContinue(false)
  }

  handleOnContinue = async (isFromScratch?: boolean) => {
    const { goToPage, currentScreen} = this.props
    if (currentScreen !== Sections.REVIEW) {
      if (currentScreen === Sections.PATHWAY && !isFromScratch) {
        return goToPage(currentScreen + 3)
      }
      return goToPage(currentScreen + 1)
    }
    const {
      selectedPaletteIndex,
      selectedItems,
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
      estimatedDate,
      sendSms,
      sendEmail,
      fromScratch,
      createProject,
      onSetSavingIntake,
      onSetSuccessModalOpen
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
    const proDesignProject = {
      name: projectName,
      phone,
      notes: projectDescription,
      teamSize: selectedTeamSize,
      deliveryDate: estimatedDate,
      sendEmail,
      sendSms,
      files: selectedFiles.map((file) => file.id),
      products: selectedItems,
      inspiration: inspirationSelectedItems,
      palette,
      fromScratch
    }
    try {
      const results = await createProject({
        variables: { proDesignProject }
      })
      const successMessage = get(results, 'data.createProDesignProject.message')
      message.success(successMessage)
      onSetSuccessModalOpen(true)
      onSetSavingIntake(false)
    } catch (e) {
      onSetSavingIntake(false)
      message.error(
        `Something wrong happened. Please try again! ${e.message}`
      )
    }
  }

  handleOnPrevious = () => {
    const { goToPage, currentScreen, fromScratch } = this.props
    if (currentScreen === Sections.FILES && !fromScratch) {
      return goToPage(currentScreen - 3)
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
      selectedItems,
      inspirationSelectedItems,
      selectedPaletteIndex,
      selectedColors,
      selectedEditColors,
      selectedPrimaryColor,
      selectedEditPrimaryColor,
      user,
      projectName,
      selectedTeamSize,
      estimatedDate,
      projectDescription,
      intl: { formatMessage },
      fromScratch
    } = this.props
    const continueButtonText = currentScreen ===
      Sections.REVIEW ? formatMessage(messages.submitButtonText) :
        formatMessage(messages.continueButtonText)
    const previousButtonText = formatMessage(messages.previousButtonText)

    switch (screen || currentScreen) {
      case Sections.PRODUCTS:
        return {
          continueDisable: selectedItems.length < 1,
          showPreviousButton: false,
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
            fromScratch && (selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
              (selectedColors.length === 0 || selectedPrimaryColor.length === 0) :
                (selectedEditColors.length === 0 || selectedEditPrimaryColor.length === 0)),
          showPreviousButton: true,
          continueButtonText,
          previousButtonText
        }
      case Sections.FILES:
        return {
          continueDisable: !user,
          showPreviousButton: true,
          continueButtonText,
          previousButtonText
        }
      case Sections.NOTES:
        return {
          continueDisable: !projectName || !selectedTeamSize || !user
          || !estimatedDate || !projectDescription,
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
    const { onSetSuccessModalOpen } = this.props
    onSetSuccessModalOpen(false)
    window.location.replace(`/us?lang=en&currency=usd`)
  }

  handleOnselectElementAction = (elementId: number | string, listName: string, index?: number) => {
    const {
      intl: { formatMessage },
      selectElementAction,
      onCloseInspirationAction,
      inspirationSelectedItems
    } = this.props
    let title = ''
    let body = ''
    let accept = ''
    switch (listName) {
      case SELECTED_ITEMS: {
        const { selectedItems } = this.props
        if (selectedItems.length < 5) {
          return selectElementAction(elementId, listName, index)
        }
        title = formatMessage(messages.maxProductsTitle)
        body = formatMessage(messages.maxProductsBody)
        accept = formatMessage(messages.gotIt)
        break
      }
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
    this.showAlert(title, body, accept)
  }

  showAlert = (title: string, body: string, accept: string) => {
    info({
      title: (
        <ModalTitle>
          {title}
        </ModalTitle>
      ),
      okText: accept,
      okButtonProps: {
        style: buttonStyle
      },
      content: (
        <InfoBody>
          {body}
        </InfoBody>
      )
    })
  }

  showTips = () => {
    const { intl: { formatMessage }, currentScreen } = this.props
    const title = formatMessage(messages[titleTexts[currentScreen].tipTitle])
    const body = formatMessage(messages[titleTexts[currentScreen].tipBody])
    const accept = formatMessage(messages[titleTexts[currentScreen].tipAccept])

    this.showAlert(title, body, accept)
  }

  render() {
    const {
      intl: { formatMessage },
      intl,
      history,
      responsive,
      selectedItems,
      currentScreen,
      inspirationPage,
      inspirationSkip,
      inspiration,
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
      user,
      lockerSelectedFiles,
      selectedTeamSize,
      projectDescription,
      projectName,
      phone,
      estimatedDateMoment,
      sendSms,
      sendEmail,
      savingIntake,
      successModal,
      expandedInspiration,
      expandedInspirationOpen,
      fromScratch,
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
      onCloseInspirationAction
    } = this.props
    const { isMobile } = this.state

    const validations = this.getNavButtonsValidation()
    const currentTitleHasAction = titleTexts[currentScreen].action
    const currentSubtitle = titleTexts[currentScreen].body
    const currentSubtitleTips = titleTexts[currentScreen].bodyWithTip
    const currentTitle = titleTexts[currentScreen].title
    const showTopNav = currentTitle.length || currentSubtitle.length || currentSubtitleTips.length
    const navTitle = currentTitle.length ? (<Title>
        {formatMessage(messages[currentTitle])}
      </Title>) : null
    const navSubtitle = currentSubtitle.length ? <Subtitle>
          {formatMessage(messages[currentSubtitle])}
      </Subtitle> : null

    const navTips = currentSubtitleTips.length ? (<Subtitle action={currentTitleHasAction} 
        onClick={currentTitleHasAction ? this.showTips : null}>
          {formatMessage(messages[currentSubtitleTips])}
        </Subtitle>) : null
  
    const topNavHeader = showTopNav ?
      <TopNavHeader>
        {navTitle}
        {navSubtitle}
        {navTips}
      </TopNavHeader> : null
    
    const navBar = currentScreen > Sections.PATHWAY ?
      <Tabs
      onSelectTab={this.handleOnSelectTab}
      currentTab={currentScreen}
      validate={this.getNavButtonsValidation}
      cantContinue={validations.continueDisable}
      {...{ fromScratch }}
    /> : null
    return (
      <Layout
        {...{ history, intl }}
        hideTopHeader={responsive.tablet}
        hideBottomHeader={true}
        disableAssist={true}
        hideFooter={true}
        darkMode={true}
      >
      <IntakeContainer>
        {!isMobile ? <>
          <DesignCenterHeader
            proDesign={true}
            onPressBack={this.handleOnPressBack}
          />
          {navBar}
          <Menu
            {...{validations, savingIntake}}
            onPrevious={this.handleOnPrevious}
            onContinue={this.handleOnContinue}
          /></> : null }
          {isMobile ?
          (<MobileMenuNav
            onContinue={this.handleOnContinue}
            onPrevious={this.handleOnPrevious}
            {...{validations, savingIntake}}
          />) : null}

        {topNavHeader}
        {currentScreen === Sections.PRODUCTS ? <ProductCatalogue
            onSelectProduct={this.handleOnselectElementAction}
            onDeselectProduct={deselectElementAction}
            {...{ history, formatMessage, selectedItems }} /> : null}
        {currentScreen === Sections.PATHWAY ? (
          <DesignPathway 
            fromScratch={this.handleFromScratch}
            existingArtwork={this.handleFromExistingArtwork}
            {...{formatMessage, isMobile}} />
        ) : null}
       {currentScreen > Sections.PATHWAY ?
        <SwipeableViews
          disabled={true}
          index={currentScreen}>
            <Inspiration
              {...{ formatMessage, inspiration }}
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
            />
            <Colors
              {...{
                formatMessage,
                selectedColors,
                selectedPrimaryColor,
                selectedPaletteIndex,
                selectedEditColors,
                selectedEditPrimaryColor,
                isMobile
              }}
              onSelect={(this.handleOnselectElementAction)}
              onDeselect={deselectElementAction}
              selectPalette={selectPaletteAction}
            />
            <Files
              {...{
                formatMessage,
                uploadingFile,
                selectedFiles,
                userLockerModalOpen,
                user,
                lockerSelectedFiles,
                isMobile
              }}
              onUploadFile={uploadFileAction}
              openUserLocker={openUserLockerAction}
              onOpenLogin={this.handleOnOpenLogin}
              onSelectItem={this.handleOnSelectLockerFile}
              onAddItems={onAddItemsAction}
              deselectLockerItem={this.handleOnDeselectLockerFile}
              deleteImage={this.handleOnDeleteImage}
            />
            <Notes
              {...{formatMessage, user, selectedTeamSize, projectDescription,
                projectName, phone, sendSms, sendEmail}}
              estimatedDate={estimatedDateMoment}
              onSelectTeamSize={onSelectTeamSizeAction}
              onChangeInput={onSetInputAction}
              onSelectDate={onSelectDateAction}
              onCheckSms={onCheckSmsChangeAction}
              onCheckEmail={onCheckEmailChangeAction}
            />
            <Review
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
                projectName,
                user,
                projectDescription,
                selectedItems,
                fromScratch
              }}
              goToPage={this.handleOnSelectTab}
            />
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
        {...{expandedInspiration, expandedInspirationOpen, formatMessage}}
        onCloseInspiration={onCloseInspirationAction}
        onSelect={this.handleOnselectElementAction}
      /> : null}
    </Layout>)
  }
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
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    { ...intakeFormActions, ...apiActions, openLoginAction }
  )
)(IntakeFormPage)

export default IntakeFormPageEnhance
