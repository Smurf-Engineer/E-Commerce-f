/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import { FormattedMessage } from 'react-intl'
import Tab from '../Tab'
import ColorTab from '../ColorTab'
import messages from './messages'
import colorIcon from '../../../assets/color_white.svg'
import textIcon from '../../../assets/text_white.svg'
import imageIcon from '../../../assets/image_white.svg'
import uploadIcon from '../../../assets/upload_white.svg'
import { Container, Text } from './styledComponents'

const { TabPane } = AntdTabs

interface Props {}

const Tabs = (props: Props) => {
  return (
    <Container>
      <AntdTabs defaultActiveKey="1">
        <TabPane tab={<Tab label="color" icon={colorIcon} />} key="1">
          <ColorTab />
        </TabPane>
        <TabPane tab={<Tab label="text" icon={textIcon} />} key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab={<Tab label="symbol" icon={imageIcon} />} key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab={<Tab label="upload" icon={uploadIcon} />} key="4">
          Content of Tab Pane 3
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
