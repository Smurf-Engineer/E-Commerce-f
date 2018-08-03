/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import Tab from '../Tab'
import UploadTab from '../UploadTab'
import ColorTab from '../ColorTab'
import Settings from '../../DesignSettings'
import InpirationTab from '../Settings'
import colorIcon from '../../../../assets/color_white.svg'
import uploadIcon from '../../../../assets/upload_white.svg'
import settingsIcon from '../../../../assets/settings.svg'
import designIcon from '../../../../assets/styles.svg'
import { Container } from './styledComponents'
import { DesignConfig, UploadFile, ModelConfig } from '../../../../types/common'
import { Data } from '../../DesignCenterCustomize'

const UPLOAD_TAB = 'UPLOAD_TAB'
const COLOR_TAB = 'COLOR_TAB'
const INSPIRATION_TAB = 'INSPIRATION_TAB'
const SETTINGS_TAB = 'SETTINGS_TAB'

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
  styleName: string
  uploadingThumbnail: boolean
  extraFiles: string[]
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
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
  onUpdateStyleName: (design: number, name: string) => void
  onSelectComplexity: (design: number, complexity: number) => void
  onSaveThumbnail: (design: number, item: number, colors: string[]) => void
  onLoadDesign: (config: ModelConfig) => void
  onAddExtraFile: (file: string) => void
  onRemoveExtraFile: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  onToggleColor: (color: string) => void
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
  onSelectImage,
  onDeleteImage,
  onUpdateProductCode,
  themeName,
  styleName,
  onUpdateThemeName,
  onUpdateStyleName,
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
  binding
}: Props) => {
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
              styleName,
              onUpdateThemeName,
              onUpdateStyleName,
              onLoadDesign,
              formatMessage
            }}
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
          <InpirationTab
            designs={designConfig || []}
            onSelectPalette={onSelectInspirationColor}
            {...{
              onSelectComplexity,
              onUpdateStyleName,
              onSaveThumbnail,
              uploadingThumbnail,
              formatMessage,
              onSelectConfig
            }}
          />
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
