/**
 * DesignCenter Screen - Created by david on 23/02/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { RouteComponentProps } from 'react-router-dom'
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'
import Message from 'antd/lib/message'
import get from 'lodash/get'
import unset from 'lodash/unset'
import Layout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import * as designCenterActions from './actions'
import Header from '../../components/DesignCenterHeader'
import Tabs from '../../components/DesignCenterTabs'
import Info from '../../components/DesignCenterInfo'
import ThemeTab from '../../components/DesignCenterTheme'
import StyleTab from '../../components/DesignCenterStyle'
import CustomizeTab from '../../components/DesignCenterCustomize'
import PreviewTab from '../../components/DesignCenterPreview'
import SaveDesign from '../../components/SaveDesign'
import { Container, StyledTitle, BottomSheetWrapper } from './styledComponents'
import {
  Palette,
  QueryProps,
  Product,
  TeamStoreItemtype,
  TextFormat,
  CanvasElement,
  CanvasType,
  MyPaletteDesignCenterModals
} from '../../types/common'
import { getProductQuery, addTeamStoreItemMutation } from './data'
import DesignCenterInspiration from '../../components/DesignCenterInspiration'
import messages from './messages'

interface Data extends QueryProps {
  product?: Product
}

interface Change {
  type: string
  state: any
}

interface Props extends RouteComponentProps<any> {
  data: Data
  intl: InjectedIntl
  currentTab: number
  colorBlock: number
  colorBlockHovered: number
  palettes: Palette[]
  paletteName: string
  colors: string[]
  designBase64: string
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
  text: string
  style: number
  openAddToStoreModal: boolean
  addItemToStore: any
  teamStoreId: string
  itemToAdd: TeamStoreItemtype
  canvas: CanvasType
  selectedElement: string
  textFormat: TextFormat
  myPaletteModals: MyPaletteDesignCenterModals
  openResetDesignModal: boolean
  // Redux Actions
  clearStoreAction: () => void
  setCurrentTabAction: (index: number) => void
  openQuickViewAction: (index: number) => void
  setColorBlockAction: (index: number) => void
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
  setThemeAction: (id: number) => void
  setStyleAction: (style: any) => void
  openShareModalAction: (open: boolean) => void
  openSaveDesignAction: (open: boolean, imageBase64: string) => void
  saveDesignIdAction: (id: string) => void
  setCheckedTermsAction: (checked: boolean) => void
  clearDesignInfoAction: () => void
  saveDesignLoadingAction: (loading: boolean) => void
  setTextAction: (text: string) => void
  setStyleComplexity: (index: number, colors: string[]) => void
  openAddToTeamStoreModalAction: (open: boolean) => void
  setItemToAddAction: (teamStoreItem: {}, teamStoreId: string) => void
  setCanvasElement: (
    text: CanvasElement,
    typeEl: string,
    update?: boolean
  ) => void
  setSelectedElement: (id: string, typeEl: string) => void
  removeCanvasElement: (id: string, typeEl: string) => void
  setTextFormatAction: (key: string, value: string | number) => void
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
  openResetDesignModalAction: (open: boolean) => void
  editDesignAction: () => void
}

export class DesignCenter extends React.Component<Props, {}> {
  state = {
    open: false
  }

  openBottomSheet = (open: boolean) => this.setState({ open })

  toggleBottomSheet = (evt: React.MouseEvent<EventTarget>) => {
    this.openBottomSheet(!this.state.open)
  }

  componentWillUnmount() {
    const { clearStoreAction } = this.props
    clearStoreAction()
  }

  handleAfterSaveDesign = (id: string) => {
    const { saveDesignIdAction } = this.props
    saveDesignIdAction(id)
    this.handleOnSelectTab(3)
  }

  handleOpenQuickView = () => {
    const {
      location: { search }
    } = this.props
    const queryParams = queryString.parse(search)
    const productId = queryParams.id || ''
    const { openQuickViewAction: openQuickView } = this.props
    openQuickView(productId)
  }

  handleOnPressBack = () => window.location.replace('/')

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

  handleOnTransictionEnd = () => this.props.setSwipingTabAction(false)

  closeSaveDesignModal = () => {
    const { openSaveDesignAction } = this.props
    openSaveDesignAction(false, '')
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
      intl: { formatMessage }
    } = this.props
    Message.success(formatMessage(messages.addedToCart, { designName }))
  }

  render() {
    const {
      intl,
      history,
      text,
      currentTab,
      setColorBlockAction,
      setHoverColorBlockAction,
      setColorAction,
      setPaletteAction,
      colorBlock,
      colorBlockHovered,
      setPaletteNameAction,
      paletteName,
      palettes,
      openSaveDesign,
      setPalettesAction,
      swipingView,
      colors,
      designBase64,
      styleColors,
      style,
      loadingModel,
      designName,
      saveDesignLoading,
      setLoadingModel,
      designUndoAction,
      designRedoAction,
      designResetAction,
      designClearAction,
      undoChanges,
      redoChanges,
      setThemeAction,
      setStyleAction,
      openShareModal,
      openShareModalAction,
      openSaveDesignAction,
      setDesignNameAction,
      savedDesignId,
      checkedTerms,
      setCheckedTermsAction,
      saveDesignLoadingAction,
      setTextAction,
      openAddToTeamStoreModalAction,
      setStyleComplexity,
      openAddToStoreModal,
      setItemToAddAction,
      teamStoreId,
      location: { search },
      data,
      canvas,
      setCanvasElement,
      setSelectedElement,
      removeCanvasElement,
      selectedElement,
      textFormat,
      setTextFormatAction,
      openPaletteModalAction,
      myPaletteModals,
      openResetDesignModalAction,
      openResetDesignModal,
      editDesignAction
    } = this.props

    if (!search) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    const queryParams = queryString.parse(search)
    const productId = queryParams.id || ''
    const productName = data && data.product ? data.product.name : ''

    return (
      <Layout {...{ history, intl }} hideBottomHeader={true} hideFooter={true}>
        <Container>
          <Header onPressBack={this.handleOnPressBack} />
          <Tabs onSelectTab={this.handleOnSelectTab} {...{ currentTab }} />
          <SwipeableViews
            onTransitionEnd={this.handleOnTransictionEnd}
            index={currentTab}
          >
            <div key="theme">
              <Info
                label="theme"
                model={productName}
                onPressQuickView={this.handleOpenQuickView}
              />
              {currentTab === 0 && (
                <ThemeTab
                  {...{ loadingModel }}
                  onSelectTheme={setThemeAction}
                />
              )}
            </div>
            <div key="style">
              <Info
                label="style"
                model={productName}
                onPressQuickView={this.handleOpenQuickView}
              />
              {currentTab === 1 && (
                <StyleTab
                  onSelectStyle={setStyleAction}
                  onSelectStyleComplexity={setStyleComplexity}
                />
              )}
            </div>
            <CustomizeTab
              {...{
                colorBlock,
                colorBlockHovered,
                colors,
                loadingModel,
                currentTab,
                swipingView,
                styleColors,
                paletteName,
                palettes,
                text,
                productName,
                canvas,
                selectedElement,
                textFormat,
                openPaletteModalAction,
                myPaletteModals,
                openResetDesignModal,
                openResetDesignModalAction,
                designName
              }}
              currentStyle={style}
              onUpdateText={setTextAction}
              formatMessage={intl.formatMessage}
              undoEnabled={undoChanges.length > 0}
              redoEnabled={redoChanges.length > 0}
              onSelectColorBlock={setColorBlockAction}
              onHoverColorBlock={setHoverColorBlockAction}
              onSelectColor={setColorAction}
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
              onSelectTextFormat={setTextFormatAction}
            />
            <PreviewTab
              {...{
                history,
                colors,
                loadingModel,
                currentTab,
                swipingView,
                openShareModal,
                openShareModalAction,
                savedDesignId,
                productName,
                openAddToTeamStoreModalAction,
                openAddToStoreModal,
                setItemToAddAction,
                teamStoreId,
                editDesignAction
              }}
              onAddToCart={this.handleOnAddToCart}
              formatMessage={intl.formatMessage}
              onLoadModel={setLoadingModel}
              onPressQuickView={this.handleOpenQuickView}
              addItemToStore={this.saveItemToStore}
            />
          </SwipeableViews>
          <SaveDesign
            {...{ productId }}
            open={openSaveDesign}
            requestClose={this.closeSaveDesignModal}
            formatMessage={intl.formatMessage}
            onDesignName={setDesignNameAction}
            designName={designName}
            colors={colors}
            designBase64={designBase64}
            afterSaveDesign={this.handleAfterSaveDesign}
            savedDesignId={savedDesignId}
            checkedTerms={checkedTerms}
            setCheckedTerms={setCheckedTermsAction}
            // clearDesignInfo={clearDesignInfoAction}
            setSaveDesignLoading={saveDesignLoadingAction}
            saveDesignLoading={saveDesignLoading}
          />
          {currentTab === 2 ? (
            <BottomSheetWrapper>
              <SwipeableBottomSheet overflowHeight={64} open={this.state.open}>
                <StyledTitle onClick={this.toggleBottomSheet}>
                  <FormattedMessage {...messages.inspirationTtitle} />
                </StyledTitle>
                <DesignCenterInspiration
                  {...{ productId }}
                  onPressSeeAll={() => {}}
                  onPressCustomize={() => {}}
                  onPressQuickView={() => {}}
                />
              </SwipeableBottomSheet>
            </BottomSheetWrapper>
          ) : null}
        </Container>
      </Layout>
    )
  }
}

interface OwnProps {
  location?: any
}

const mapStateToProps = (state: any) => state.get('designCenter').toJS()

const DesignCenterEnhance = compose(
  injectIntl,
  addTeamStoreItemMutation,
  connect(
    mapStateToProps,
    { ...designCenterActions, openQuickViewAction }
  ),
  graphql<Data>(getProductQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      return {
        skip: !queryParams.id,
        variables: { id: queryParams.id }
      }
    }
  })
)(DesignCenter)

export default DesignCenterEnhance
