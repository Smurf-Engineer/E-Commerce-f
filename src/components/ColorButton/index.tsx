/**
 * ColorButton Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { Container, Oval, OvalSelected, Text } from './styledComponents'

interface Props {
  index: number
  label: string
  currentColor?: string
  colorBlockHovered?: number
  selected?: boolean
  name: string
  onSelectColorBlock: (index: number) => void
  onHoverColorBlock?: (index: number) => void
}

const ColorButton = ({
  index,
  onSelectColorBlock,
  onHoverColorBlock = () => {},
  label,
  currentColor,
  selected = false,
  name
}: Props) => {
  const handleOnPressColorBlock = () => onSelectColorBlock(index)
  const handleOnHoverColorBlock = () => onHoverColorBlock(index)
  const handleOnBlurColorBlock = () => onHoverColorBlock(-1)
  return (
    <Container
      onClick={handleOnPressColorBlock}
      onMouseEnter={handleOnHoverColorBlock}
      onMouseLeave={handleOnBlurColorBlock}
    >
      <div className="custom-tooltip">
        <OvalSelected {...{ selected }}>
          <Oval {...{ currentColor }} />
        </OvalSelected>
        {!!name && <div className="tooltip-content">{name}</div>}
      </div>
      <Text>{label}</Text>
    </Container>
  )
}

export default ColorButton
