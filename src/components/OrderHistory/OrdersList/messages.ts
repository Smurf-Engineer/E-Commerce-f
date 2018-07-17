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
  trackingNumber: {
    id: 'components.OrdersList.trackingNumber',
    defaultMessage: 'Tracking Number'
  },
  tracking: {
    id: 'components.OrdersList.tracking',
    defaultMessage: 'Tracking'
  },
  status: {
    id: 'components.OrdersList.status',
    defaultMessage: 'Status'
  },
  emptyMessage: {
    id: 'components.OrdersList.emptyMessage',
    // tslint:disable-next-line:quotemark
    defaultMessage: "You don't have orders to show"
  }
})
