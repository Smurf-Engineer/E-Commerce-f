/**
 * Tabs Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import AntdTabs from 'antd/lib/tabs'
import Tab from '../Tab'
import UploadTab from '../UploadTab'
import ColorTab from '../ColorTab'
import InpirationTab from '../InspirationColors'
import colorIcon from '../../../../assets/color_white.svg'
import uploadIcon from '../../../../assets/upload_white.svg'
import { Container } from './styledComponents'

const UPLOAD_TAB = 'UPLOAD_TAB'
const COLOR_TAB = 'COLOR_TAB'
const INSPIRATION_TAB = 'INSPIRATION_TAB'

const { TabPane } = AntdTabs

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  styleColors: string[]
  uploadingFiles: boolean
  uploadNewModel: boolean
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onHoverColorBlock: (index: number) => void
  onUploadFiles: (files: any) => void
  onUploadDesign: (files: any) => void
}

const Tabs = ({
  onSelectColorBlock,
  onHoverColorBlock,
  colorBlock,
  colorBlockHovered,
  onSelectColor,
  colors,
  styleColors,
  onUploadFiles,
  uploadingFiles,
  uploadNewModel,
  onUploadDesign
}: Props) => {
  return (
    <Container>
      <AntdTabs defaultActiveKey={UPLOAD_TAB} size="large">
        <TabPane
          key={UPLOAD_TAB}
          tab={<Tab label="upload" icon={uploadIcon} />}
        >
          <UploadTab
            {...{
              onUploadFiles,
              uploadingFiles,
              uploadNewModel,
              onUploadDesign
            }}
          />
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
              styleColors
            }}
          />
        </TabPane>
        <TabPane
          key={INSPIRATION_TAB}
          tab={<Tab label="inspiration" icon={colorIcon} />}
        >
          <InpirationTab />
        </TabPane>
      </AntdTabs>
    </Container>
  )
}

export default Tabs
