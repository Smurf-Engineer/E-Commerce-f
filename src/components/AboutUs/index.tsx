/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Container, Title, Text, Span } from './styledComponents'
import messages from './messages'

const AboutUs = () => {
  return (
    <Container>
      <Title>
        <FormattedMessage {...messages.title} />
      </Title>
      <Text>
        <Span href="https://www.jakroo.com/us/about-us.html">
          <FormattedMessage {...messages.company} />
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/technology.html">
          <FormattedMessage {...messages.technology} />
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/job-opportunities.html">
          <FormattedMessage {...messages.jobs} />
        </Span>
      </Text>
    </Container>
  )
}

export default AboutUs
