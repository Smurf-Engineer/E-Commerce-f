/**
 * ListHeader Component - Created by eduardoquintero on 25/08/20.
 */
import * as React from 'react'
import { Message } from '../../../types/common'
import messages from './messages'
import { Container, Label, BorderlessButton } from './styledComponents'

interface Props {
  updating: boolean
  onMarkAll: () => void
  formatMessage: (messageDescriptor: Message) => string
}

const NotificationHeader = ({ onMarkAll, formatMessage, updating }: Props) => {
  return (
    <Container>
      <Label>{formatMessage(messages.latest)}</Label>
      <BorderlessButton
        type="ghost"
        loading={updating}
        onClick={onMarkAll}
      >
        {formatMessage(messages.markAll)}
      </BorderlessButton>
    </Container>
  )
}

export default NotificationHeader
