/**
 * NotificationRow Component - Created by eduardoquintero on 25/08/20.
 */
import * as React from 'react'
import moment from 'moment'
import { Container, Description, Date, Title, DeleteButton } from './styledComponents'
import { SwipeItem } from './SwipeItem'

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

const NotificationRow = ({ id, title, message, metaMessage, date, read, url, onPress, onDelete }: Props) => {
  const handleOnPress = () => {
    onPress(id, url)
  }
  const handleDelete = () => {
    onDelete(id)
  }
  return (
    <SwipeItem
      actionButtonOffset={90}
      onClick={handleOnPress}
      actionButton={<DeleteButton onClick={handleDelete}>Delete</DeleteButton>}
    >
      <Container className={!read ? 'new' : ''}>
        <Title>{title}</Title>
        <Description
          dangerouslySetInnerHTML={{
            __html: metaMessage || message
          }}
        />
        <Date>{moment(date).calendar()}</Date>
      </Container>
    </SwipeItem>
  )
}

export default NotificationRow
