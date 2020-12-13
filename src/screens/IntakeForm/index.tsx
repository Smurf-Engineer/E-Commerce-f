/**
 * IntakeForm Screen - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import messages from './messages'
import Header from '../../components/DesignCenterHeader'
import Layout from '../../components/MainLayout'
import SwipeableViews from 'react-swipeable-views'
import * as intakeFormActions from './actions'
import * as apiActions from './api'
import ProductCatalogue from '../../components/ProductCatalogue'
import { connect } from 'react-redux'
import MobileMenu from './MobileMenu'
import Menu from './Menu'
import Inspiration from './Inspiration'
import Colors from './Colors'
import Files from './Files'
import DesignPathway from './DesignPathway'
import {
  openLoginAction
} from '../../components/MainLayout/actions'

import { RouteComponentProps } from 'react-router-dom'
import {
  Container,
  Title,
  NavHeader
} from './styledComponents'
import {
  Responsive,
  InspirationType,
  ImageFile,
  UserType
} from '../../types/common'
import { Sections, CUSTOM_PALETTE_INDEX, SELECTED_LCOKER_FILES, SELECTED_FILES } from './constants'

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
}

export class IntakeFormPage extends React.Component<Props, {}> {  
  swipeableActions = null
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleOnContinue = () => {
    const { goToPage, currentScreen } = this.props
    goToPage(currentScreen + 1)
  }

  handleOnOpenLogin = () => {
    const { openLoginAction: openLoginModalAction } = this.props
    openLoginModalAction(true)
  }

  getNavButtonsValidation = () => {
    const {
      currentScreen,
      selectedItems,
      inspirationSelectedItems,
      selectedPaletteIndex,
      selectedColors,
      selectedEditColors,
      selectedPrimaryColor,
      selectedEditPrimaryColor,
      user
    } = this.props
    switch (currentScreen) {
      case Sections.PRODUCTS:
        return {
          continueDisable: selectedItems.length < 1,
          showPreviousButton: false
        }
      case Sections.PATHWAY:
        return {
          showPreviousButton: false,
          showContinueButton: false
        }
      case Sections.INSPIRATION:
        return {
          showPreviousButton: true,
          continueDisable: inspirationSelectedItems.length < 1
        }
      case Sections.COLORS:
        return {
          continueDisable:
            selectedPaletteIndex === CUSTOM_PALETTE_INDEX ?
              (selectedColors.length === 0 || selectedPrimaryColor.length === 0) :
                (selectedEditColors.length === 0 || selectedEditPrimaryColor.length === 0)
        }
      case Sections.FILES:
        return {
          continueDisable: !user
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
      selectElementAction,
      deselectElementAction,
      setInspirationPageAction,
      setInspirationDataAction,
      setInspirationLoadingAction,
      selectPaletteAction,
      uploadFileAction,
      openUserLockerAction,
      onAddItemsAction
    } = this.props
    const isMobile = !!responsive && responsive.phone
    const validations = this.getNavButtonsValidation()
    return (
      <Layout
        {...{ history, intl }}
        hideTopHeader={responsive.tablet}
        hideBottomHeader={true}
        disableAssist={true}
        hideFooter={true}
        darkMode={true}
      >
      <Container>
        {isMobile &&
            (<MobileMenu
              onContinue={this.handleOnContinue}
              {...{validations}}
            />
            )}
        {!isMobile && (
          <>
            <Header
              proDesign={true}
              onPressBack={this.handleOnPressBack}
            />
            <Menu
              {...{validations}}
              onContinue={this.handleOnContinue}
            />
          </>
        )}
        <NavHeader>
          <Title>
            {formatMessage(messages.chooseProducts)}
          </Title>
        </NavHeader>
        {currentScreen === Sections.PRODUCTS && <ProductCatalogue
            onSelectProduct={selectElementAction}
            onDeselectProduct={deselectElementAction}
            {...{ history, formatMessage, selectedItems }} />}
        {currentScreen === Sections.PATHWAY && (
          <DesignPathway fromScratch={this.handleOnContinue} {...{formatMessage, isMobile}} />
        )}
       {currentScreen > Sections.PATHWAY &&
        <SwipeableViews
          disabled={true}
          index={currentScreen}
          action={actions => (this.swipeableActions = actions)}
          onChangeIndex={() => this.swipeableActions.updateHeight()}>
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
              onSelect={(selectElementAction)}
              onDeselect={deselectElementAction}
              selectedItems={inspirationSelectedItems}
            />
            <Colors
              {...{
                formatMessage,
                selectedColors,
                selectedPrimaryColor,
                selectedPaletteIndex,
                selectedEditColors,
                selectedEditPrimaryColor
              }}
              onSelect={(selectElementAction)}
              onDeselect={deselectElementAction}
              selectPalette={selectPaletteAction}
            />
            <Files
              {...{formatMessage, uploadingFile, selectedFiles, userLockerModalOpen, user, lockerSelectedFiles}}
              onUploadFile={uploadFileAction}
              openUserLocker={openUserLockerAction}
              onOpenLogin={this.handleOnOpenLogin}
              onSelectItem={this.handleOnSelectLockerFile}
              onAddItems={onAddItemsAction}
              deselectLockerItem={this.handleOnDeselectLockerFile}
              deleteImage={this.handleOnDeleteImage}
            />
          </SwipeableViews>}
      </Container>
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
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    { ...intakeFormActions, ...apiActions, openLoginAction }
  )
)(IntakeFormPage)

export default IntakeFormPageEnhance
