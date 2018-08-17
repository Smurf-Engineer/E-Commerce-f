/**
 * OrderFiles Component - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

const OrderFiles = (props: Props) => {
  return (
    <Container>
      <FormattedMessage {...messages.status} />
    </Container>
  )
}

export default OrderFiles
