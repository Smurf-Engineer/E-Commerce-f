/**
 * ContactInfo Component - Created by Carlos Cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, AddressText, ContactLabel } from './styledComponents'
import messages from './messages'
interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
  currentRegion: string
}
const ContactInfo = ({ formatMessage, currentRegion }: Props) => {
  const isCanada = () => {
    return currentRegion === 'ca'
  }

  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <ContactLabel>
        {formatMessage(isCanada() ? messages.companyCA : messages.company)}
      </ContactLabel>
      <ContactLabel>
        <AddressText>
          {formatMessage(isCanada() ? messages.streetCA : messages.street)}
        </AddressText>
        <AddressText>
          {formatMessage(isCanada() ? messages.suburbCA : messages.suburb)}
        </AddressText>
      </ContactLabel>
      <ContactLabel>
        {formatMessage(isCanada() ? messages.phoneCA : messages.phone)}
      </ContactLabel>
      <ContactLabel>{formatMessage(isCanada() ? messages.emailCA : messages.email)}</ContactLabel>
    </Container>
  )
}

export default ContactInfo
