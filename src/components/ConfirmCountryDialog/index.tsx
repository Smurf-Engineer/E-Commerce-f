/**
 * ConfirmCountryDialog Component - Created by gustavomedina on 05/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

class ConfirmCountryDialog extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

export default ConfirmCountryDialog
