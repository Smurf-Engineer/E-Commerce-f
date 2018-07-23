/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
import upperFirst from 'lodash/upperFirst'

interface Props {
  date: string
  trackingNumber?: string
  status: string
  shortId: string
  onOrderClick: (shortId: string) => void
}

const ItemOrder = ({
  date,
  trackingNumber = '-',
  status,
  shortId,
  onOrderClick
}: Props) => {
  const handleOnClick = () => {
    onOrderClick(shortId)
  }
  return (
    <Container onClick={handleOnClick}>
      <Cell>{shortId}</Cell>
      <Cell>{date}</Cell>
      <Cell color={'#e61737'}>{trackingNumber}</Cell>
      <Cell textAlign={'right'}>{upperFirst(status)}</Cell>
    </Container>
  )
}

export default ItemOrder
