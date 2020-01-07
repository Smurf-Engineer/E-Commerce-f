/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import ColorTab from '../ColorTab'
import FontTab from '../FontTab'
import colorIcon from '../../../assets/color_white.svg'
import fontIcon from '../../../assets/text_white.svg'
import { Container, NavTabs } from './styledComponents'
import { UploadFile, Color, Message } from '../../../types/common'
import Tab from '../../../components/DesignCenterCustomize/Tab'

const COLOR_TAB = 'COLOR_TAB'
const FONT_TAB = 'FONT_TAB'

const { TabPane } = AntdTabs

interface Props {
  colors: Color[]
  stitchingColors: Color[]
  fonts: string[]
  visibleFonts: any[]
  searchText: string
  colorsList: any
  fontsData: any
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  selectedTab: number
  selectedFonts: { [id: string]: boolean }
  changeFont: (font: string, active: boolean) => void
  formatMessage: (messageDescriptor: Message) => string
  setGoogleFontsList: (data: any) => void
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  onUploadColorsList: (file: UploadFile, type: string) => void
  getGoogleFonts: () => void
  onTabClick: (selectedIndex: number) => void
}

const Tabs = ({
  colors,
  stitchingColors,
  formatMessage,
  setGoogleFontsList,
  fonts,
  fontsData,
  addFont,
  selectedFonts,
  changeFont,
  visibleFonts,
  onUpdateSearchText,
  searchText,
  onUploadColorsList,
  colorsList,
  uploadingColors,
  uploadingStitchingColors,
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
      </NavTabs>
    </Container>
  )
}

export default Tabs
