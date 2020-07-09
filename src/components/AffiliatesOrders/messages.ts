/**
 * AffiliatesOrders -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.AffiliatesOrders.title',
    defaultMessage: 'Affiliate Order History'
  },
  orderDate: {
    id: 'components.AffiliatesOrders.orderDate',
    defaultMessage: 'Order Date'
  },
  orderNumber: {
    id: 'components.AffiliatesOrders.orderNumber',
    defaultMessage: 'Order #'
  },
  orderStatus: {
    id: 'components.AffiliatesOrders.orderStatus',
    defaultMessage: 'Order Status'
  },
  orderAmount: {
    id: 'components.AffiliatesOrders.orderAmount',
    defaultMessage: 'Order Amount'
  },
  commisionStatus: {
    id: 'components.AffiliatesOrders.commisionStatus',
    defaultMessage: 'Commission Status'
  },
  amount: {
    id: 'components.AffiliatesOrders.amount',
    defaultMessage: 'Amount'
  },
  datePaid: {
    id: 'components.AffiliatesOrders.datePaid',
    defaultMessage: 'Date Paid'
  },
  empty: {
    id: 'components.AffiliatesOrders.empty',
    defaultMessage: 'No orders with commissions found.'
  },
  qualified: {
    id: 'components.AffiliatesOrders.qualified',
    defaultMessage: `Orders marked with a Pre-Order status are those which have been placed by 
    customers on a Batch Order store and are pending final confirmation. Customers may modify or 
    cancel their Pre-Order during the ordering period and therefore affect the eligible payable commission amount.`
  },
  affiliateInfo: {
    id: 'components.AffiliatesOrders.affiliateInfo',
    defaultMessage: `Orders with a status of Pending Approval are awaiting a final review by Jakroo’s service team 
    prior to being sent to production.`
  },
  filterBy: {
    id: 'components.AffiliatesOrders.filterBy',
    defaultMessage: 'FILTER BY'
  },
  from: {
    id: 'components.AffiliatesOrders.from',
    defaultMessage: 'From'
  },
  to: {
    id: 'components.AffiliatesOrders.to',
    defaultMessage: 'To'
  },
  show: {
    id: 'components.AffiliatesOrders.show',
    defaultMessage: 'Show'
  },
  orderPoint: {
    id: 'components.AffiliatesOrders.orderPoint',
    defaultMessage: 'Order point'
  },
  store: {
    id: 'components.AffiliatesOrders.store',
    defaultMessage: 'Store'
  }
})
