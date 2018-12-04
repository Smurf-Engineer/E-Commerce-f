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
  formatMessage: (messageDescriptor: any, params: any) => string
}

const { area } = messages

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
    const colorButtons = colors.map((label, index) => {
      const name = names[index]
      return (
        <ColorButton
          key={index}
          label={formatMessage(area, { index: index + 1 })}
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
