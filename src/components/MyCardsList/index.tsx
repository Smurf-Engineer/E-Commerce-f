/**
 * MyCardsList Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { Container, CardsList } from './styledComponents'
import { CreditCardData, StripeCardData } from '../../types/common'
import MyCard from '../MyCard'
import EmptyContainer from '../EmptyContainer'
import messages from './messages'

interface Props {
  items: CreditCardData[]
  idDefaultCard: string
  paymentsRender: boolean
  listForMyAccount: boolean
  selectedCard: CreditCardData
  formatMessage: (messageDescriptor: any) => string
  showCardFormAction?: (show: boolean) => void
  showConfirmDelete?: (index: number) => void
  selectCardAsDefault?: (index: number) => void
  setStripeCardDataAction: (stripeCardData: StripeCardData) => void
  selectCardToPayAction: (card: CreditCardData, selectedCardId?: string) => void
}

class MyCardsList extends React.Component<Props, {}> {
  render() {
    const {
      items,
      formatMessage,
      showCardFormAction,
      showConfirmDelete,
      selectCardAsDefault,
      idDefaultCard,
      paymentsRender = false,
      listForMyAccount,
      setStripeCardDataAction,
      selectCardToPayAction,
      selectedCard
    } = this.props

    let cardsList
    if (!!items.length) {
      cardsList = items.map((cardItem, key) => {
        const {
          last4,
          name,
          brand,
          expMonth,
          expYear,
          defaultPayment,
          id
        } = cardItem
        return (
          <MyCard
            cardIndex={key}
            markedAsDefault={String(id) === idDefaultCard}
            showCardForm={showCardFormAction}
            {...{
              id,
              key,
              last4,
              name,
              brand,
              expMonth,
              expYear,
              defaultPayment,
              formatMessage,
              showConfirmDelete,
              selectCardAsDefault,
              paymentsRender,
              listForMyAccount,
              setStripeCardDataAction,
              selectCardToPayAction,
              selectedCard
            }}
          />
        )
      })
    } else if (listForMyAccount) {
      cardsList = <EmptyContainer message={formatMessage(messages.emptyMessage)} />
    }

    return (
      <Container>
        <CardsList>{cardsList}</CardsList>
      </Container>
    )
  }
}

export default MyCardsList
