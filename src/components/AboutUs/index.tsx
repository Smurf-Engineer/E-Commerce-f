/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messages'
import Span from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
}
const AboutUs = ({ formatMessage }: Props) => {
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      {/* <Text>
        <Span link="/about-us-page">{formatMessage(messages.company)}</Span>
      </Text> */}
      {/* TODO: Remove after verify it wount be needed 
      <Text>
        <Span link="https://www.jakroo.com/us/technology.html">
          {formatMessage(messages.technology)}
        </Span>
     </Text>*/}
      <Text>
        <Span link="/work-at-jakroo">{formatMessage(messages.jobs)}</Span>
      </Text>
    </Container>
  )
}

export default AboutUs
