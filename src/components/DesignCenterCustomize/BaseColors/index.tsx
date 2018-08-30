/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import findIndex from 'lodash/findIndex'
import messages from './messages'
import ColorButton from '../../ColorButton'
import ColorList from '../ColorList'
import baseColors from '../ColorList/colors'
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

interface State {
  names: string[]
}

class ColorTab extends React.PureComponent<Props, State> {
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
      onSelectColorBlock,
      onHoverColorBlock,
      colorBlock,
      colorBlockHovered,
      colors,
      showContent,
      formatMessage
    } = this.props
    if (!showContent) {
      return null
    }
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
    return (
      <Container>
        <ColorButtons>{colorButtons}</ColorButtons>
        <Divider />
        <ColorList onSelectColor={this.handleOnSelectColor} />
      </Container>
    )
  }

  handleOnSelectColor = (color: string, name: string) => {
    this.setState(({ names }: State) => {
      const { onSelectColor, colorBlock } = this.props
      const updatedNames = [...names]
      onSelectColor(color)
      updatedNames[colorBlock] = name
      return { names: updatedNames }
    })
  }

  prepareInitialColorNames = (colors: string[]) => {
    const names = colors.map(color => {
      const index = findIndex(baseColors, o => o.value === color)
      return !!baseColors[index] ? baseColors[index].name : ''
    })

    this.setState({ names })
  }
}

export default ColorTab
