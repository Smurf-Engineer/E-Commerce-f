/**
 * NotificationRow Component - Created by eduardoquintero on 25/08/20.
 */
import * as React from 'react'
import moment from 'moment'
import { Container, Description, Date, Title } from './styledComponents'

interface Props {
  title: string
  message: string
  date: string
  read: boolean
  onPress: (index: number) => void
}

const NotificationRow = ({ title, message, date, read, onPress }: Props) => {
  return (
    <Container className={!read ? 'new' : ''}>
      <Title>{title}</Title>
      <Description>{message}</Description>
      <Date>{moment(date).calendar()}</Date>
    </Container>
  )
}

export default NotificationRow
