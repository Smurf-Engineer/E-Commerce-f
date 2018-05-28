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
  StyledImage
} from './styledComponents'

import iconVisa from '../../assets/card-visa.svg'
import iconMasterCard from '../../assets/card-master.svg'
import iconAE from '../../assets/card-AE.svg'
import iconDiscover from '../../assets/card-discover.svg'
import iconCreditCard from '../../assets/card-default.svg'

interface Props {
  last4Digits: string
  brand: string
  expMonth: string
  expYear: string
}

const MyCard = ({ last4Digits, brand, expMonth, expYear }: Props) => {
  const cardIcon = getCardIcon(brand)
  return (
    <Container>
      <PaymentText>{name}</PaymentText>
      <CardNumber>
        <PaymentText>{`X-${last4Digits}`}</PaymentText>
        <StyledImage src={cardIcon} />
      </CardNumber>
      <PaymentText>{`EXP ${expMonth}/${expYear}`}</PaymentText>
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
