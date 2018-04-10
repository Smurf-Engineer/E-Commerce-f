/**
 * LockerTable Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'

interface Props {}

class LockerTable extends React.PureComponent<Props, {}> {
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

export default LockerTable
