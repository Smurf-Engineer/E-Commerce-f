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
import { Palette, QueryProps, Product } from '../../types/common'
import { getProductQuery } from './data'
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
    const { location: { search } } = this.props
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
      clearDesignInfoAction,
      saveDesignLoadingAction,
      setTextAction,
      setStyleComplexity,
      location: { search },
      data
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
          <Tabs {...{ currentTab }} onSelectTab={() => {}} />
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
                productName
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
            />
            <PreviewTab
              {...{
                colors,
                loadingModel,
                currentTab,
                swipingView,
                openShareModal,
                openShareModalAction,
                savedDesignId,
                productName
              }}
              formatMessage={intl.formatMessage}
              onLoadModel={setLoadingModel}
              onPressQuickView={this.handleOpenQuickView}
              onSelectTab={this.handleOnSelectTab}
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
            clearDesignInfo={clearDesignInfoAction}
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
  graphql<Data>(getProductQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      return {
        skip: !queryParams.id,
        variables: { id: queryParams.id }
      }
    }
  }),
  connect(mapStateToProps, { ...designCenterActions, openQuickViewAction })
)(DesignCenter)

export default DesignCenterEnhance
