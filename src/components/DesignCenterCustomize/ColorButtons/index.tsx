/**
 * ColorButtons Component - Created by miguelcanobbio on 23/08/18.
 */
import * as React from 'react'
import messages from './messages'
import { Container, ShuffleButton, Icon } from './styledComponents'
import ColorButton from '../../ColorButton'
import shuffleIcon from '../../../assets/shuffle.png'

interface Props {
  colorBlock?: number
  colorBlockHovered: number
  colors: string[]
  names: string[]
  excludedAreas: any
  onSelectColorBlock: (index: number) => void
  onSelectShuffle: (e: React.MouseEvent) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any, params?: any) => string
}

const { area } = messages

class ColorButtons extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      colorBlockHovered,
      onSelectColorBlock,
      onHoverColorBlock,
      onSelectShuffle,
      excludedAreas = {},
      colors,
      colorBlock = -1,
      names
    } = this.props
    const colorButtons = colors.map((label, index) => {
      const name = names[index]
      return !excludedAreas[index] ? (
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
      ) : null
    })
    return (
      <Container>
        {colorButtons}
        {colorButtons.length > 1 && (
          <ShuffleButton onClick={onSelectShuffle} className="custom-tooltip">
            <Icon src={shuffleIcon} />
            <div className="tooltip-content">{formatMessage({ ...messages.shuffleColors })}</div>
          </ShuffleButton>
        )}
      </Container>
    )
  }
}

export default ColorButtons
