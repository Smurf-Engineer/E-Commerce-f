/**
 * CustomerSupport Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text, Span } from './styledComponents'

const CustomerSupport = () => {
  return (
    <Container>
      <Title>CUSTOMER SUPPORT</Title>
      <Text>
        <Span href="https://www.jakroo.com/us/faq.html">F.A.Q.</Span>
      </Text>
      <Text>
        <Span href="http://www.jakroo.com/price-sheets/2018Q1-USD_RETAIL_COND-2.pdf">
          Pricing Chart
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/terms-and-conditions.html">
          Terms of Use
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/warranty.html">
          Warranty Program
        </Span>
      </Text>
    </Container>
  )
}

export default CustomerSupport
