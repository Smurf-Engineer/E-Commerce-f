/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import SwipeableViews from 'react-swipeable-views'
import UploadTab from '../UploadTab'
import ColorTab from '../ColorTab'
import SymbolTab from '../SymbolTab'
import Tab from '../Tab'
import Product from '../../DesignSettings'
import InpirationTab from '../Settings'
import FontTab from '../FontTab'
import colorIcon from '../../../../assets/color_white.svg'
import uploadIcon from '../../../../assets/upload_white.svg'
import settingsIcon from '../../../../assets/settings.svg'
import designIcon from '../../../../assets/styles.svg'
import fontIcon from '../../../../assets/text_white.svg'
import clipartsIcon from '../../../../assets/image_white.svg'
import { Container } from './styledComponents'
import {
  DesignConfig,
  UploadFile,
  ModelConfig,
  DesignObject,
  ModelDesign,
  Theme
} from '../../../../types/common'
import { Data } from '../../DesignCenterCustomize'
import { NONE, DESIGN_COLORS } from '../../reducer'
import EditInspiration from '../EditInspiration'

const UPLOAD_TAB = 'UPLOAD_TAB'
const COLOR_TAB = 'COLOR_TAB'
const INSPIRATION_TAB = 'INSPIRATION_TAB'
const SETTINGS_TAB = 'SETTINGS_TAB'
const FONT_TAB = 'FONT_TAB'
const SYMBOLS_TAB = 'SYMBOLS_TAB'
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
  fonts: string[]
  visibleFonts: any[]
  searchText: string
  colorsList: any
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  uploadingSymbol: boolean
  searchClipParam: string
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onDeleteInspiration: (id: number, index: number) => void
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
  onSaveThumbnail: (item: number, colors: string[]) => void
  onUpdateColorIdeaName: (
    name: string,
    updateColors: boolean,
    item?: number
  ) => void
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
  onAddColorIdea: () => void
  onEditTheme: (theme: Theme | null) => void
  changeThemesPosition: (dragIndex: number, dropIndex: number) => void
  changeStylesPosition: (dragIndex: number, dropIndex: number) => void
  setGoogleFontsList: (data: any) => void
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  onUploadColorsList: (file: any, type: string) => void
  onUploadFile: (file: any) => void
  setSearchClipParamAction: (param: string) => void
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
  design,
  onUpdateColorIdeaName,
  onAddColorIdea,
  onEditTheme,
  changeThemesPosition,
  changeStylesPosition,
  setGoogleFontsList,
  fonts,
  addFont,
  visibleFonts,
  onUpdateSearchText,
  searchText,
  onUploadColorsList,
  colorsList,
  uploadingColors,
  uploadingStitchingColors,
  onUploadFile,
  uploadingSymbol,
  searchClipParam,
  setSearchClipParamAction
}: Props) => {
  let colorIdea: DesignObject | ModelDesign | null = null
  let renderList = true
  if (colorIdeaItem !== NONE) {
    colorIdea =
      colorIdeaItem === DESIGN_COLORS ? design : colorIdeas[colorIdeaItem]
    renderList = false
  }
  return (
    <Container>
      <AntdTabs defaultActiveKey={SETTINGS_TAB} size="large">
        <TabPane
          key={SETTINGS_TAB}
          tab={<Tab label="product" icon={designIcon} />}
        >
          <Product
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
              formatMessage,
              onEditTheme,
              changeThemesPosition,
              changeStylesPosition
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
        <TabPane
          key={INSPIRATION_TAB}
          tab={<Tab label="config" icon={settingsIcon} />}
        >
          <SwipeableViews index={renderList ? LIST_TAB : EDIT_TAB}>
            <InpirationTab
              designs={designConfig || []}
              onSelectPalette={onSelectInspirationColor}
              {...{
                onAddColorIdea,
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
              render={renderList}
            />
            <EditInspiration
              render={!renderList}
              {...{
                colors,
                colorIdea,
                colorBlock,
                onSelectColor,
                onEditColorIdea,
                onSaveThumbnail,
                colorBlockHovered,
                onHoverColorBlock,
                onSelectColorBlock,
                onUpdateColorIdeaName
              }}
            />
          </SwipeableViews>
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
              binding,
              formatMessage,
              colorsList,
              uploadingColors,
              uploadingStitchingColors
            }}
            onUploadFile={onUploadColorsList}
          />
        </TabPane>
        <TabPane
          key={SYMBOLS_TAB}
          tab={<Tab label="symbol" icon={clipartsIcon} />}
        >
          <SymbolTab
            {...{
              formatMessage,
              onUploadFile,
              uploadingSymbol,
              searchClipParam,
              setSearchClipParamAction
            }}
            disableTooltip={false}
            selectedElement={0}
            selectedItem={false}
          />
        </TabPane>
        <TabPane key={FONT_TAB} tab={<Tab label="fonts" icon={fontIcon} />}>
          <FontTab
            {...{
              setGoogleFontsList,
              fonts,
              addFont,
              visibleFonts,
              onUpdateSearchText,
              searchText,
              formatMessage
            }}
          />
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
