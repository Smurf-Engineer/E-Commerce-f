/**
 * MyCards Component - Created by miguelcanobbio on 28/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'

import MyCard from '../MyCard'

const dummyCards = [
  {
    name: 'Miguel Canobbio',
    last4: '1234',
    brand: 'Visa',
    expMonth: 4,
    expYear: 21
  },
  {
    name: 'Carlos Cazarez',
    last4: '9876',
    brand: 'Visa',
    expMonth: 12,
    expYear: 18
  },
  {
    name: 'Gustavo Medina',
    last4: '4242',
    brand: 'Master Card',
    expMonth: 1,
    expYear: 19
  },
  {
    name: 'David Gonzalez',
    last4: '5579',
    brand: 'Master Card',
    expMonth: 1,
    expYear: 19
  }
]

interface Props {}

class MyCards extends React.Component<Props, {}> {
  render() {
    // const cards = dummyCards.map((cardItem, key) => ())
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

export default MyCards
