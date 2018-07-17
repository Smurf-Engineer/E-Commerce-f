/**
 * DesignerTool Screen - Created by david on 08/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import SwipeableViews from 'react-swipeable-views'
import Tabs from './DesignCenterCustomize/DesignCenterTabs'
import CustomizeTab from './DesignCenterCustomize'
import SettingsTab from './DesignSettings/'
import * as designerToolActions from './actions'
import * as designerToolApi from './api'
import { Container, ButtonWrapper } from './styledComponents'
import { ModelConfig, UploadFile, DesignConfig } from '../../types/common'

const ContainerFaac = ({
  currentTab,
  colors,
  colorBlock,
  colorBlockHovered,
  loadingModel,
  uploadingFiles,
  areas,
  designConfig,
  handleOnTransitionEnd,
  modelConfig,
  setLoadingAction,
  setColorBlockAction,
  setHoverColorBlockAction,
  setColorAction,
  uploadFilesAction,
  uploadDesignAction,
  setDesignConfigAction,
  setInspirationColorAction,
  themeImage,
  selectedTheme,
  selectedStyle,
  setSelectedThemeAction,
  setSelectedStyleAction,
  handleOnDeleteTheme,
  handleOnDeleteStyle,
  handleOnSelectThemeImage,
  handleOnDeleteThemeImage,
  children
}: any) => (
  <Container>
    <SwipeableViews index={currentTab} onTransitionEnd={handleOnTransitionEnd}>
      <CustomizeTab
        {...{
          colors,
          colorBlock,
          colorBlockHovered,
          loadingModel,
          uploadingFiles,
          areas,
          designConfig
        }}
        files={modelConfig}
        onLoadModel={setLoadingAction}
        onSelectColorBlock={setColorBlockAction}
        onHoverColorBlock={setHoverColorBlockAction}
        onSelectColor={setColorAction}
        onUploadFiles={uploadFilesAction}
        onUploadDesign={uploadDesignAction}
        onSelectConfig={setDesignConfigAction}
        onSelectInspirationColor={setInspirationColorAction}
        onSaveDesign={() => {}}
      >
        {children}
      </CustomizeTab>
      <SettingsTab
        {...{ themeImage, selectedTheme, selectedStyle }}
        onSaveDesign={() => {}}
        onSelectTheme={setSelectedThemeAction}
        onSelectStyle={setSelectedStyleAction}
        onDeleteTheme={handleOnDeleteTheme}
        onDeleteStyle={handleOnDeleteStyle}
        onSelectImage={handleOnSelectThemeImage}
        onDeleteImage={handleOnDeleteThemeImage}
      />
    </SwipeableViews>
  </Container>
)

interface Props {
  designConfig: DesignConfig
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
  setDesignConfigAction: (config: DesignConfig) => void
  setInspirationColorAction: (index: number) => void
}

export class DesignerTool extends React.Component<Props, {}> {
  state = {
    themeImage: []
  }
  render() {
    const {
      colors,
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
      currentTab,
      setSelectedThemeAction,
      setSelectedStyleAction,
      setDesignConfigAction,
      setInspirationColorAction,
      designConfig,
      selectedTheme,
      selectedStyle
    } = this.props
    const { themeImage } = this.state
    return (
      <div>
        <Tabs {...{ currentTab }} onSelectTab={this.handleOnSelectTab} />
        <ContainerFaac
          {...{
            themeImage,
            colors,
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
            setDesignConfigAction,
            setInspirationColorAction,
            selectedStyle,
            designConfig
          }}
        >
          {(saveDesign: any) => (
            <ButtonWrapper>
              <Button onClick={saveDesign} type="primary">
                Save
              </Button>
            </ButtonWrapper>
          )}
        </ContainerFaac>
      </div>
    )
  }

  handleOnTransitionEnd = () => {
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

  handleSaveDesign = () => {
    const { setCurrentTabAction, currentTab } = this.props
    if (currentTab === 0) {
      setCurrentTabAction(1)
    }
  }
}

const mapStateToProps = (state: any) => state.get('designerTool').toJS()

const DesignerToolEnhance = compose(
  connect(mapStateToProps, { ...designerToolActions, ...designerToolApi })
)(DesignerTool)

export default DesignerToolEnhance
