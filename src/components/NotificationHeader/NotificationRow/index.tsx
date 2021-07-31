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
  metaMessage?: string
  url?: string
  onPress: (id: string) => void
}

const NotificationRow = ({ id, title, message, metaMessage, date, read, url, onPress }: Props) => {
  const handleOnPress = () => {
    onPress(id, url)
  }
  return (
    <Container className={!read ? 'new' : ''} onClick={handleOnPress}>
      <Title>{title}</Title>
      <Description
        dangerouslySetInnerHTML={{
          __html: metaMessage || message
        }}
      />
      <Date>{moment(date).calendar()}</Date>
    </Container>
  )
}

export default NotificationRow
