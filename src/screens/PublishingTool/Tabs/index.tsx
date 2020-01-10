/**
 * Tabs Component - Created by eduardoquintero on 06/12/19.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import Tab from '../Tab'
import colorIcon from '../../../assets/color_white.svg'
import clipartsIcon from '../../../assets/image_white.svg'
import { Container } from './styledComponents'

const COLOR_TAB = 'COLOR_TAB'
const SYMBOLS_TAB = 'SYMBOLS_TAB'

export const Mode = {
  Style: 'style',
  Placeholder: 'placeholder'
}

const { TabPane } = AntdTabs

interface Props {
  selectedTab: number
  onTabClick: (selectedIndex: number) => void
}

const Tabs = ({ selectedTab, onTabClick }: Props) => {
  return (
    <Container>
      <AntdTabs
        activeKey={`${selectedTab}`}
        size="large"
        onTabClick={onTabClick}
      >
        <TabPane key={COLOR_TAB} tab={<Tab label="color" icon={colorIcon} />}>
          {/*  TODO: Add Colors Tab*/}
        </TabPane>
        <TabPane
          key={SYMBOLS_TAB}
          tab={<Tab label="symbol" icon={clipartsIcon} />}
        >
          {/*  TODO: Add Symbols Tab*/}
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
