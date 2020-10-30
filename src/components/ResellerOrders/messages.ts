/**
 * ResellerOrders -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.ResellerOrders.title',
    defaultMessage: 'Reseller Order History'
  },
  orderDate: {
    id: 'components.ResellerOrders.orderDate',
    defaultMessage: 'Order Date'
  },
  orderNumber: {
    id: 'components.ResellerOrders.orderNumber',
    defaultMessage: 'Order #'
  },
  orderStatus: {
    id: 'components.ResellerOrders.orderStatus',
    defaultMessage: 'Order Status'
  },
  orderAmount: {
    id: 'components.ResellerOrders.orderAmount',
    defaultMessage: 'Order Amount'
  },
  commisionStatus: {
    id: 'components.ResellerOrders.commisionStatus',
    defaultMessage: 'Commission Status'
  },
  amount: {
    id: 'components.ResellerOrders.amount',
    defaultMessage: 'Amount'
  },
  datePaid: {
    id: 'components.ResellerOrders.datePaid',
    defaultMessage: 'Date Paid'
  },
  empty: {
    id: 'components.ResellerOrders.empty',
    defaultMessage: 'No orders with commissions found.'
  },
  qualified: {
    id: 'components.ResellerOrders.qualified',
    defaultMessage: `Orders marked with a Pre-Order status are those which have been placed by 
    customers on a Batch Order store and are pending final confirmation. Customers may modify or 
    cancel their Pre-Order during the ordering period and therefore affect the eligible payable commission amount.`
  },
  affiliateInfo: {
    id: 'components.ResellerOrders.affiliateInfo',
    defaultMessage: `Orders with a status of Pending Approval are awaiting a final review by Jakroo’s service team 
    prior to being sent to production.`
  },
  filterBy: {
    id: 'components.ResellerOrders.filterBy',
    defaultMessage: 'FILTER BY'
  },
  from: {
    id: 'components.ResellerOrders.from',
    defaultMessage: 'From'
  },
  to: {
    id: 'components.ResellerOrders.to',
    defaultMessage: 'To'
  },
  show: {
    id: 'components.ResellerOrders.show',
    defaultMessage: 'Show'
  },
  orderPoint: {
    id: 'components.ResellerOrders.orderPoint',
    defaultMessage: 'Order point'
  },
  store: {
    id: 'components.ResellerOrders.store',
    defaultMessage: 'Store'
  }
})
