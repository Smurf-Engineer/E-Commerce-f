/**
 * ItemOrder Component - Created by eduardoquintero on 16/01/20.
 */
import * as React from 'react'
import moment from 'moment'
import { Container, Cell } from './styledComponents'

interface Props {
  id: number
  userId: string
  date: string
  firstName: string
  lastName: string
  status: string
}

const ItemOrder = ({
  id,
  userId,
  date,
  status,
  firstName,
  lastName
}: Props) => {
  return (
    <Container>
      <Cell>{id}</Cell>
      <Cell>JV2-{userId}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell>{moment(date).format('DD/MM/YYYY')}</Cell>
      <Cell>{status}</Cell>
    </Container>
  )
}

export default ItemOrder
