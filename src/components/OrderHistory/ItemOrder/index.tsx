/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell, EditButton, DeleteButton } from './styledComponents'
import upperFirst from 'lodash/upperFirst'
import { CANCELLED, INVOICE_SENT, PAYMENT_ISSUE, PREORDER } from '../../../constants'

interface Props {
  date: string
  estimatedDate: string
  trackingNumber?: string
  status: string
  totalAmount: number
  currency: string
  service: string
  shortId: string
  canUpdatePayment: boolean
  owner: boolean
  teamStoreId: string
  editOrder: (orderId: string) => void
  deleteOrder: (orderId: string) => void
  onOrderClick: (shortId: string, isService?: boolean) => void
}

const ItemOrder = ({
  date,
  estimatedDate,
  trackingNumber = '-',
  service,
  status,
  totalAmount,
  currency,
  shortId,
  owner,
  canUpdatePayment,
  teamStoreId,
  editOrder,
  deleteOrder,
  onOrderClick,
}: Props) => {
  const handleOnClick = () => {
    onOrderClick(shortId, !!service)
  }
  const editOrderAction = (evt: React.MouseEvent) => {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }
    editOrder(shortId)
  }
  const deleteOrderAction = (evt: React.MouseEvent) => {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }
    deleteOrder(shortId)
  }
  return (
    <Container onClick={handleOnClick}>
      <Cell>{shortId}</Cell>
      <Cell>{date}</Cell>
      <Cell>{estimatedDate}</Cell>
      <Cell color={!service ? '#e61737' : ''}>{service || trackingNumber}</Cell>
      <Cell>{currency} {totalAmount}</Cell>
      <Cell textAlign={'right'}>
        {upperFirst(status === INVOICE_SENT ? `${PAYMENT_ISSUE} (${INVOICE_SENT})` : status)}
      </Cell>
      <Cell>
        {teamStoreId && owner && (status === PREORDER || canUpdatePayment) && status !== CANCELLED &&
          <EditButton onClick={editOrderAction}>Edit</EditButton>
        }
      </Cell>
      <Cell>
        {teamStoreId && owner && (status === PREORDER || canUpdatePayment) && status !== CANCELLED &&
          <DeleteButton type="delete" onClick={deleteOrderAction} />
        }
      </Cell>
    </Container>
  )
}

export default ItemOrder
