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
  id: string
  url?: string
  onPress: (id: string) => void
}

const NotificationRow = ({ id, title, message, date, read, url, onPress }: Props) => {
  const handleOnPress = () => {
    onPress(id, url)
  }
  return (
    <Container className={!read ? 'new' : ''} onClick={handleOnPress}>
      <Title>{title}</Title>
      <Description>{message}</Description>
      <Date>{moment(date).calendar()}</Date>
    </Container>
  )
}

export default NotificationRow
