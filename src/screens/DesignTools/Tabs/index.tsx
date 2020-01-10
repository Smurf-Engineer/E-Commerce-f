/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import ColorTab from '../ColorTab'
import SymbolTab from '../SymbolTab'
import FontTab from '../FontTab'
import colorIcon from '../../../assets/color_white.svg'
import fontIcon from '../../../assets/text_white.svg'
import clipartsIcon from '../../../assets/image_white.svg'
import { Container, NavTabs } from './styledComponents'
import {
  UploadFile,
  Color,
  Message,
  ClipArt,
  QueryProps,
  Colors,
  SelectedFonts,
  Font,
  HiddenSymbols
} from '../../../types/common'
import Tab from '../../../components/DesignCenterCustomize/Tab'

const COLOR_TAB = 'COLOR_TAB'
const FONT_TAB = 'FONT_TAB'
const SYMBOLS_TAB = 'SYMBOLS_TAB'

const { TabPane } = AntdTabs

interface ColorsData extends QueryProps {
  colorsResult: Colors
}

interface FontsData extends QueryProps {
  fonts: Font[]
}

interface Props {
  colors: Color[]
  stitchingColors: Color[]
  fonts: string[]
  visibleFonts: string[]
  searchText: string
  colorsList: ColorsData
  fontsData: FontsData
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  uploadingSymbol: boolean
  searchClipParam: string
  selectedTab: number
  symbols: ClipArt[]
  hiddenSymbols: HiddenSymbols
  selectedFonts: SelectedFonts
  changeFont: (font: string, active: boolean) => void
  formatMessage: (messageDescriptor: Message) => string
  setGoogleFontsList: (data: any) => void
  hideSymbol: (url: string, id: string) => void
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  onUploadColorsList: (file: UploadFile, type: string) => void
  onUploadFile: (file: UploadFile) => void
  setSearchClipParamAction: (param: string) => void
  getGoogleFonts: () => void
  onTabClick: (selectedIndex: string) => void
}

const Tabs = ({
  colors,
  stitchingColors,
  formatMessage,
  setGoogleFontsList,
  fonts,
  fontsData,
  symbols,
  addFont,
  selectedFonts,
  changeFont,
  hiddenSymbols,
  hideSymbol,
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
  setSearchClipParamAction,
  getGoogleFonts,
  selectedTab,
  onTabClick
}: Props) => {
  return (
    <Container>
      <NavTabs
        activeKey={`${selectedTab}`}
        size="large"
        onTabClick={onTabClick}
      >
        <TabPane key={COLOR_TAB} tab={<Tab label="color" icon={colorIcon} />}>
          <ColorTab
            {...{
              formatMessage,
              colorsList,
              stitchingColors,
              colors,
              uploadingColors,
              uploadingStitchingColors
            }}
            onUploadFile={onUploadColorsList}
          />
        </TabPane>
        <TabPane key={FONT_TAB} tab={<Tab label="fonts" icon={fontIcon} />}>
          <FontTab
            {...{
              setGoogleFontsList,
              fonts,
              addFont,
              fontsData,
              visibleFonts,
              changeFont,
              selectedFonts,
              onUpdateSearchText,
              searchText,
              formatMessage,
              getGoogleFonts
            }}
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
              symbols,
              hiddenSymbols,
              uploadingSymbol,
              hideSymbol,
              searchClipParam,
              setSearchClipParamAction
            }}
          />
        </TabPane>
      </NavTabs>
    </Container>
  )
}

export default Tabs
