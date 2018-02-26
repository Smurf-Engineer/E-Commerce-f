/**
 * DesignSupport Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Container, Title, Text, Span } from './styledComponents'
import messages from './messsages'

const DesignSupport = () => {
  return (
    <Container>
      <Title>
        <FormattedMessage {...messages.title} />
      </Title>
      <Text>
        <Span href="https://www.jakroo.com/us/art-specs.html">
          <FormattedMessage {...messages.artwork} />
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/templates.html">
          <FormattedMessage {...messages.template} />
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/fit-sizing.html">
          <FormattedMessage {...messages.fit} />
        </Span>
      </Text>
    </Container>
  )
}

export default DesignSupport
