/**
 * Teams Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messages'
import Span from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
}

const Teams = ({ formatMessage, history }: Props) => {
  const goTo = (link: string) => () => {
    history.push(`/${link}`)
  }
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <Text onClick={goTo('search-teamstores')}>
        <Span>{formatMessage(messages.stores)}</Span>
      </Text>
      <Text>
        <Span link="https://www.jakroo.com/us/team-kits.html">
          {formatMessage(messages.kits)}
        </Span>
      </Text>
      <Text>
        <Span link="https://www.jakroo.com/us/get-sponsored.html">
          {formatMessage(messages.sponsor)}
        </Span>
      </Text>
    </Container>
  )
}

export default Teams
