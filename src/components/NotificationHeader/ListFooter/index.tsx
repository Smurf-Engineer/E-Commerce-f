/**
 * ListFooter Component - Created by eduardoquintero on 25/08/20.
 */
import * as React from 'react'
import { Message } from '../../../types/common'
import messages from './messages'
import { Container, Label } from './styledComponents'

interface Props {
  onViewAll: () => void
  formatMessage: (messageDescriptor: Message) => string
}

const NotificationFooter = ({ onViewAll, formatMessage }: Props) => {
  return (
    <Container onClick={onViewAll}>
      <Label>{formatMessage(messages.viewAll)}</Label>
    </Container>
  )
}

export default NotificationFooter
