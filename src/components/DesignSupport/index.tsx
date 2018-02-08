/**
 * DesignSupport Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text, Span } from './styledComponents'

const DesignSupport = () => {
  return (
    <Container>
      <Title>DESIGN SUPPORT</Title>
      <Text>
        <Span href="https://www.jakroo.com/us/art-specs.html">
          Artwork Specs
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/templates.html">
          Template Download
        </Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/fit-sizing.html">
          Fit & Sizing
        </Span>
      </Text>
    </Container>
  )
}

export default DesignSupport
