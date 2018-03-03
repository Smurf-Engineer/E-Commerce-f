/**
 * DesignSupport Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Container, Title, Text, Span } from './styledComponents'
import messages from './messsages'
import UnderlinedLink from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
}
const DesignSupport = ({ formatMessage }: Props) => {
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <Text>
        <UnderlinedLink link="https://www.jakroo.com/us/art-specs.html">
          {formatMessage(messages.artwork)}
        </UnderlinedLink>
      </Text>
      <Text>
        <UnderlinedLink link="https://www.jakroo.com/us/templates.html">
          {formatMessage(messages.template)}
        </UnderlinedLink>
      </Text>
      <Text>
        <UnderlinedLink link="https://www.jakroo.com/us/fit-sizing.html">
          {formatMessage(messages.fit)}
        </UnderlinedLink>
      </Text>
    </Container>
  )
}

export default DesignSupport
