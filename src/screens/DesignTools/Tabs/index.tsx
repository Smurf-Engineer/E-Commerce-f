/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import ColorTab from '../ColorTab'
import colorIcon from '../../../assets/color_white.svg'
import { Container, NavTabs } from './styledComponents'
import {
  UploadFile,
  Color,
  Message,
  QueryProps,
  Colors
} from '../../../types/common'
import Tab from '../../../components/DesignCenterCustomize/Tab'

const COLOR_TAB = 'COLOR_TAB'

const { TabPane } = AntdTabs

interface ColorsData extends QueryProps {
  colorsResult: Colors
}
interface Props {
  colors: Color[]
  stitchingColors: Color[]
  colorsList: ColorsData
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  selectedTab: number
  formatMessage: (messageDescriptor: Message) => string
  onUploadColorsList: (file: UploadFile, type: string) => void
  onTabClick: (selectedIndex: number) => void
}

const Tabs = ({
  colors,
  stitchingColors,
  formatMessage,
  onUploadColorsList,
  colorsList,
  uploadingColors,
  uploadingStitchingColors,
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
      </NavTabs>
    </Container>
  )
}

export default Tabs
