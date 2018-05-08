/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import Tab from '../Tab'
import ColorTab from '../ColorTab'
import colorIcon from '../../../../assets/color_white.svg'
import uploadIcon from '../../../../assets/upload_white.svg'
import { Container } from './styledComponents'

const { TabPane } = AntdTabs

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  styleColors: string[]
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onHoverColorBlock: (index: number) => void
}

const Tabs = ({
  onSelectColorBlock,
  onHoverColorBlock,
  colorBlock,
  colorBlockHovered,
  onSelectColor,
  colors,
  styleColors
}: Props) => {
  return (
    <Container>
      <AntdTabs defaultActiveKey="1" size="large">
        <TabPane tab={<Tab label="upload" icon={uploadIcon} />} key="1">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab={<Tab label="color" icon={colorIcon} />} key="4">
          <ColorTab
            {...{
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlock,
              colorBlockHovered,
              onSelectColor,
              colors,
              styleColors
            }}
          />
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
