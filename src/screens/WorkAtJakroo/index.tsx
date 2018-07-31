/**
 * WorkAtJakroo Screen - Created by jorge on 31/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

export class WorkAtJakroo extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

export default WorkAtJakroo
