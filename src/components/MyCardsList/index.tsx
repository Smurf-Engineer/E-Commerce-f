/**
 * MyCardsList Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { Container, CardsList } from './styledComponents'
import { CreditCardData } from '../../types/common'
import MyCard from '../MyCard'

interface Props {
  items: CreditCardData[]
  idDefaultCard: string
  formatMessage: (messageDescriptor: any) => string
  showCardFormAction?: (show: boolean) => void
  showConfirmDeleteAction?: (index: number) => void
  selectCardAction?: (index: number) => void
}

class MyCardsList extends React.Component<Props, {}> {
  render() {
    const {
      items,
      formatMessage,
      showCardFormAction,
      showConfirmDeleteAction,
      idDefaultCard
    } = this.props
    const cardsList = items.map((cardItem, key) => {
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
          {...{
            key,
            last4,
            name,
            brand,
            expMonth,
            expYear,
            defaultPayment,
            formatMessage,
            showCardFormAction,
            showConfirmDeleteAction
          }}
        />
      )
    })
    return (
      <Container>
        <CardsList>{cardsList}</CardsList>
      </Container>
    )
  }
}

export default MyCardsList
