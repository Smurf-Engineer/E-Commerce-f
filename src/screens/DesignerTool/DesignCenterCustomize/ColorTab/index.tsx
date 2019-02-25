/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import indexOf from 'lodash/indexOf'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import { getFileExtension } from '../../../../utils/utilsFiles'
import DraggerWithLoading from '../../../../components/DraggerWithLoading'
import ColorButton from '../ColorButton'
import ColorList from '../ColorList'

import messages from './messages'
import { COLORS, STITCHING_COLORS } from './constants'

import {
  Container,
  TextColors,
  Top,
  ColorButtons,
  ButtonContainer,
  Icon,
  DraggerContainer,
  SectionTitle
} from './styledComponents'
import { Message } from '../../../../types/common'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  colorsList: any
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onHoverColorBlock: (index: number) => void
  onToggleColor: (color: string) => void
  formatMessage: (messageDescriptor: Message) => string
  onUploadFile: (file: any, code: string) => void
}

const extraBlocks = [
  {
    key: 'bibBrace',
    label: 'Bib Brace'
  },
  {
    key: 'zipper',
    label: 'Zipper'
  },
  {
    key: 'binding',
    label: 'Binding'
  }
]

class ColorTab extends React.PureComponent<Props> {
  render() {
    const {
      onSelectColorBlock,
      onHoverColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      colors,
      formatMessage,
      colorsList,
      uploadingColors,
      uploadingStitchingColors
    } = this.props
    const colorButtons = colors.map((color, index) => (
      <ColorButton
        key={index}
        {...{
          index,
          label: `Area ${index + 1}`,
          colorBlockHovered,
          onSelectColorBlock,
          onHoverColorBlock
        }}
        currentColor={color}
        selected={colorBlock === index}
      />
    ))
    const extraButtons = extraBlocks.map(({ label, key }, index) => (
      <ColorButton
        key={index}
        {...{ index, label }}
        onSelectColorBlock={this.handleOnToggleColor(key)}
        currentColor={this.props[key] ? '#FFFFFF' : '#000000'}
        selected={false}
      />
    ))
    return (
      <Container>
        <Top>
          <TextColors>
            <FormattedMessage {...messages.selectColor} />
          </TextColors>
        </Top>
        <ColorButtons>{extraButtons}</ColorButtons>
        <ColorButtons>{colorButtons}</ColorButtons>
        <Divider />
        <SectionTitle>
          <FormattedMessage {...messages.baseColors} />
        </SectionTitle>
        <DraggerContainer>
          <DraggerWithLoading
            className="upload"
            loading={uploadingColors}
            onSelectImage={this.beforeUploadColors}
            formatMessage={formatMessage}
            extensions={['.json']}
          >
            <Button>
              <ButtonContainer>
                <Icon type="upload" />
              </ButtonContainer>
            </Button>
          </DraggerWithLoading>
        </DraggerContainer>
        <ColorList stitching={false} {...{ onSelectColor, colorsList }} />
        <SectionTitle>
          <FormattedMessage {...messages.stitchingColors} />
        </SectionTitle>
        <DraggerContainer>
          <DraggerWithLoading
            className="upload"
            loading={uploadingStitchingColors}
            onSelectImage={this.beforeUploadStitchingColors}
            formatMessage={formatMessage}
            extensions={['.json']}
          >
            <Button>
              <ButtonContainer>
                <Icon type="upload" />
              </ButtonContainer>
            </Button>
          </DraggerWithLoading>
        </DraggerContainer>
        <ColorList stitching={true} {...{ colorsList }} />
      </Container>
    )
  }

  handleOnToggleColor = (color: string) => () => {
    const { onToggleColor } = this.props
    onToggleColor(color)
  }
  beforeUploadColors = (file: any) => {
    return this.beforeUpload(file, COLORS)
  }
  beforeUploadStitchingColors = (file: any) => {
    return this.beforeUpload(file, STITCHING_COLORS)
  }
  beforeUpload = (file: any, type: string) => {
    const { formatMessage, onUploadFile } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.fileSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      if (indexOf(['.json'], (fileExtension as String).toLowerCase()) === -1) {
        message.error(formatMessage(messages.fileExtensionError))
        return false
      }
      onUploadFile(file, type)
    }
    return false
  }
}

export default ColorTab
