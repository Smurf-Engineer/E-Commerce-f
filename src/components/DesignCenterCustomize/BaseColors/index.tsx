/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import messages from './messages'
import ColorButton from '../../ColorButton'
import ColorList from '../ColorList'
import { Container, ColorButtons } from './styledComponents'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  showContent: boolean
  onSelectColor: (color: string) => void
  onSelectColorBlock: (index: number) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
}
const { area1, area2, area3, area4, area5 } = messages
const colorsBlocks = [area1, area2, area3, area4, area5]

class ColorTab extends React.PureComponent<Props, {}> {
  render() {
    const {
      onSelectColorBlock,
      onHoverColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      colors,
      showContent,
      formatMessage
    } = this.props
    if (!showContent) {
      return null
    }
    const colorButtons = colorsBlocks.map((label, index) => {
      return (
        <ColorButton
          key={index}
          label={formatMessage(label)}
          {...{
            index,
            colorBlockHovered,
            onSelectColorBlock,
            onHoverColorBlock
          }}
          currentColor={colors[index]}
          selected={colorBlock === index}
        />
      )
    })
    return (
      <Container>
        <ColorButtons>{colorButtons}</ColorButtons>
        <Divider />
        <ColorList {...{ onSelectColor }} />
      </Container>
    )
  }
}

export default ColorTab
