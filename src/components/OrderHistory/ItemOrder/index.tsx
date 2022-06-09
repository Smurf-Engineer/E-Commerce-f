/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import momentTz from 'moment-timezone'
import { Container, Cell, DeleteButton, EditIcon } from './styledComponents'
import upperFirst from 'lodash/upperFirst'
import {
  CANCELLED,
  INVOICED,
  INVOICE_SENT,
  IN_PRODUCTION,
  PAID_STATUS,
  PAYMENT_ISSUE,
  PENDING_APPROVAL,
  PREORDER
} from '../../../constants'

interface Props {
  date: string
  estimatedDate: string
  trackingNumber?: string
  status: string
  totalAmount: number
  currency: string
  service: string
  shortId: string
  inProductionTimestamp: string
  onBehalf: boolean
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
  inProductionTimestamp,
  canUpdatePayment,
  teamStoreId,
  onBehalf,
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
  const productionHours = momentTz().tz('America/Los_Angeles')
      .diff(momentTz(inProductionTimestamp).tz('America/Los_Angeles'), 'hours')
  const productionValid = productionHours <= 48
  console.log('🔴productionHours:', productionHours)
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
        {(
          (teamStoreId && owner && (status === PREORDER || canUpdatePayment) && status !== CANCELLED) ||
          (onBehalf && (
            status === PAID_STATUS || 
            status === INVOICED || 
            (status === IN_PRODUCTION && productionValid) || 
            status === PENDING_APPROVAL    
          ) && owner)
        ) &&
          <EditIcon type="edit" onClick={editOrderAction}>Edit</EditIcon>
        }
      </Cell>
      <Cell>
        {(
          (teamStoreId && owner && (status === PREORDER || canUpdatePayment) && status !== CANCELLED) || 
          (onBehalf && (
            status === PAID_STATUS || 
            status === INVOICED || 
            (status === IN_PRODUCTION && productionValid) || 
            status === PENDING_APPROVAL    
          ) && owner)
        ) &&
          <DeleteButton onClick={deleteOrderAction}>
            Cancel
          </DeleteButton>
        }
      </Cell>
    </Container>
  )
}

export default ItemOrder
