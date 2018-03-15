/**
 * NotFound
 */

import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'

interface Props {
  history: any
}

export class NotFound extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <Text>
          <FormattedMessage {...messages.title} />
        </Text>
      </Container>
    )
  }
}

export default NotFound
