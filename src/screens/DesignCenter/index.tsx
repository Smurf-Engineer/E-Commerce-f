/**
 * DesignCenter Screen - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
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
import CustomizeTab from '../../components/DesignCenterCustomize'
import { Container, Text } from './styledComponents'
import { Theme, Palette } from '../../types/common'
import messages from './messages'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  currentTab: number
  colorBlock: number
  palettes: Palette[]
  paletteName: string
  colors: string[]
  styleColors: string[]
  loadingModel: boolean
  // Redux Actions
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
}

export class DesignCenter extends React.Component<Props, {}> {
  handleOpenQuickView = () => {
    const { openQuickViewAction: openQuickView } = this.props
    // TODO: This id it's the same of the product
    openQuickView(1)
  }

  handleOnPressBack = () => {
    const { history } = this.props
    history.replace('/')
  }

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

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
      colors,
      styleColors,
      loadingModel,
      setLoadingModel,
      designUndoAction,
      designRedoAction,
      designResetAction,
      designClearAction
    } = this.props
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Header onPressBack={this.handleOnPressBack} />
          <Tabs {...{ currentTab }} onSelectTab={this.handleOnSelectTab} />
          <SwipeableViews index={currentTab}>
            <div key="theme">
              <Info
                label="theme"
                model="NOVA"
                onPressQuickView={this.handleOpenQuickView}
              />
              {currentTab === 0 && <ThemeTab {...{ loadingModel }} />}
            </div>
            <div key="style">
              <Info
                label="style"
                model="NOVA"
                onPressQuickView={this.handleOpenQuickView}
              />
              <div>Style</div>
            </div>
            <CustomizeTab
              {...{
                colorBlock,
                colors,
                styleColors,
                paletteName,
                palettes,
                loadingModel
              }}
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
            <div key="preview">
              <div>Preview</div>
            </div>
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
