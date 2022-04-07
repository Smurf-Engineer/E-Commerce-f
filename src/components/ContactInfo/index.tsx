/**
 * ContactInfo Component - Created by Carlos Cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, AddressText, ContactLabel, Subtitle, PhoneLabel } from './styledComponents'
import messages from './messages'
interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
  currentRegion: string
}
const ContactInfo = ({ formatMessage, currentRegion }: Props) => {

  let company
  let subtitle
  let street
  let suburb
  let phone
  let mail

  switch (currentRegion) {
    case 'ca':
      company = messages.companyCA
      street = messages.streetCA
      suburb = messages.suburbCA
      phone = messages.phoneCA
      mail = messages.emailCA
      break
    case 'au':
      company = messages.companyAU
      street = messages.streetAU
      suburb = messages.suburbAU
      phone = messages.phoneAU
      mail = messages.emailAU
      subtitle = messages.subtitleAU
      break
    default:
      company = messages.company
      street = messages.street
      suburb = messages.suburb
      phone = messages.phone
      mail = messages.email
      break
  }

  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      <ContactLabel>
        {formatMessage(company)}
        {subtitle &&
          <Subtitle>
            {formatMessage(subtitle)}
          </Subtitle>
        }
      </ContactLabel>
      <ContactLabel>
        <AddressText
          dangerouslySetInnerHTML={{
            __html: formatMessage(street)
          }}
        />
        <AddressText>
          {formatMessage(suburb)}
        </AddressText>
      </ContactLabel>
      <PhoneLabel href={`tel:${formatMessage(phone)}`}>
        {formatMessage(phone)}
      </PhoneLabel>
      <ContactLabel>{formatMessage(mail)}</ContactLabel>
    </Container>
  )
}

export default ContactInfo
