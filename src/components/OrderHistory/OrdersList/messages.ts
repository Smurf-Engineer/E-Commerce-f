/**
 * OrdersList -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.OrdersList.title',
    defaultMessage: 'Recent Orders'
  },
  orderNumber: {
    id: 'components.OrdersList.orderNumber',
    defaultMessage: 'Order Number'
  },
  orderNo: {
    id: 'components.OrdersList.orderNo',
    defaultMessage: 'Order No.'
  },
  date: {
    id: 'components.OrdersList.date',
    defaultMessage: 'Date'
  },
  estimatedDate: {
    id: 'components.OrdersList.estimatedDate',
    defaultMessage: 'Est. Delivery Date'
  },
  trackingNumber: {
    id: 'components.OrdersList.trackingNumber',
    defaultMessage: 'Tracking Number/Service'
  },
  deliveryStatus: {
    id: 'components.OrdersList.deliveryStatus',
    defaultMessage: 'Delivery Status'
  },
  actualScheduled: {
    id: 'components.OrdersList.actualScheduled',
    defaultMessage: 'Actual/Scheduled Date'
  },
  tracking: {
    id: 'components.OrdersList.tracking',
    defaultMessage: 'Tracking'
  },
  amount: {
    id: 'components.OrdersList.amount',
    defaultMessage: 'Amount'
  },
  status: {
    id: 'components.OrdersList.status',
    defaultMessage: 'Status'
  },
  emptyMessage: {
    id: 'components.OrdersList.emptyMessage',
    defaultMessage: 'No orders yet'
  },
  editOrderTitle: {
    id: 'components.OrdersList.editOrderTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  editOrderMessage: {
    id: 'components.OrdersList.editOrderMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'By editing your order, all items will be added to your cart so you can update your payment information and complete the checkout. In doing so, this previous order will be cancelled.'
  },
  proceed: {
    id: 'components.OrdersList.proceed',
    defaultMessage: 'Yes, Proceed'
  },
  deleteTeamstoreTitle: {
    id: 'components.OrdersList.deleteTeamstoreTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  deleteTeamstoreMessage: {
    id: 'components.OrdersList.deleteTeamstoreMessage',
    defaultMessage:
      // tslint:disable-next-line: max-line-length
      'Cancelled orders will no longer count towards team quantities but you can always place a new order during the open ordering period to count towards the team totals.'
  },
  delete: {
    id: 'components.OrdersList.delete',
    defaultMessage: 'Yes, Delete'
  },
})
