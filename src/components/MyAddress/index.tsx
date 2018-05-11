/**
 * MyAddress Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import messages from './messages'
import { Container, Text, StyledButton } from './styledComponents'

interface Props {
  name: string
  street: string
  apartment?: string
  city: string
  state?: string
  zipCode: string
  country: string
  formatMessage: (messageDescriptor: any) => string
}

const MyAddress = ({
  name,
  street,
  apartment,
  city,
  state,
  zipCode,
  country,
  formatMessage
}: Props) => {
  return (
    <Container>
      <Text>{name}</Text>
      <Text>{street}</Text>
      {apartment && <Text>{apartment}</Text>}
      <Text>{city}</Text>
      <Text>{state}</Text>
      <Text>{zipCode}</Text>
      <Text>{country}</Text>
      <StyledButton>{formatMessage(messages.useThisAddress)}</StyledButton>
    </Container>
  )
}

export default MyAddress
