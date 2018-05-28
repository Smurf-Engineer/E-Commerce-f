/**
 * MyCardsList Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text, CardsList } from './styledComponents'
import { CreditCardData } from '../../types/common'
import MyCard from '../MyCard'

interface Props {
  items: CreditCardData[]
  formatMessage: (messageDescriptor: any) => string
}

class MyCardsList extends React.Component<Props, {}> {
  render() {
    const { items, formatMessage } = this.props
    const cardsList = items.map((cardItem, key) => {
      const { last4, name, brand, expMonth, expYear, defaultPayment } = cardItem
      return (
        <MyCard
          cardIndex={key}
          {...{
            key,
            last4,
            name,
            brand,
            expMonth,
            expYear,
            defaultPayment,
            formatMessage
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
