/**
 * ItemOrder Component - Created by eduardoquintero on 16/01/20.
 */
import * as React from 'react'
import moment from 'moment'
import { Container, Cell, Link } from './styledComponents'
import { NOTE_FORMAT } from '../../UsersAdmin/constants'

interface Props {
  id: number
  userId: string
  date: string
  firstName: string
  lastOrder: string
  lastName: string
  status: string
  url: string
  onRowClick: (url: string) => void
}

const ItemOrder = ({
  id,
  userId,
  date,
  status,
  firstName,
  lastName,
  lastOrder,
  url,
  onRowClick
}: Props) => {
  const handleOnClick = () => onRowClick(url)
  return (
    <Container disabled={!url.length} onClick={handleOnClick}>
      <Cell>
        <Link disabled={!url.length}>{id}</Link>
      </Cell>
      <Cell>JV2-{userId}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell>{date ? moment(date).format(NOTE_FORMAT) : '-'}</Cell>
      <Cell>{status}</Cell>
      <Cell>{lastOrder ? moment(lastOrder).format(NOTE_FORMAT) : '-'}</Cell>
    </Container>
  )
}

export default ItemOrder
