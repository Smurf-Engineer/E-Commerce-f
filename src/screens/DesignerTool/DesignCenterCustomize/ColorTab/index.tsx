/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
// import message from 'antd/lib/message'
// import indexOf from 'lodash/indexOf'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import DraggerWithLoading from '../../../../components/DraggerWithLoading'
import ColorButton from '../ColorButton'
import ColorList from '../ColorList'

import messages from './messages'

import {
  Container,
  TextColors,
  Top,
  ColorButtons,
  ButtonContainer,
  Icon
} from './styledComponents'
import { Message } from '../../../../types/common'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  uploadingFile: boolean
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
      uploadingFile
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
        <DraggerWithLoading
          className="upload"
          loading={uploadingFile}
          onSelectImage={this.beforeUpload}
          formatMessage={formatMessage}
          extensions={['.svg']}
        >
          <Button>
            <ButtonContainer>
              <Icon type="upload" />
            </ButtonContainer>
          </Button>
        </DraggerWithLoading>
        <ColorList {...{ onSelectColor }} />
      </Container>
    )
  }

  handleOnToggleColor = (color: string) => () => {
    const { onToggleColor } = this.props
    onToggleColor(color)
  }
  beforeUpload = (file: any) => {
    /* const {
      formatMessage,
      onUploadFile
    } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.fileSizeError))
        return false
      }
      const fileExtension = this.getFileExtension(name)
      if (indexOf(['.json'], (fileExtension as String).toLowerCase()) === -1) {
        message.error(formatMessage(messages.fileExtensionError))
        return false
      }
      onUploadFile(file, code)
    } */
    return false
  }
}

export default ColorTab
