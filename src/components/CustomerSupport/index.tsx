/**
 * CustomerSupport Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messages'
import Span from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
}
const CustomerSupport = ({ formatMessage }: Props) => {
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <Text>
        <Span link="/faq">{formatMessage(messages.faq)}</Span>
      </Text>
      <Text>
        <Span link="http://www.jakroo.com/price-sheets/2018Q1-USD_RETAIL_COND-2.pdf">
          {formatMessage(messages.pricing)}
        </Span>
      </Text>
      <Text>
        <Span link="https://www.jakroo.com/us/terms-and-conditions.html">
          {formatMessage(messages.terms)}
        </Span>
      </Text>
      <Text>
        <Span link="/warranty-program">{formatMessage(messages.warranty)}</Span>
      </Text>
      <Text>
        <Span link="/terms-of-use#PrivacyPolicy">
          {formatMessage(messages.privacyPolicy)}
        </Span>
      </Text>
    </Container>
  )
}

export default CustomerSupport
