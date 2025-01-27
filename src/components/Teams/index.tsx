/**
 * Teams Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messages'
import Span from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openReseller: () => void
  history?: any
}

const Teams = ({ formatMessage, history, openReseller }: Props) => {
  const goTo = (link: string) => () => {
    history.push(`/${link}`)
  }
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      {/* TODO: hide teamstores for phase I */}
      <Text onClick={goTo('search-teamstores')}>
        <Span>{formatMessage(messages.stores)}</Span>
      </Text>
      <Text onClick={openReseller}>
        <Span>{formatMessage(messages.becomeReseller)}</Span>
      </Text>
      {/* TODO: Remove after verify it wount be needed 
      <Text onClick={goTo('team-kits')}>
        <Span>{formatMessage(messages.kits)}</Span>
      </Text>
      <Text>
        <Span link="https://www.jakroo.com/us/get-sponsored.html">
          {formatMessage(messages.sponsor)}
        </Span>
      </Text>*/}
    </Container>
  )
}

export default Teams
