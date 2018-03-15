/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messages'
import Span from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
}
const AboutUs = ({ formatMessage }: Props) => {
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <Text>
        <Span link="https://www.jakroo.com/us/about-us.html">
          {formatMessage(messages.company)}
        </Span>
      </Text>
      <Text>
        <Span link="https://www.jakroo.com/us/technology.html">
          {formatMessage(messages.technology)}
        </Span>
      </Text>
      <Text>
        <Span link="https://www.jakroo.com/us/job-opportunities.html">
          {formatMessage(messages.jobs)}
        </Span>
      </Text>
    </Container>
  )
}

export default AboutUs
