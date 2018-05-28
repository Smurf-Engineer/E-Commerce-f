/**
 * MyCard Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  Container,
  PaymentText,
  CardNumber,
  StyledImage,
  SecondaryButtons,
  EditButton,
  StyledButton,
  ItalicText
} from './styledComponents'

import iconVisa from '../../assets/card-visa.svg'
import iconMasterCard from '../../assets/card-master.svg'
import iconAE from '../../assets/card-AE.svg'
import iconDiscover from '../../assets/card-discover.svg'
import iconCreditCard from '../../assets/card-default.svg'
import { showAddressFormAction } from '../../screens/Checkout/actions'

interface Props {
  last4: string
  brand: string
  name: string
  expMonth: number
  expYear: number
  defaultPayment?: boolean
  cardIndex: number
  showCardFormAction?: (show: boolean, index?: number) => void
  showConfirmDeleteAction?: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
}

const MyCard = ({
  last4,
  brand,
  expMonth,
  expYear,
  name,
  defaultPayment,
  cardIndex,
  showCardFormAction = () => {},
  showConfirmDeleteAction = () => {},
  formatMessage
}: Props) => {
  const handleOnEdit = () => {
    showCardFormAction(true, cardIndex)
  }
  const handleOnDelete = () => {
    showConfirmDeleteAction(cardIndex as number)
  }
  const buttons = (
    <SecondaryButtons>
      <EditButton type="primary" onClick={handleOnEdit}>
        {formatMessage(messages.edit)}
      </EditButton>
      <StyledButton onClick={handleOnDelete}>
        {formatMessage(messages.delete)}
      </StyledButton>
    </SecondaryButtons>
  )
  const footerMessage = defaultPayment ? (
    <ItalicText>{formatMessage(messages.defaultPayment)}</ItalicText>
  ) : null
  const cardIcon = getCardIcon(brand)
  return (
    <Container>
      <PaymentText>{name}</PaymentText>
      <CardNumber>
        <PaymentText>{`X-${last4}`}</PaymentText>
        <StyledImage src={cardIcon} />
      </CardNumber>
      <PaymentText>{`EXP ${expMonth}/${expYear}`}</PaymentText>
      {footerMessage}
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
