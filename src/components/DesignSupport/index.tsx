/**
 * DesignSupport Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messsages'
import UnderlinedLink from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
}
const DesignSupport = ({ formatMessage }: Props) => {
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <Text>
        <UnderlinedLink link="/artwork-specs">
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
      <Text>
        <UnderlinedLink link="https://www.jakroo.com/us/technology.html">
          {formatMessage(messages.technology)}
        </UnderlinedLink>
      </Text>
    </Container>
  )
}

export default DesignSupport
