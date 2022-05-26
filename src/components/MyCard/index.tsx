/**
 * MyCard Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import messages from './messages'
import get from 'lodash/get'
import {
  Container,
  SecondaryButtons,
  StyledButton,
  StyledCheckbox
} from './styledComponents'
import PaymentData from '../PaymentData'
import { StripeCardData, CreditCardData } from '../../types/common'

interface Props {
  id?: string
  last4: string
  brand: string
  name: string
  expMonth: number
  expYear: number
  markedAsDefault?: boolean
  cardIndex: number
  paymentsRender: boolean
  listForMyAccount: boolean
  selectedCard: CreditCardData
  pendingOrder: boolean
  onBehalf?: boolean
  showCardForm?: (show: boolean) => void
  showConfirmDelete?: (index: number) => void
  selectCardAsDefault?: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  setStripeCardDataAction: (stripeCardData: StripeCardData) => void
  selectCardToPayAction: (card: CreditCardData, selectedCardId?: string) => void
}

const MyCard = ({
  id,
  last4,
  brand,
  expMonth,
  expYear,
  name,
  onBehalf,
  markedAsDefault,
  cardIndex,
  paymentsRender,
  formatMessage,
  listForMyAccount = false,
  selectedCard,
  pendingOrder,
  showConfirmDelete = () => {},
  selectCardAsDefault = () => {},
  selectCardToPayAction = () => {}
}: Props) => {
  const selectedCardId = get(selectedCard, 'id', '')

  const handleOnSelectAsDefault = () => {
    selectCardAsDefault(cardIndex as number)
  }

  const handleOnDelete = () => {
    showConfirmDelete(cardIndex as number)
  }

  const handleSelectCard = () => {
    const cardData: CreditCardData = {
      id,
      last4,
      expMonth,
      expYear,
      brand,
      name
    }

    if (selectedCardId !== id) {
      selectCardToPayAction(cardData)
    }
  }

  const buttons = listForMyAccount ? (
    <SecondaryButtons>
      <StyledCheckbox
        checked={markedAsDefault}
        onChange={handleOnSelectAsDefault}
      >
        {formatMessage(messages.asDefault)}
      </StyledCheckbox>
      {paymentsRender && (
        <StyledButton onClick={handleOnDelete} disabled={pendingOrder || onBehalf}>
          {formatMessage(messages.delete)}
        </StyledButton>
      )}
    </SecondaryButtons>
  ) : (
    <SecondaryButtons>
      <StyledCheckbox
        checked={selectedCardId === id}
        onChange={handleSelectCard}
        checkColor={'#4A90E2'}
      >
        {formatMessage(messages.useThisCardLabel)}
      </StyledCheckbox>
    </SecondaryButtons>
  )

  const card: CreditCardData = {
    id,
    name,
    brand,
    last4,
    expMonth,
    expYear,
    defaultPayment: markedAsDefault
  }

  return (
    <Container>
      <PaymentData {...{ card }} />
      {buttons}
    </Container>
  )
}

export default MyCard
