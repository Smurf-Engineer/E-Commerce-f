/**
 * ColorButton Component - Created by eduardoquintero on 30/12/19.
 */
import * as React from 'react'
import { Container, Oval, OvalSelected, Text } from './styledComponents'

interface Props {
  index: number
  label: string
  currentColor?: string
  colorBlockHovered?: number
  selected?: boolean
  onSelectColorBlock: (index: number) => void
  onHoverColorBlock?: (index: number) => void
}

const ColorButton = ({
  index,
  onSelectColorBlock,
  onHoverColorBlock = () => {},
  label,
  currentColor,
  selected = false
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
      <OvalSelected {...{ selected }}>
        <Oval {...{ currentColor }} />
      </OvalSelected>
      <Text>{label}</Text>
    </Container>
  )
}

export default ColorButton
