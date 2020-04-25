/**
 * OrderData -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.OrderData.tittle',
    defaultMessage: 'OrderData'
  },
  shippingAddress: {
    id: 'components.OrderData.shippingAddress',
    defaultMessage: 'Shipping Address'
  },
  billingAddress: {
    id: 'components.OrderData.billingAddress',
    defaultMessage: 'Billing Address'
  },
  payment: {
    id: 'components.OrderData.payment',
    defaultMessage: 'Payment'
  },
  orderNumber: {
    id: 'components.OrderData.orderNumber',
    defaultMessage: 'Order Number'
  },
  orderDate: {
    id: 'components.OrderData.orderDate',
    defaultMessage: 'Order Date'
  },
  items: {
    id: 'components.OrderData.items',
    defaultMessage: 'Items'
  },
  pendingTitle: {
    id: 'components.OrderData.pendingTitle',
    defaultMessage: 'We are checking your payment'
  },
  messageRetail: {
    id: 'components.OrderData.messageRetail',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your order and are working on it now. Every detail matters to us. All customized items are made to order and cannot be changed once your order enters the production process. Please double check your order and let us know immediately of any problems or concerns. If you requested a Pro Review, the production process will begin once the Review process has been completed.</p> <p>If you only ordered inline collections items together with customized items, all items will ship together based on the published delivery date. If you only ordered retail collection items, those items typically ship within 2 business days. All orders will be shipped via FedEx International Priority. A signature is required by default for the security of your order. We will send you a fulfillment notice with tracking about 3-4 days prior to your estimated delivery date.</p>'
  },
  messageTeamstore: {
    id: 'components.OrderData.messageTeamstore',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your team store order and are working on it now. All customized items are made to order and cannot be changed once the ordering period has closed and your order enters the production process. However, if necessary, you have the opportunity to edit your order during the ordering period. Please note that removing items from your order may affect the pricing for others. Please contact our customer service team with any questions. </p> <p>When ordering on a team store, payment method is validated at the time the order is placed.  Payment, however, will be taken after the ordering period has closed and all eligible discounts have been applied. This way, everyone gets the same low price regardless of when they placed their order during the ordering period.</p> <p>All orders will be shipped via FedEx International Priority. A signature is required by default for the security of your order. We will send you a fulfillment notice with tracking about 2-3 days prior to your estimated delivery date.</p>'
  },
  priceDropAlert: {
    id: 'components.OrderData.priceDropAlert',
    defaultMessage: 'Price Drop Alert'
  },
  priceDropMessage: {
    id: 'components.OrderData.priceDropMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'It looks like you have purchased an item from a team store.\nGet an alert anytime the price drops for your team when\nmore people place their orders.'
  },
  sendEmail: {
    id: 'components.OrderData.sendEmail',
    defaultMessage: 'Send alert via email'
  },
  sendSms: {
    id: 'components.OrderData.sendSms',
    defaultMessage: 'Send alert via SMS'
  },
  estimatedDate: {
    id: 'components.OrderData.estimatedDate',
    defaultMessage: 'Estimated Delivery Date'
  },
  waiting: {
    id: 'components.OrderData.waiting',
    defaultMessage: 'Waiting for cut off date'
  },
  teamStatus: {
    id: 'components.OrderData.teamStatus',
    defaultMessage: 'Team Order Status'
  },
  orderStatus: {
    id: 'components.OrderData.orderStatus',
    defaultMessage: 'Order Status'
  },
  orderPoint: {
    id: 'components.OrderData.orderPoint',
    defaultMessage: 'Order Point'
  },
  cart: {
    id: 'components.OrderData.cart',
    defaultMessage: 'Cart'
  }
})
