/**
 * ColorButton Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Oval, OvalSelected, Text } from './styledComponents'

interface Props {
  index: number
  label: string
  currentColor?: string
  selected: boolean
  onSelectColorBlock: (index: number) => void
}

const ColorButton = ({
  index,
  onSelectColorBlock,
  label,
  currentColor,
  selected
}: Props) => {
  const handleOnPressColorBlock = () => onSelectColorBlock(index)
  return (
    <Container onClick={handleOnPressColorBlock}>
      <OvalSelected {...{ selected }}>
        <Oval {...{ currentColor }} />
      </OvalSelected>
      <Text>{label}</Text>
    </Container>
  )
}

export default ColorButton
