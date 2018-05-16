/**
 * MyAddress Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Text,
  ItalicText,
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
  defaultBilling: boolean
  defaultShipping: boolean
  addressIndex: number
  showSecondaryButtons?: boolean
  formatMessage: (messageDescriptor: any) => string
  showAddressFormAction: (show: boolean, index?: number) => void
  showConfirmDeleteAction?: (index: number) => void
}

const MyAddress = ({
  name,
  street,
  apartment,
  city,
  state,
  zipCode,
  country,
  defaultBilling,
  defaultShipping,
  addressIndex,
  formatMessage,
  showSecondaryButtons,
  showAddressFormAction,
  showConfirmDeleteAction = () => {}
}: Props) => {
  const handleOnEdit = () => {
    showAddressFormAction(true, addressIndex)
  }
  const handleOnDelete = () => {
    showConfirmDeleteAction(addressIndex)
  }
  const buttons = !showSecondaryButtons ? (
    <StyledButton>{formatMessage(messages.useThisAddress)}</StyledButton>
  ) : (
    <SecondaryButtons>
      <EditButton type="primary" onClick={handleOnEdit}>
        {formatMessage(messages.edit)}
      </EditButton>
      <StyledButton onClick={handleOnDelete}>
        {formatMessage(messages.delete)}
      </StyledButton>
    </SecondaryButtons>
  )
  let footerMessageText
  if (defaultBilling && defaultShipping) {
    footerMessageText = messages.defaultBillingAndShipping
  } else if (defaultBilling) {
    footerMessageText = messages.defaultBilling
  } else if (defaultShipping) {
    footerMessageText = messages.defaultShipping
  }
  const footerMessage =
    showSecondaryButtons && footerMessageText ? (
      <ItalicText>{formatMessage(footerMessageText)}</ItalicText>
    ) : null
  return (
    <Container {...{ showSecondaryButtons }}>
      <Text>{name}</Text>
      <Text>{street}</Text>
      {apartment && <Text>{apartment}</Text>}
      <Text>{city}</Text>
      <Text>{state}</Text>
      <Text>{zipCode}</Text>
      <Text>{country}</Text>
      {footerMessage}
      {buttons}
    </Container>
  )
}

export default MyAddress
