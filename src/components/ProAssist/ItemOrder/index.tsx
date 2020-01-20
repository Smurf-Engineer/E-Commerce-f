/**
 * ItemOrder Component - Created by eduardoquintero on 16/01/20.
 */
import * as React from 'react'
import moment from 'moment'
import { Container, Cell, Link } from './styledComponents'

interface Props {
  id: number
  userId: string
  date: string
  firstName: string
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
  url,
  onRowClick
}: Props) => {
  const handleOnClick = () => onRowClick(url)
  return (
    <Container onClick={handleOnClick}>
      <Cell>
        <Link>{id}</Link>
      </Cell>
      <Cell>JV2-{userId}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell>{moment(date).format('DD/MM/YYYY')}</Cell>
      <Cell>{status}</Cell>
    </Container>
  )
}

export default ItemOrder
