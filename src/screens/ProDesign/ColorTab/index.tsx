/**
 * ColorTab - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'

import { Container, Header } from './styledComponents'
import messages from './messages'
import { Message } from '../../../types/common'

interface Props {
  formatMessage: (messageDescriptor: Message) => string
}

export class ColorTab extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    return (
      <Container>
        <Header>{formatMessage(messages.title)}</Header>
      </Container>
    )
  }
}

export default ColorTab
