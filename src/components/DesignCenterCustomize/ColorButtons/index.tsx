/**
 * ColorButtons Component - Created by miguelcanobbio on 23/08/18.
 */
import * as React from 'react'
import messages from './messages'
import { Container } from './styledComponents'
import ColorButton from '../../ColorButton'

interface Props {
  colorBlock?: number
  colorBlockHovered: number
  colors: string[]
  names: string[]
  onSelectColorBlock: (index: number) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
}

const { area1, area2, area3, area4, area5 } = messages
const colorsBlocks = [area1, area2, area3, area4, area5]

class ColorButtons extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      colorBlockHovered,
      onSelectColorBlock,
      onHoverColorBlock,
      colors,
      colorBlock = -1,
      names
    } = this.props
    const colorButtons = colorsBlocks.map((label, index) => {
      const name = names[index]
      return (
        <ColorButton
          key={index}
          label={formatMessage(label)}
          {...{
            name,
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
    return <Container>{colorButtons}</Container>
  }
}

export default ColorButtons
