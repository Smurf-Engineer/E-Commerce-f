/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
import upperFirst from 'lodash/upperFirst'
import { INVOICE_SENT, PAYMENT_ISSUE } from '../../../constants'

interface Props {
  date: string
  estimatedDate: string
  trackingNumber?: string
  status: string
  shortId: string
  onOrderClick: (shortId: string) => void
}

const ItemOrder = ({
  date,
  estimatedDate,
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
      <Cell>{estimatedDate}</Cell>
      <Cell color={'#e61737'}>{trackingNumber}</Cell>
      <Cell textAlign={'right'}>
        {upperFirst(status === INVOICE_SENT ? `${PAYMENT_ISSUE} (${INVOICE_SENT})` : status)}
      </Cell>
    </Container>
  )
}

export default ItemOrder
