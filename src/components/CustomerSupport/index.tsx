/**
 * CustomerSupport Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Container, Title, Text, Span } from './styledComponents'
import messages from './messages'

const CustomerSupport = () => {
  return (
    <Container>
      <Title>
        <FormattedMessage {...messages.title} />
      </Title>
      <Text>
        <Span href="https://www.jakroo.com/us/faq.html">
          <FormattedMessage {...messages.faq} />
        </Span>
      </Text>
      <Text>
        <Span href="http://www.jakroo.com/price-sheets/2018Q1-USD_RETAIL_COND-2.pdf">
          <FormattedMessage {...messages.pricing} />
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/terms-and-conditions.html">
          <FormattedMessage {...messages.terms} />
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/warranty.html">
          <FormattedMessage {...messages.warranty} />
        </Span>
      </Text>
    </Container>
  )
}

export default CustomerSupport
