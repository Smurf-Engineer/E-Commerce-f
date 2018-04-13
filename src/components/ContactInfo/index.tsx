/**
 * ContactInfo Component - Created by Carlos Cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text, Phone, Email } from './styledComponents'
import messages from './messages'
interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
}
const ContactInfo = ({ formatMessage }: Props) => {
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <Text>
        <div>5906 Stoneridge Mall Road.</div>
        <div> Pleasanton, CA 94588</div>
      </Text>
      <Phone>1.800.485.7067</Phone>
      <Email>customdesign@jakroousa.com</Email>
    </Container>
  )
}

export default ContactInfo
