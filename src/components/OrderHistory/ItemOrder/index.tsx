/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
import upperFirst from 'lodash/upperFirst'

interface Props {
  orderNumber: number
  date: string
  trackingNumber?: string
  status: string
}

const ItemOrder = ({
  orderNumber,
  date,
  trackingNumber = '-',
  status
}: Props) => {
  return (
    <Container>
      <Cell>{orderNumber}</Cell>
      <Cell>{date}</Cell>
      <Cell color={'#e61737'}>{trackingNumber}</Cell>
      <Cell textAlign={'right'}>{upperFirst(status)}</Cell>
    </Container>
  )
}

export default ItemOrder
