/**
 * ButtonList Component - Created by david on 20/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

class ButtonList extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

export default ButtonList
