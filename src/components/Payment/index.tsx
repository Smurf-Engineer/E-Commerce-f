/**
 * Payment Component - Created by miguelcanobbio on 16/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'

interface Props {}

class Payment extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

export default Payment