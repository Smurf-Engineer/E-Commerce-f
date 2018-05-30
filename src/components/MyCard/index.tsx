/**
 * MyCard Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  PaymentText,
  CardNumber,
  StyledImage,
  SecondaryButtons,
  StyledButton,
  StyledCheckbox
} from './styledComponents'

import iconVisa from '../../assets/card-visa.svg'
import iconMasterCard from '../../assets/card-master.svg'
import iconAE from '../../assets/card-AE.svg'
import iconDiscover from '../../assets/card-discover.svg'
import iconCreditCard from '../../assets/card-default.svg'

interface Props {
  last4: string
  brand: string
  name: string
  expMonth: number
  expYear: number
  markedAsDefault?: boolean
  cardIndex: number
  showCardForm?: (show: boolean) => void
  showConfirmDelete?: (index: number) => void
  selectCardAsDefault?: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
}

const MyCard = ({
  last4,
  brand,
  expMonth,
  expYear,
  name,
  markedAsDefault,
  cardIndex,
  showCardForm = () => {},
  showConfirmDelete = () => {},
  selectCardAsDefault = () => {},
  formatMessage
}: Props) => {
  const handleOnSelectAsDefault = () => {
    selectCardAsDefault(cardIndex as number)
  }
  const handleOnDelete = () => {
    showConfirmDelete(cardIndex as number)
  }
  const buttons = (
    <SecondaryButtons>
      <StyledCheckbox
        checked={markedAsDefault}
        onChange={handleOnSelectAsDefault}
      >
        {formatMessage(messages.asDefault)}
      </StyledCheckbox>
      <StyledButton onClick={handleOnDelete}>
        {formatMessage(messages.delete)}
      </StyledButton>
    </SecondaryButtons>
  )
  const cardIcon = getCardIcon(brand)
  const year = String(expYear).substring(2, 4)
  const month = expMonth > 9 ? expMonth : `0${expMonth}`
  return (
    <Container>
      <PaymentText>{name}</PaymentText>
      <CardNumber>
        <PaymentText>{`X-${last4}`}</PaymentText>
        <StyledImage src={cardIcon} />
      </CardNumber>
      <PaymentText>{`EXP ${month}/${year}`}</PaymentText>
      {buttons}
    </Container>
  )
}

const getCardIcon = (brand: string) => {
  switch (brand) {
    case 'Visa':
      return iconVisa
    case 'MasterCard':
      return iconMasterCard
    case 'American Express':
      return iconAE
    case 'Discover':
      return iconDiscover
    default:
      return iconCreditCard
  }
}

export default MyCard
