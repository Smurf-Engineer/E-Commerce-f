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
import colorIcon from '../../../assets/color_white.svg'
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
  CanvasElement
} from '../../../types/common'
import { Container } from './styledComponents'

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
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onHoverColorBlock: (index: number) => void
  onUpdateText: (text: string) => void
  onApplyText: (text: string, style: TextFormat) => void
  onApplyImage: (file: ImageFile) => void
  onApplyArt: (url: string, fileId?: number, style?: CanvasElement) => void
  formatMessage: (messageDescriptor: any) => string
  onSelectTextFormat: (key: string, value: string | number) => void
  onSelectArtFormat: (key: string, value: string | number) => void
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
  setSearchClipParamAction: (searchParam: string) => void
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
  isUserAuthenticated
}: Props) => {
  return (
    <Container>
      <AntdTabs defaultActiveKey="1">
        <TabPane tab={<Tab label="color" icon={colorIcon} />} key="1">
          <ColorsTab
            {...{
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
              product
            }}
          />
        </TabPane>
        <TabPane tab={<Tab label="text" icon={textIcon} />} key="2">
          <TextTab
            elements={canvas.text}
            {...{
              text,
              onUpdateText,
              onApplyText,
              formatMessage,
              productName,
              selectedElement,
              textFormat,
              onSelectTextFormat
            }}
          />
        </TabPane>
        <TabPane tab={<Tab label="symbol" icon={imageIcon} />} key="3">
          <SymbolTab
            {...{
              onApplyArt,
              formatMessage,
              onSelectArtFormat,
              searchClipParam,
              setSearchClipParamAction
            }}
            selectedElement={canvas.path[selectedElement]}
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
              isUserAuthenticated
            }}
          />
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
