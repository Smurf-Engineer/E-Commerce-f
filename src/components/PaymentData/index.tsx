/**
 * PaymentData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import {
  Container,
  PaymentText,
  CardNumber,
  StyledImage
} from './styledComponents'
import iconVisa from '../../assets/card-visa.svg'
import iconMasterCard from '../../assets/card-master.svg'
import iconAE from '../../assets/card-AE.svg'
import iconDiscover from '../../assets/card-discover.svg'
import iconCreditCard from '../../assets/card-default.svg'
import { CreditCardData } from '../../types/common'

interface Props {
  card: CreditCardData
}

const PaymentData = ({ card }: Props) => {
  return (
    <Container>
      <PaymentText>{card.name}</PaymentText>
      <CardNumber>
        <PaymentText>{`X-${card.last4}`}</PaymentText>
        <StyledImage src={getCardIcon(card.brand)} />
      </CardNumber>
      <PaymentText>{`EXP ${card.expMonth}/${card.expYear}`}</PaymentText>
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

export default PaymentData
