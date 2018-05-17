/**
 * MyAddress Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Text,
  ItalicText,
  StyledCheckbox,
  StyledButton,
  EditButton,
  SecondaryButtons
} from './styledComponents'

interface Props {
  name: string
  street: string
  apartment?: string
  city: string
  zipCode: string
  country: string
  defaultBilling?: boolean
  defaultShipping?: boolean
  addressIndex: number
  isSelected?: boolean
  showSecondaryButtons?: boolean
  hideBottomButtons?: boolean
  formatMessage: (messageDescriptor: any) => string
  selectAddressAction?: (index: number) => void
  showAddressFormAction?: (show: boolean, index?: number) => void
  showConfirmDeleteAction?: (index: number) => void
}

const MyAddress = ({
  name,
  street,
  apartment,
  city,
  zipCode,
  country,
  defaultBilling,
  defaultShipping,
  addressIndex,
  formatMessage,
  showSecondaryButtons,
  hideBottomButtons,
  isSelected = false,
  selectAddressAction = () => {},
  showAddressFormAction = () => {},
  showConfirmDeleteAction = () => {}
}: Props) => {
  const handleOnEdit = () => {
    showAddressFormAction(true, addressIndex)
  }
  const handleOnDelete = () => {
    showConfirmDeleteAction(addressIndex)
  }
  const handleOnSelectAddress = () => {
    selectAddressAction(addressIndex)
  }
  const buttons = !showSecondaryButtons ? (
    <StyledCheckbox checked={isSelected} onChange={handleOnSelectAddress}>
      {formatMessage(messages.useThisAddress)}
    </StyledCheckbox>
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
    <Container {...{ showSecondaryButtons, isSelected }}>
      <Text>{name}</Text>
      <Text>{street}</Text>
      {apartment && <Text>{apartment}</Text>}
      <Text>{city}</Text>
      <Text>{zipCode}</Text>
      <Text>{country}</Text>
      {footerMessage}
      {!hideBottomButtons ? buttons : null}
    </Container>
  )
}

export default MyAddress
