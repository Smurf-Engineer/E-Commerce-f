/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import find from 'lodash/find'
import SwipeableViews from 'react-swipeable-views'
import UploadTab from '../UploadTab'
import ColorTab from '../ColorTab'
import Tab from '../Tab'
import Settings from '../../DesignSettings'
import InpirationTab from '../Settings'
import colorIcon from '../../../../assets/color_white.svg'
import uploadIcon from '../../../../assets/upload_white.svg'
import settingsIcon from '../../../../assets/settings.svg'
import designIcon from '../../../../assets/styles.svg'
import { Container } from './styledComponents'
import {
  DesignConfig,
  UploadFile,
  ModelConfig,
  DesignObject,
  ModelDesign
} from '../../../../types/common'
import { Data } from '../../DesignCenterCustomize'
import { NONE_ID, NONE } from '../../reducer'
import EditInspiration from '../EditInspiration'

const UPLOAD_TAB = 'UPLOAD_TAB'
const COLOR_TAB = 'COLOR_TAB'
const INSPIRATION_TAB = 'INSPIRATION_TAB'
const SETTINGS_TAB = 'SETTINGS_TAB'
const LIST_TAB = 0
const EDIT_TAB = 1

const { TabPane } = AntdTabs

interface Props {
  designConfig: DesignConfig[]
  productData?: Data
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  uploadingFiles: boolean
  uploadNewModel: boolean
  themeImage?: UploadFile[]
  selectedTheme: number
  selectedStyle: number
  productCode: string
  themeName: string
  design: ModelDesign
  uploadingThumbnail: boolean
  extraFiles: string[]
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  colorIdeaItem: number
  colorIdeas: DesignObject[]
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onDeleteInspiration: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onSaveDesign: () => void
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onHoverColorBlock: (index: number) => void
  onUploadFiles: (files: any, areas: any, extra: any) => void
  onUploadDesign: (areas: any, config: any) => void
  onSelectConfig: (config: DesignConfig) => void
  onSelectInspirationColor: (index: number) => void
  onUpdateProductCode: (code: string) => void
  onUpdateThemeName: (name: string) => void
  onUpdateDesignName: (name: string) => void
  onSelectComplexity: (design: number, complexity: number) => void
  onSaveThumbnail: (design: number, item: number, colors: string[]) => void
  onLoadDesign: (
    config: ModelConfig,
    colorIdeas: DesignObject[],
    design: ModelDesign
  ) => void
  onAddExtraFile: (file: string) => void
  onRemoveExtraFile: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  onToggleColor: (color: string) => void
  onEditColorIdea: (item: number) => void
}

const Tabs = ({
  designConfig,
  productCode,
  productData,
  onSelectColorBlock,
  onHoverColorBlock,
  colorBlock,
  colorBlockHovered,
  onSelectColor,
  colors,
  onUploadFiles,
  uploadingFiles,
  uploadNewModel,
  onUploadDesign,
  onSelectConfig,
  onSelectInspirationColor,
  themeImage,
  selectedTheme,
  selectedStyle,
  onSaveDesign,
  onSelectTheme,
  onSelectStyle,
  onDeleteTheme,
  onDeleteStyle,
  onDeleteInspiration,
  onSelectImage,
  onDeleteImage,
  onUpdateProductCode,
  themeName,
  onUpdateThemeName,
  onUpdateDesignName,
  onSelectComplexity,
  onSaveThumbnail,
  uploadingThumbnail,
  onLoadDesign,
  onAddExtraFile,
  onRemoveExtraFile,
  extraFiles,
  formatMessage,
  onToggleColor,
  bibBrace,
  zipper,
  binding,
  colorIdeaItem,
  onEditColorIdea,
  colorIdeas,
  design
}: Props) => {
  let colorIdea: DesignObject | null = null
  if (colorIdeaItem > NONE) {
    colorIdea = colorIdeas[colorIdeaItem]
  }
  return (
    <Container>
      <AntdTabs defaultActiveKey={SETTINGS_TAB} size="large">
        <TabPane
          key={SETTINGS_TAB}
          tab={<Tab label="product" icon={designIcon} />}
        >
          <Settings
            {...{
              themeImage,
              selectedTheme,
              selectedStyle,
              onSaveDesign,
              onSelectTheme,
              onSelectStyle,
              onDeleteTheme,
              onDeleteStyle,
              onSelectImage,
              onDeleteImage,
              onUpdateProductCode,
              productCode,
              productData,
              themeName,
              onUpdateThemeName,
              onUpdateDesignName,
              onLoadDesign,
              formatMessage
            }}
            designName={design && design.name}
          />
        </TabPane>
        <TabPane
          key={UPLOAD_TAB}
          tab={<Tab label="upload" icon={uploadIcon} />}
        >
          <UploadTab
            {...{
              onUploadFiles,
              uploadingFiles,
              onUploadDesign,
              onSelectConfig,
              onAddExtraFile,
              onRemoveExtraFile,
              extraFiles,
              uploadNewModel
            }}
          />
        </TabPane>
        <TabPane key={COLOR_TAB} tab={<Tab label="color" icon={colorIcon} />}>
          <ColorTab
            {...{
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlock,
              colorBlockHovered,
              onSelectColor,
              colors,
              onToggleColor,
              bibBrace,
              zipper,
              binding
            }}
          />
        </TabPane>
        <TabPane
          key={INSPIRATION_TAB}
          tab={<Tab label="config" icon={settingsIcon} />}
        >
          <SwipeableViews index={colorIdeaItem > NONE ? EDIT_TAB : LIST_TAB}>
            <InpirationTab
              designs={designConfig || []}
              onSelectPalette={onSelectInspirationColor}
              {...{
                onSelectComplexity,
                onUpdateDesignName,
                onSaveThumbnail,
                uploadingThumbnail,
                formatMessage,
                onSelectConfig,
                colorIdeas,
                onEditColorIdea,
                onDeleteInspiration,
                design
              }}
              render={colorIdeaItem === NONE}
            />
            <EditInspiration
              {...{ onEditColorIdea, colorIdea }}
              render={colorIdeaItem > NONE}
            />
          </SwipeableViews>
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
