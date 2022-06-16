/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import momentTz from 'moment-timezone'
import scheduledOrange from '../../../assets/scheduled_orange.svg'
import scheduledRed from '../../../assets/scheduled_red.svg'
import {
  Container,
  Cell,
  DeleteButton,
  EditIcon,
  DuePayment,
  CellSecondary,
  CellTight,
  TruckIcon,
  CellMobile
} from './styledComponents'
import upperFirst from 'lodash/upperFirst'
import {
  CANCELLED,
  DATE_FORMAT,
  INVOICED,
  INVOICE_SENT,
  IN_PRODUCTION,
  PAID_STATUS,
  PaymentOptions,
  PAYMENT_ISSUE,
  PENDING_APPROVAL,
  PREORDER
} from '../../../constants'
import { GREEN, RED_DARK } from '../../../theme/colors'

interface Props {
  date: string
  estimatedDate: string
  trackingNumber?: string
  status: string
  totalAmount: number
  currency: string
  service: string
  shortId: string
  paymentLink: string
  isDelivered: boolean
  deliveredDate: string
  inProductionTimestamp: string
  onBehalf: boolean
  canUpdatePayment: boolean
  owner: boolean
  teamStoreId: string
  paymentMethod: string
  editOrder: (orderId: string) => void
  deleteOrder: (orderId: string) => void
  onOrderClick: (shortId: string, isService?: boolean) => void
}

const ItemOrder = ({
  date,
  estimatedDate,
  trackingNumber = '',
  service,
  status,
  totalAmount,
  currency,
  shortId,
  owner,
  isDelivered,
  deliveredDate,
  paymentMethod,
  paymentLink,
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
  const productionValid = productionHours <= 24

  return (
    <Container onClick={handleOnClick}>
      <Cell>{service || shortId}</Cell>
      <Cell>{date}</Cell>
      <Cell>{estimatedDate}</Cell>
      <Cell textAlign="center">
        {!!trackingNumber ?
          <TruckIcon src={isDelivered ? scheduledRed : scheduledOrange} />
          : ''
        }
      </Cell>
      <CellMobile
        color={isDelivered ? (momentTz(deliveredDate).isAfter(estimatedDate, 'day') ? RED_DARK : GREEN) : ''}>
        {deliveredDate ? momentTz(deliveredDate).tz('America/Los_Angeles').format(DATE_FORMAT) : ''}
      </CellMobile>
      <CellTight>{currency} {totalAmount}</CellTight>
      <CellTight textAlign={'right'}>
        {upperFirst(status === INVOICE_SENT && paymentMethod !== PaymentOptions.PAYMENT_LINK
           ? `${PAYMENT_ISSUE} (${INVOICE_SENT})` : status)}
      </CellTight>
      {paymentMethod === PaymentOptions.PAYMENT_LINK && paymentLink &&
        <CellSecondary>
          <DuePayment>
            Payment Due
          </DuePayment>
        </CellSecondary>
      }
      <CellMobile>
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
      </CellMobile>
      <CellMobile>
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
      </CellMobile>
    </Container>
  )
}

export default ItemOrder
