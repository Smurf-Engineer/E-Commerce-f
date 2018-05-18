/**
 * Review Component - Created by miguelcanobbio on 18/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'
import { AddressType } from '../../types/common'

interface Props {
  shippingAddress: AddressType
  billingAddress: AddressType
  formatMessage: (messageDescriptor: any) => string
}

class Review extends React.Component<Props, {}> {
  render() {
    const { formatMessage, shippingAddress, billingAddress } = this.props
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

export default Review
