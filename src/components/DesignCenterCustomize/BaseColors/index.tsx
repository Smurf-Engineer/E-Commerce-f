/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import ColorButton from '../../ColorButton'
import ColorList from '../ColorList'
import { Container, ColorButtons } from './styledComponents'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onHoverColorBlock: (index: number) => void
  showContent: boolean
}

const colorsBlocks = ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5']

class ColorTab extends React.PureComponent<Props, {}> {
  render() {
    const {
      onSelectColorBlock,
      onHoverColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      colors,
      showContent
    } = this.props
    if (!showContent) {
      return null
    }
    const colorButtons = colorsBlocks.map((label, index) => {
      return (
        <ColorButton
          key={index}
          {...{
            index,
            label,
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
