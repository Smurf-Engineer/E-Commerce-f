/**
 * ColorButtons Component - Created by miguelcanobbio on 23/08/18.
 */
import * as React from 'react'
import findIndex from 'lodash/findIndex'
import messages from './messages'
import baseColors from '../ColorList/colors'
import { Container } from './styledComponents'
import ColorButton from '../../ColorButton'

interface Props {
  colorBlock?: number
  colorBlockHovered: number
  colors: string[]
  onSelectColorBlock: (index: number) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
}

interface State {
  names: string[]
}

const { area1, area2, area3, area4, area5 } = messages
const colorsBlocks = [area1, area2, area3, area4, area5]

class ColorButtons extends React.Component<Props, State> {
  state = {
    names: []
  }
  componentWillReceiveProps({ colors }: Props) {
    const { names } = this.state
    if (!names.length && !!colors.length) {
      this.prepareInitialColorNames(colors)
    }
  }
  render() {
    const {
      formatMessage,
      colorBlockHovered,
      onSelectColorBlock,
      onHoverColorBlock,
      colors,
      colorBlock = -1
    } = this.props
    const colorButtons = colorsBlocks.map((label, index) => {
      const { names } = this.state
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

  prepareInitialColorNames = (colors: string[]) => {
    const names = colors.map(color => {
      const index = findIndex(baseColors, o => o.value === color)
      return !!baseColors[index] ? baseColors[index].name : ''
    })
    this.setState({ names })
  }
}

export default ColorButtons
