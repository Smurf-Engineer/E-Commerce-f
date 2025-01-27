import React from 'react'
import { Message } from '../../types/common'
import every from 'lodash/every'
import messages from './messages'
import { Container, ColorContent, Color, Text, Bar, LegendText, ColorLabel } from './styledComponents'

interface Props {
  primary: string
  accent?: string[]
  colorLabels?: { [name: string]: string }
  withLegend?: boolean
  small?: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const ColorBar = ({ colorLabels = {}, primary, accent = [], withLegend = false, formatMessage, small }: Props) => {
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
          {colorLabels && 
            <ColorLabel {...{ small }}>
              {colorLabels[primary]}
            </ColorLabel>
          }
        </ColorContent>
        {!!accent.length && !noAccent &&
          <ColorContent>
          {accent.map((color, key) => !!color && 
              <ColorContent>
                <Color {...{ key }} color={color} />
                {colorLabels && 
                  <ColorLabel {...{ small }}>
                  {colorLabels[color]}
                  </ColorLabel>
                }
              </ColorContent>
          )}
          </ColorContent>
        }  
      </Bar>
    </Container>
  )
}

export default ColorBar