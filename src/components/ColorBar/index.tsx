import React from 'react'
import { Message } from '../../types/common'
import every from 'lodash/every'
import messages from './messages'
import { Container, ColorContent, Color, Text, Bar, LegendText } from './styledComponents'

interface Props {
  primary: string
  accent?: string[]
  withLegend?: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const ColorBar = ({ primary, accent = [], withLegend = false, formatMessage}: Props) => {
  const noAccent = !!every(accent, (accentColor) => !accentColor)
  return (
    <Container>
      <LegendText>
        {withLegend && <Text>{formatMessage(messages.primary)}</Text>}
        {withLegend && !!accent.length && <Text>{formatMessage(messages.accent)}</Text>}
      </LegendText>
      <Bar>
        <ColorContent>
          <Color color={primary} />
        </ColorContent>
        {!!accent.length && !noAccent &&
        <ColorContent>
          {accent.map((color) => !!color && <Color key={color} color={color} />)}
        </ColorContent>}
      </Bar>
    </Container>
  )
}

export default ColorBar