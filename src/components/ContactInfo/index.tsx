/**
 * ContactInfo Component - Created by Carlos Cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, AddressText, ContactLabel } from './styledComponents'
import messages from './messages'
interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
}
const ContactInfo = ({ formatMessage }: Props) => {
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <ContactLabel>
        <AddressText>{formatMessage(messages.street)}</AddressText>
        <AddressText>{formatMessage(messages.suburb)}</AddressText>
      </ContactLabel>
      <ContactLabel>{formatMessage(messages.phone)}</ContactLabel>
      <ContactLabel>{formatMessage(messages.email)}</ContactLabel>
    </Container>
  )
}

export default ContactInfo
