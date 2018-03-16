/**
 * DesignCenter Screen - Created by david on 23/02/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { RouteComponentProps } from 'react-router-dom'
import { ReducersObject } from '../../store/rootReducer'
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
import { Container } from './styledComponents'
import { Palette } from '../../types/common'

interface Change {
  type: string
  state: any
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  currentTab: number
  colorBlock: number
  palettes: Palette[]
  paletteName: string
  colors: string[]
  styleColors: string[]
  loadingModel: boolean
  undoChanges: Change[]
  redoChanges: Change[]
  swipingView: boolean
  // Redux Actions
  clearStoreAction: () => void
  setCurrentTabAction: (index: number) => void
  openQuickViewAction: (index: number) => void
  setColorBlockAction: (index: number) => void
  setColorAction: (color: string) => void
  setPaletteAction: (colors: string[]) => void
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
}

export class DesignCenter extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { clearStoreAction } = this.props
    clearStoreAction()
  }
  handleOpenQuickView = () => {
    const { openQuickViewAction: openQuickView } = this.props
    // TODO: This id it's the same of the product
    openQuickView(1)
  }

  handleOnPressBack = () => {
    const { history } = this.props
    history.goBack()
  }

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

  handleOnTransictionEnd = () => this.props.setSwipingTabAction(false)

  render() {
    const {
      intl,
      history,
      currentTab,
      setColorBlockAction,
      setColorAction,
      setPaletteAction,
      colorBlock,
      setPaletteNameAction,
      paletteName,
      palettes,
      setPalettesAction,
      swipingView,
      colors,
      styleColors,
      loadingModel,
      setLoadingModel,
      designUndoAction,
      designRedoAction,
      designResetAction,
      designClearAction,
      undoChanges,
      redoChanges,
      setThemeAction,
      setStyleAction
    } = this.props

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Header onPressBack={this.handleOnPressBack} />
          <Tabs {...{ currentTab }} onSelectTab={this.handleOnSelectTab} />
          <SwipeableViews
            onTransitionEnd={this.handleOnTransictionEnd}
            index={currentTab}
          >
            <div key="theme">
              <Info
                label="theme"
                model="NOVA"
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
                model="NOVA"
                onPressQuickView={this.handleOpenQuickView}
              />
              <StyleTab onSelectStyle={setStyleAction} />
            </div>
            <CustomizeTab
              {...{
                colorBlock,
                colors,
                loadingModel,
                currentTab,
                swipingView,
                styleColors,
                paletteName,
                palettes
              }}
              undoEnabled={undoChanges.length > 0}
              redoEnabled={redoChanges.length > 0}
              onSelectColorBlock={setColorBlockAction}
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
            />
            <PreviewTab
              {...{
                colors,
                loadingModel,
                currentTab,
                swipingView
              }}
              onLoadModel={setLoadingModel}
              onPressQuickView={this.handleOpenQuickView}
              onSelectTab={this.handleOnSelectTab}
            />
          </SwipeableViews>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = ({ designCenter }: ReducersObject) =>
  designCenter.toJS()

const DesignCenterEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...designCenterActions, openQuickViewAction })
)(DesignCenter)

export default DesignCenterEnhance
