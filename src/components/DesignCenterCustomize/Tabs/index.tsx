/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import Tab from '../Tab'
import ColorsTab from '../ColorsTab'
import TextTab from '../TextTab'
import SymbolTab from '../SymbolTab'
import UploadTab from '../UploadTab'
import TutorialsTab from '../TutorialsTab'
import colorIcon from '../../../assets/color_white.svg'
import youtube_hover from '../../../assets/youtube_hover.svg'
import textIcon from '../../../assets/text_white.svg'
import imageIcon from '../../../assets/image_white.svg'
import uploadIcon from '../../../assets/upload_white.svg'
import {
  Palette,
  TextFormat,
  CanvasType,
  MyPaletteDesignCenterModals,
  ArtFormat,
  StitchingColor,
  AccesoryColor,
  Product,
  ImageFile,
  CanvasElement,
  SelectedAsset,
  SimpleFont,
  UserInfo
} from '../../../types/common'
import { Container } from './styledComponents'
import { CanvasElements } from '../../../screens/DesignCenter/constants'

const { TabPane } = AntdTabs

interface Props {
  colorBlock: number
  colorBlockHovered: number
  paletteName: string
  palettes: Palette[]
  colors: string[]
  styleColors: string[]
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bibColor?: AccesoryColor
  text: string
  productName: string
  canvas: CanvasType
  selectedElement: string
  textFormat: TextFormat
  artFormat: ArtFormat
  myPaletteModals: MyPaletteDesignCenterModals
  product?: Product
  images: ImageFile[]
  uploadingFile: boolean
  onUploadFile: (file: any) => void
  searchClipParam: string
  isUserAuthenticated: boolean
  disableTooltip: boolean
  selectedItem: SelectedAsset
  selectedTab: number
  fonts: SimpleFont[]
  colorsList: any
  colorChartSending: boolean
  colorChartModalOpen: boolean
  colorChartModalFormOpen: boolean
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onHoverColorBlock: (index: number) => void
  onUpdateText: (text: string) => void
  onApplyText: (text: string, style: TextFormat) => void
  onApplyImage: (file: ImageFile) => void
  onApplyArt: (url: string, style?: CanvasElement, fileId?: number) => void
  formatMessage: (messageDescriptor: any) => string
  onSelectTextFormat: (
    key: string,
    value: string | number,
    fontStyle: boolean
  ) => void
  onSelectArtFormat: (key: string, value: string | number) => void
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
  setSearchClipParamAction: (searchParam: string) => void
  onTabClick: (selectedIndex: number) => void
  onLockElement: (id: string, type: string) => void
  openLoginModalAction: (open: boolean, callback?: boolean) => void
  onRequestColorChart: (userInfo: UserInfo) => void
  onCloseColorChart: () => void
  onCloseColorChartForm: () => void
  onOpenFormChart: () => void
  onOpenColorChart: () => void
}

const Tabs = ({
  onSelectColorBlock,
  onHoverColorBlock,
  colorBlock,
  colorBlockHovered,
  onSelectColor,
  onSelectPalette,
  onChangePaletteName,
  paletteName,
  palettes,
  onSetPalettes,
  colors,
  styleColors,
  onUpdateText,
  text,
  onApplyText,
  onApplyImage,
  onApplyArt,
  formatMessage,
  productName,
  canvas,
  selectedElement,
  textFormat,
  artFormat,
  onSelectTextFormat,
  openPaletteModalAction,
  myPaletteModals,
  onSelectArtFormat,
  onSelectStitchingColor,
  stitchingColor,
  bindingColor,
  zipperColor,
  bibColor,
  onAccessoryColorSelected,
  product,
  onUploadFile,
  images,
  uploadingFile,
  searchClipParam,
  setSearchClipParamAction,
  isUserAuthenticated,
  selectedItem,
  disableTooltip = false,
  selectedTab,
  onTabClick,
  onLockElement,
  openLoginModalAction,
  fonts,
  colorsList,
  onRequestColorChart,
  colorChartSending,
  colorChartModalOpen,
  colorChartModalFormOpen,
  onCloseColorChart,
  onCloseColorChartForm,
  onOpenFormChart,
  onOpenColorChart
}: Props) => {
  return (
    <Container>
      <AntdTabs activeKey={`${selectedTab}`} onTabClick={onTabClick}>
        <TabPane tab={<Tab label="color" icon={colorIcon} />} key="1">
          <ColorsTab
            {...{
              disableTooltip,
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlock,
              colorBlockHovered,
              onSelectColor,
              colors,
              styleColors,
              onChangePaletteName,
              paletteName,
              palettes,
              onSelectPalette,
              onSetPalettes,
              formatMessage,
              openPaletteModalAction,
              myPaletteModals,
              stitchingColor,
              bindingColor,
              zipperColor,
              bibColor,
              onSelectStitchingColor,
              onAccessoryColorSelected,
              product,
              colorsList,
              onRequestColorChart,
              colorChartSending,
              colorChartModalOpen,
              colorChartModalFormOpen,
              onCloseColorChart,
              onCloseColorChartForm,
              onOpenFormChart,
              onOpenColorChart
            }}
          />
        </TabPane>
        <TabPane tab={<Tab label="text" icon={textIcon} />} key="2">
          <TextTab
            elements={canvas.text}
            {...{
              disableTooltip,
              text,
              onUpdateText,
              onApplyText,
              formatMessage,
              productName,
              selectedElement,
              textFormat,
              onSelectTextFormat,
              onLockElement,
              fonts,
              colorsList
            }}
          />
        </TabPane>
        <TabPane tab={<Tab label="symbol" icon={imageIcon} />} key="3">
          <SymbolTab
            {...{
              disableTooltip,
              onApplyArt,
              formatMessage,
              onSelectArtFormat,
              searchClipParam,
              setSearchClipParamAction,
              onLockElement,
              colorsList
            }}
            selectedElement={canvas.path[selectedElement]}
            selectedItem={
              selectedItem.type === CanvasElements.Path && selectedItem.id
            }
          />
        </TabPane>
        <TabPane tab={<Tab label="upload" icon={uploadIcon} />} key="4">
          <UploadTab
            {...{
              formatMessage,
              onApplyImage,
              onUploadFile,
              images,
              uploadingFile,
              isUserAuthenticated,
              onLockElement,
              openLoginModalAction
            }}
            selectedElement={canvas.image[selectedElement]}
            selectedItem={
              selectedItem.type === CanvasElements.Image && selectedItem.id
            }
          />
        </TabPane>
        <TabPane tab={<Tab label="tutorials" icon={youtube_hover} />} key="5">
          <TutorialsTab />
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
