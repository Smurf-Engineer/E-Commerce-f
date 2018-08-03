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
  const { expMonth, name, last4, expYear, brand } = card
  const month = expMonth > 9 ? expMonth : `0${expMonth}`
  return (
    <Container>
      <PaymentText>{name}</PaymentText>
      <CardNumber>
        <PaymentText>{`X-${last4}`}</PaymentText>
        <StyledImage src={getCardIcon(brand)} />
      </CardNumber>
      <PaymentText>{`EXP ${month}/${expYear}`}</PaymentText>
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
