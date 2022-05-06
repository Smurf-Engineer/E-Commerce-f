/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
import ColorList from '../ColorList'
import { Container } from './styledComponents'
import ColorButtons from '../ColorButtons'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  colors: string[]
  names: string[]
  showContent: boolean
  disableTooltip: boolean
  colorsList: any
  excludedAreas: any
  onSelectColor: (color: string, name: string) => void
  onSelectShuffle: () => void
  onSelectColorBlock: (index: number) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
}

class ColorTab extends React.PureComponent<Props, {}> {
  render() {
    const {
      onSelectColor,
      onSelectColorBlock,
      onHoverColorBlock,
      onSelectShuffle,
      colorBlock,
      colorBlockHovered,
      colors,
      excludedAreas,
      showContent,
      formatMessage,
      names,
      disableTooltip,
      colorsList
    } = this.props
    if (!showContent) {
      return null
    }
    return (
      <Container>
        <ColorButtons
          {...{
            names,
            colors,
            excludedAreas,
            colorBlock,
            onSelectColorBlock,
            onSelectShuffle,
            colorBlockHovered,
            onHoverColorBlock,
            formatMessage
          }}
        />
        <Divider />
        <ColorList
          {...{ onSelectColor, disableTooltip, colorsList, formatMessage }}
        />
      </Container>
    )
  }
}

export default ColorTab
