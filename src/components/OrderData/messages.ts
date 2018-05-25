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
  messageReatil: {
    id: 'components.OrderData.messageReatil',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'Text about shipping needing signature. And other important information. Voluptate reprehenderit quis non excepteur deserunt veniam anim mollit. Amet occaecat aliquip elit nisi eu deserunt amet laboris magna adipisicing aute minim velit occaecat. Cillum aliquip enim excepteur anim. Id officia fugiat incididunt elit tempor excepteur id laborum minim magna sint velit officia. Sunt deserunt culpa sunt esse aliqua reprehenderit exercitation eu enim. Elit duis cillum pariatur excepteur non fugiat ipsum minim in consequat consequat.'
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
