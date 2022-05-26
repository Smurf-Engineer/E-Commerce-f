/**
 * ListHeader Component - Created by eduardoquintero on 25/08/20.
 */
import * as React from 'react'
import { Message } from '../../../types/common'
import messages from './messages'
import { Container, Label, BorderlessButton, TimeIcon } from './styledComponents'

interface Props {
  updating: boolean
  onBehalf?: boolean
  onMarkAll: () => void
  formatMessage: (messageDescriptor: Message) => string
}

const NotificationHeader = ({ onBehalf, onMarkAll, formatMessage, updating }: Props) => {
  return (
    <Container>
      <Label><TimeIcon type="clock-circle" />{formatMessage(messages.latest)}</Label>
      {!onBehalf &&
        <BorderlessButton
          type="ghost"
          loading={updating}
          onClick={onMarkAll}
        >
          {formatMessage(messages.markAll)}
        </BorderlessButton>
      }
    </Container>
  )
}

export default NotificationHeader
