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
  messageRetail: {
    id: 'components.OrderData.messageRetail',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your order and are working on it now. Every detail matters to us. All customized items are made to order and cannot be changed once your order enters the production process. Please double check your order and let us know immediately of any problems or concerns. If you requested a Pro Review, the production process will begin once the Review process has been completed.</p><p>If you ordered inline collection items together with customized items, all items will ship together based on the published delivery date. All orders will be shipped via Fedex or UPS International Priority. Signature is required by default for the security of your order. We will send you a shipping update when the order has shipped.  </p>'
  },
  messageTeamstore: {
    id: 'components.OrderData.messageTeamstore',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'Pricing will drop as ordered quantities reach the next discount level. Your final purchase price will be confirmed at the end of the ordering period.'
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
  }
})
