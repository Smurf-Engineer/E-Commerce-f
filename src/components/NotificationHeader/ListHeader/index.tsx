/**
 * ListHeader Component - Created by eduardoquintero on 25/08/20.
 */
import * as React from 'react'
import { Message } from '../../../types/common'
import messages from './messages'
import { Container, Label, MarkButton } from './styledComponents'

interface Props {
  onMarkAll: () => void
  formatMessage: (messageDescriptor: Message) => string
}

const NotificationHeader = ({ onMarkAll, formatMessage }: Props) => {
  return (
    <Container>
      <Label>{formatMessage(messages.latest)}</Label>
      <MarkButton onClick={onMarkAll}>{formatMessage(messages.markAll)}</MarkButton>
    </Container>
  )
}

export default NotificationHeader
