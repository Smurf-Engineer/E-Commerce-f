/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import Tab from '../Tab'
import ColorTab from '../ColorTab'
import TextTab from '../TextTab'
import UploadTab from '../UploadTab'
import colorIcon from '../../../assets/color_white.svg'
import textIcon from '../../../assets/text_white.svg'
import imageIcon from '../../../assets/image_white.svg'
import uploadIcon from '../../../assets/upload_white.svg'
import {
  Palette,
  TextFormat,
  CanvasType,
  MyPaletteDesignCenterModals
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
  text: string
  productName: string
  canvas: CanvasType
  selectedElement: string
  textFormat: TextFormat
  myPaletteModals: MyPaletteDesignCenterModals
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onHoverColorBlock: (index: number) => void
  onUpdateText: (text: string) => void
  onApplyText: (text: string, style: TextFormat) => void
  onApplyImage: (base64: string) => void
  formatMessage: (messageDescriptor: any) => string
  onSelectTextFormat: (key: string, value: string | number) => void
  openPaletteModalAction: (key: string, open: boolean, value: number) => void
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
  formatMessage,
  productName,
  canvas,
  selectedElement,
  textFormat,
  onSelectTextFormat,
  openPaletteModalAction,
  myPaletteModals
}: Props) => {
  return (
    <Container>
      <AntdTabs defaultActiveKey="1">
        <TabPane tab={<Tab label="color" icon={colorIcon} />} key="1">
          <ColorTab
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
              myPaletteModals
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
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab={<Tab label="upload" icon={uploadIcon} />} key="4">
          <UploadTab {...{ formatMessage, onApplyImage }} />
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
