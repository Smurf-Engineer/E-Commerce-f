/**
 * PayModal -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.PayModal.tittle',
    defaultMessage: 'PayModal'
  },
  shippingAddress: {
    id: 'components.PayModal.shippingAddress',
    defaultMessage: 'Shipping Address'
  },
  billingAddress: {
    id: 'components.PayModal.billingAddress',
    defaultMessage: 'Billing Address'
  },
  payment: {
    id: 'components.PayModal.payment',
    defaultMessage: 'Payment'
  },
  orderNumber: {
    id: 'components.PayModal.orderNumber',
    defaultMessage: 'Order Number'
  },
  confirm: {
    id: 'components.PayModal.confirm',
    defaultMessage: 'Confirm'
  },
  correctCurrency: {
    id: 'components.PayModal.correctCurrency',
    defaultMessage:
      'Your selected Currency is {currentCurrency}. Is this the currency you wish to proceed?'
  },
  orderDate: {
    id: 'components.PayModal.orderDate',
    defaultMessage: 'Order Date'
  },
  faqTitle: {
    id: 'components.PayModal.faqTitle',
    defaultMessage: 'FREQUENTLY ASKED QUESTIONS'
  },
  methodCreditCard: {
    id: 'components.PayModal.methodCreditCard',
    defaultMessage: 'Credit Card'
  },
  methodPaypal: {
    id: 'components.PayModal.methodPaypal',
    defaultMessage: 'Paypal'
  },
  invoice: {
    id: 'components.PayModal.invoice',
    defaultMessage: 'Invoice'
  },
  paymentTerms: {
    id: 'components.PayModal.paymentTerms',
    defaultMessage: 'Payment Terms:'
  },
  phoneError: {
    id: 'components.PayModal.phoneError',
    defaultMessage: 'Phone number must be at least 7 digits'
  },
  downloadInvoice: {
    id: 'components.PayModal.downloadInvoice',
    defaultMessage: 'Download Invoice'
  },
  priceQuestion: {
    id: 'components.PayModal.priceQuestion',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'The pricing displayed on my order is different than pricing on the Batch Order Team Store Page or checkout.'
  },
  priceAnswer: {
    id: 'components.PayModal.priceAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Batch Order team stores provide the convenience of individual ordering with the benefit of group discounting. During high volume transaction periods, there may be a delay in price updates on screen after placing your order as our price engine reviews and update all orders. In most cases, your order will update and reflect the current pricing as shown on the team store page within 30-60 minutes after the order was placed or once the next member has their order. Payment is NOT taken until after the store closes to ensure everyone gets the same low price no matter when their order was placed.'
  },
  issueQuestion: {
    id: 'components.PayModal.issueQuestion',
    defaultMessage: 'My order status shows <span>payment Issue</span>. What do I do?'
  },
  issueAnswer: {
    id: 'components.PayModal.issueAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Payment issues may indicate there was a problem during the payment process. There are several reasons why this could occur including fraud protection by your card issuer, card updates, or discrepancies in transaction amounts in the case of PayPal. Please contact our customer service via our chat service, email, or phone to ensure your order moves forward into production in a timely manner.'
  },
  orderQuestion: {
    id: 'components.PayModal.orderQuestion',
    defaultMessage: 'I need to make a change to my order. What can I do?'
  },
  orderAnswer: {
    id: 'components.PayModal.orderAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'You can make changes to your order only during the <strong>open order period</strong> as shown on the Team Store page. To make a change to your order, click the EDIT button at the bottom of the order screen and follow the prompts. <br /> Once the store closes, payments are processed and orders enter the pre-production process immediately. Assembly production typically starts within 12-24 hours thereafter so changes may not be possible.'
  },
  items: {
    id: 'components.PayModal.items',
    defaultMessage: 'Items'
  },
  pendingTitle: {
    id: 'components.PayModal.pendingTitle',
    defaultMessage: 'We are checking your payment'
  },
  messageRetail: {
    id: 'components.PayModal.messageRetail',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your order and are working on it now. Every detail matters to us. All customized items are made to order and cannot be changed once your order enters the production process. Please double check your order and let us know immediately of any problems or concerns. If you requested a Pro Review, the production process will begin once the Review process has been completed.</p> <p>If you only ordered inline collections items together with customized items, all items will ship together based on the published delivery date. If you only ordered retail collection items, those items typically ship within 2 business days. All orders will be shipped via FedEx International Priority. A signature is required by default for the security of your order. We will send you a fulfillment notice with tracking about 3-4 days prior to your estimated delivery date.</p>'
  },
  messageTeamstore: {
    id: 'components.PayModal.messageTeamstore',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your team store order and are working on it now. All customized items are made to order and cannot be changed once the ordering period has closed and your order enters the production process. However, if necessary, you have the opportunity to edit your order during the ordering period. Please note that removing items from your order may affect the pricing for others. Please contact our customer service team with any questions. </p> <p>When ordering on a team store, payment method is validated at the time the order is placed.  Payment, however, will be taken after the ordering period has closed and all eligible discounts have been applied. This way, everyone gets the same low price regardless of when they placed their order during the ordering period.</p> <p>All orders will be shipped via FedEx International Priority. A signature is required by default for the security of your order. We will send you a fulfillment notice with tracking about 2-3 days prior to your estimated delivery date.</p>'
  },
  priceDropAlert: {
    id: 'components.PayModal.priceDropAlert',
    defaultMessage: 'Price Drop Alert'
  },
  priceDropMessage: {
    id: 'components.PayModal.priceDropMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'It looks like you have purchased an item from a team store.\nGet an alert anytime the price drops for your team when\nmore people place their orders.'
  },
  sendEmail: {
    id: 'components.PayModal.sendEmail',
    defaultMessage: 'Send alert via email'
  },
  sendSms: {
    id: 'components.PayModal.sendSms',
    defaultMessage: 'Send alert via SMS'
  },
  estimatedDate: {
    id: 'components.PayModal.estimatedDate',
    defaultMessage: 'Estimated Delivery Date'
  },
  waiting: {
    id: 'components.PayModal.waiting',
    defaultMessage: 'Waiting for cut off date'
  },
  teamStatus: {
    id: 'components.PayModal.teamStatus',
    defaultMessage: 'Team Order Status'
  },
  orderStatus: {
    id: 'components.PayModal.orderStatus',
    defaultMessage: 'Order Status'
  },
  orderPoint: {
    id: 'components.PayModal.orderPoint',
    defaultMessage: 'Order Point'
  },
  cart: {
    id: 'components.PayModal.cart',
    defaultMessage: 'Cart'
  }
})
