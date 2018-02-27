/**
 * ColorButton Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Oval, OvalSelected, Text } from './styledComponents'

interface Props {
  label: string
  currentColor?: string
  selected: boolean
}

const ColorButton = ({ label, currentColor, selected }: Props) => {
  return (
    <Container>
      <OvalSelected {...{ selected }}>
        <Oval {...{ currentColor }} />
      </OvalSelected>
      <Text>{label}</Text>
    </Container>
  )
}

export default ColorButton
