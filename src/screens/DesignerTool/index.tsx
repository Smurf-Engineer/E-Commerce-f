/**
 * DesignerTool Screen - Created by david on 08/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import Tabs from './DesignCenterCustomize/DesignCenterTabs'
import CustomizeTab from './DesignCenterCustomize'
import SettingsTab from './DesignSettings/'
import * as designerToolActions from './actions'
import * as designerToolApi from './api'
import { Container } from './styledComponents'
import { ModelConfig, UploadFile } from '../../types/common'

interface Props {
  colors: string[]
  styleColors: string[]
  areas: string[]
  colorBlock: number
  colorBlockHovered: number
  loadingModel: boolean
  uploadingFiles: boolean
  modelConfig: ModelConfig
  currentTab: number
  swipingView: boolean
  selectedTheme: number
  selectedStyle: number
  // Redux Actions
  setLoadingAction: (loading: boolean) => void
  setColorAction: (color: string) => void
  setColorBlockAction: (index: number) => void
  setHoverColorBlockAction: (index: number) => void
  uploadFilesAction: (files: any) => void
  uploadDesignAction: (files: any) => void
  setUploadingAction: (loading: boolean) => void
  setCurrentTabAction: (index: number) => void
  setSwipingTabAction: (swiping: boolean) => void
  setSelectedThemeAction: (id: number) => void
  setSelectedStyleAction: (id: number) => void
}

export class DesignerTool extends React.Component<Props, {}> {
  state = {
    themeImage: []
  }
  render() {
    const {
      colors,
      styleColors,
      colorBlock,
      colorBlockHovered,
      setLoadingAction,
      loadingModel,
      setColorAction,
      setColorBlockAction,
      setHoverColorBlockAction,
      uploadFilesAction,
      uploadDesignAction,
      uploadingFiles,
      modelConfig,
      areas,
      selectedTheme,
      currentTab,
      setSelectedThemeAction,
      setSelectedStyleAction,
      selectedStyle
    } = this.props
    const { themeImage } = this.state
    return (
      <Container>
        <Tabs {...{ currentTab }} onSelectTab={this.handleOnSelectTab} />
        <SwipeableViews
          onTransitionEnd={this.handleOnTransictionEnd}
          index={currentTab}
        >
          <CustomizeTab
            {...{
              colors,
              styleColors,
              colorBlock,
              colorBlockHovered,
              loadingModel,
              uploadingFiles,
              areas
            }}
            files={modelConfig}
            onLoadModel={setLoadingAction}
            onSelectColorBlock={setColorBlockAction}
            onHoverColorBlock={setHoverColorBlockAction}
            onSelectColor={setColorAction}
            onUploadFiles={uploadFilesAction}
            onUploadDesign={uploadDesignAction}
          />
          <SettingsTab
            {...{ themeImage }}
            selectedTheme={selectedTheme}
            selectedStyle={selectedStyle}
            onSelectTheme={setSelectedThemeAction}
            onSelectStyle={setSelectedStyleAction}
            onDeleteTheme={this.handleOnDeleteTheme}
            onDeleteStyle={this.handleOnDeleteStyle}
            onSelectImage={this.handleOnSelectThemeImage}
            onDeleteImage={this.handleOnDeleteThemeImage}
          />
        </SwipeableViews>
      </Container>
    )
  }

  handleOnTransictionEnd = () => {
    const { setSwipingTabAction } = this.props
    setSwipingTabAction(false)
  }

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

  handleOnDeleteTheme = (id: number) => {}

  handleOnDeleteStyle = (id: number) => {}

  handleOnSelectThemeImage = (file: UploadFile) => {
    this.setState({ themeImage: [file] })
  }

  handleOnDeleteThemeImage = () => {
    this.setState({ themeImage: [] })
  }
}

const mapStateToProps = (state: any) => state.get('designerTool').toJS()

const DesignerToolEnhance = compose(
  connect(mapStateToProps, { ...designerToolActions, ...designerToolApi })
)(DesignerTool)

export default DesignerToolEnhance
