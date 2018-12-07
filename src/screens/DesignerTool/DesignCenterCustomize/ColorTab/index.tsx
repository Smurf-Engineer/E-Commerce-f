/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Divider from 'antd/lib/divider'
import ColorButton from '../ColorButton'
import ColorList from '../ColorList'

import messages from './messages'

import { Container, TextColors, Top, ColorButtons } from './styledComponents'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  bibBrace: boolean
  zipper: boolean
  binding: boolean
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onHoverColorBlock: (index: number) => void
  onToggleColor: (color: string) => void
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
      colors
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
        <ColorList {...{ onSelectColor }} />
      </Container>
    )
  }

  handleOnToggleColor = (color: string) => () => {
    const { onToggleColor } = this.props
    onToggleColor(color)
  }
}

export default ColorTab
