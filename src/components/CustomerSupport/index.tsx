/**
 * CustomerSupport Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messages'
import Span from '../Common/UnderlinedLink'
import { User } from '../../types/common'

const PRICING_LINK = 'https://storage.googleapis.com/jakroo/homepage/JV2PRICING.pdf'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
  openLoginAction?: (open: boolean) => void
  user: User
}
const CustomerSupport = ({ formatMessage, user, openLoginAction }: Props) => {
  const openLogin = () => {
    if ((!user || (user && !user.id)) && openLoginAction) {
      openLoginAction(true)
    }
  }
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <Text>
        <Span link="/faq">{formatMessage(messages.faq)}</Span>
      </Text>
      <Text>
        <Span
          url={PRICING_LINK}
        >
          {formatMessage(messages.pricing)}
        </Span>
      </Text>
      <Text>
        <Span link="/terms-of-use">{formatMessage(messages.terms)}</Span>
      </Text>
      <Text>
        <Span link="/warranty-program">{formatMessage(messages.warranty)}</Span>
      </Text>
      <Text>
        <Span link="/terms-of-use#privacyPolicy">
          {formatMessage(messages.privacyPolicy)}
        </Span>
      </Text>
      {(!user || (user && !user.id)) &&
        <Text onClick={openLogin}>
          {formatMessage(messages.login)}
        </Text>
      }
    </Container>
  )
}

export default CustomerSupport
