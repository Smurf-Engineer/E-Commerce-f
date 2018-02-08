/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text, Span } from './styledComponents'

const AboutUs = () => {
  return (
    <Container>
      <Title>ABOUT US</Title>
      <Text>
        <Span href="https://www.jakroo.com/us/about-us.html">Company</Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/technology.html">Technology</Span>
      </Text>
      <Text>
        <Span href="https://www.jakroo.com/us/job-opportunities.html">
          Job Opportunities
        </Span>
      </Text>
    </Container>
  )
}

export default AboutUs
