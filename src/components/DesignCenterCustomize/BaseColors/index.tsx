/**
 * ColorTab Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Divider from 'antd/lib/divider'
// import findIndex from 'lodash/findIndex'
// import find from 'lodash/find'
// import messages from './messages'
// import ColorButton from '../../ColorButton'
import ColorList from '../ColorList'
// import baseColors from '../ColorList/colors'
import { Container } from './styledComponents'
import ColorButtons from '../ColorButtons'

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

class ColorTab extends React.PureComponent<Props, {}> {
  render() {
    const {
      onSelectColor,
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
    return (
      <Container>
        <ColorButtons
          {...{
            colors,
            colorBlock,
            onSelectColorBlock,
            colorBlockHovered,
            onHoverColorBlock,
            formatMessage
          }}
        />
        <Divider />
        <ColorList {...{ onSelectColor }} />
      </Container>
    )
  }
}

export default ColorTab
