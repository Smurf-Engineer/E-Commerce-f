/**
 * MyAddress Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Text,
  StyledButton,
  EditButton,
  SecondaryButtons
} from './styledComponents'

interface Props {
  name: string
  street: string
  apartment?: string
  city: string
  state?: string
  zipCode: string
  country: string
  showSecondaryButtons?: boolean
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
  formatMessage,
  showSecondaryButtons
}: Props) => {
  const buttons = !showSecondaryButtons ? (
    <StyledButton>{formatMessage(messages.useThisAddress)}</StyledButton>
  ) : (
    <SecondaryButtons>
      <EditButton>{formatMessage(messages.edit)}</EditButton>{' '}
      <StyledButton>{formatMessage(messages.delete)}</StyledButton>
    </SecondaryButtons>
  )
  return (
    <Container>
      <Text>{name}</Text>
      <Text>{street}</Text>
      {apartment && <Text>{apartment}</Text>}
      <Text>{city}</Text>
      <Text>{state}</Text>
      <Text>{zipCode}</Text>
      <Text>{country}</Text>
      {buttons}
    </Container>
  )
}

export default MyAddress
