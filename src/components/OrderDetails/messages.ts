/**
 * OrderDetails -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.OrderDetails.title',
    defaultMessage: 'Order Details'
  },
  backToHistory: {
    id: 'components.OrderDetails.backToHistory',
    defaultMessage: 'Back to Order History'
  },
  backToOverview: {
    id: 'components.OrderDetails.backToOverview',
    defaultMessage: 'Back to Overview'
  },
  receipt: {
    id: 'components.OrderDetails.receipt',
    defaultMessage: 'Receipt'
  },
  gotIt: {
    id: 'components.OrderDetails.gotIt',
    defaultMessage: 'Got it!'
  },
  paymentIssueInfo: {
    id: 'components.OrderDetails.paymentIssueInfo',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'There was a problem processing payment for your order and your order is on hold. To avoid delivery delays, please remit payment for your order using our <a href="{link}">secure payment page</a>. If payment is not received within 5 days, your order will be cancelled and you will need to contact customer service to reinstate your order. For any questions, you can reach us at 1-800-485-7067 (US) or 1-877-252-5766 (Canada) or use our online chat during business hours'
  },
  faqTitle: {
    id: 'components.OrderDetails.faqTitle',
    defaultMessage: 'FREQUENTLY ASKED QUESTIONS'
  },
  priceQuestion: {
    id: 'components.OrderDetails.priceQuestion',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'The pricing displayed on my order is different than pricing on the Batch Order Team Store Page or checkout.'
  },
  priceAnswer: {
    id: 'components.OrderDetails.priceAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Batch Order team stores provide the convenience of individual ordering with the benefit of group discounting. During high volume transaction periods, there may be a delay in price updates on screen after placing your order as our price engine reviews and update all orders. In most cases, your order will update and reflect the current pricing as shown on the team store page within 30-60 minutes after the order was placed or once the next member has their order. Payment is NOT taken until after the store closes to ensure everyone gets the same low price no matter when their order was placed.'
  },
  issueQuestion: {
    id: 'components.OrderDetails.issueQuestion',
    defaultMessage: 'My order status shows <span>payment Issue</span>. What do I do?'
  },
  issueAnswer: {
    id: 'components.OrderDetails.issueAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Payment issues may indicate there was a problem during the payment process. There are several reasons why this could occur including fraud protection by your card issuer, card updates, or discrepancies in transaction amounts in the case of PayPal. Please contact our customer service via our chat service, email, or phone to ensure your order moves forward into production in a timely manner.'
  },
  invoice: {
    id: 'components.OrderDetails.invoice',
    defaultMessage: 'Invoice'
  },
  paymentTerms: {
    id: 'components.OrderDetails.paymentTerms',
    defaultMessage: 'Payment Terms'
  },
  downloadInvoice: {
    id: 'components.OrderDetails.downloadInvoice',
    defaultMessage: 'Download Invoice'
  },
  orderQuestion: {
    id: 'components.OrderDetails.orderQuestion',
    defaultMessage: 'I need to make a change to my order. What can I do?'
  },
  orderAnswer: {
    id: 'components.OrderDetails.orderAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'You can make changes to your order only during the <strong>open order period</strong> as shown on the Team Store page. To make a change to your order, click the EDIT button at the bottom of the order screen and follow the prompts. <br /> Once the store closes, payments are processed and orders enter the pre-production process immediately. Assembly production typically starts within 12-24 hours thereafter so changes may not be possible.'
  },
  deliveryDate: {
    id: 'components.OrderDetails.deliveryDate',
    defaultMessage: 'Estimated Delivery Date'
  },
  orderNumber: {
    id: 'components.OrderDetails.orderNumber',
    defaultMessage: 'Order Number'
  },
  orderDate: {
    id: 'components.OrderDetails.orderDate',
    defaultMessage: 'Order Date'
  },
  trackingNumber: {
    id: 'components.OrderDetails.trackingNumber',
    defaultMessage: 'Tracking Number'
  },
  cutoffDate: {
    id: 'components.OrderDetails.cutoffDate',
    defaultMessage: 'Store Cut-off Date'
  },
  status: {
    id: 'components.OrderDetails.status',
    defaultMessage: 'Order Status'
  },
  orderSummary: {
    id: 'components.OrderDetails.orderSummary',
    defaultMessage: 'Order Summary'
  },
  subtotal: {
    id: 'components.OrderDetails.subtotal',
    defaultMessage: 'Subtotal'
  },
  taxes: {
    id: 'components.OrderDetails.taxes',
    defaultMessage: 'Taxes'
  },
  shipping: {
    id: 'components.OrderDetails.shipping',
    defaultMessage: 'Shipping'
  },
  discount: {
    id: 'components.OrderDetails.discount',
    defaultMessage: 'Discount'
  },
  total: {
    id: 'components.OrderDetails.total',
    defaultMessage: 'Total'
  },
  items: {
    id: 'components.OrderDetails.items',
    defaultMessage: 'Items'
  },
  reorderAll: {
    id: 'components.OrderDetails.reorderAll',
    defaultMessage: 'Reorder all items'
  },
  shippingAddress: {
    id: 'components.OrderDetails.shippingAddress',
    defaultMessage: 'Shipping Address'
  },
  billingAddress: {
    id: 'components.OrderDetails.billingAddress',
    defaultMessage: 'Billing Address'
  },
  payment: {
    id: 'components.OrderDetails.payment',
    defaultMessage: 'Payment'
  },
  annotation: {
    id: 'components.OrderDetails.annotation',
    defaultMessage:
      '* For order cancellations or information on refunds, please contact Customer Service.'
  },
  deleteOrder: {
    id: 'components.OrderDetails.deleteOrder',
    defaultMessage: 'Delete Order'
  },
  edit: {
    id: 'components.OrderDetails.edit',
    defaultMessage: 'Edit Order'
  },
  editOrderTitle: {
    id: 'components.OrderDetails.editOrderTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  editOrderMessage: {
    id: 'components.OrderDetails.editOrderMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'By editing your order, all items will be added to your cart so you can update your payment information and complete the checkout. In doing so, this previous order will be cancelled.'
  },
  proceed: {
    id: 'components.OrderDetails.proceed',
    defaultMessage: 'Yes, Proceed'
  },
  deleteTeamstoreTitle: {
    id: 'components.OrderDetails.deleteTeamstoreTitle',
    defaultMessage: 'DELETE TEAMSTORE ORDER'
  },
  deleteTeamstoreMessage: {
    id: 'components.OrderDetails.deleteTeamstoreMessage',
    defaultMessage:
      'By deleting your order, you will no longer be counted on the team´s order list'
  },
  delete: {
    id: 'components.OrderDetails.delete',
    defaultMessage: 'Yes, Delete'
  },
  lastUpdated: {
    id: 'components.OrderDetails.lastUpdated',
    defaultMessage: 'Last Updated'
  },
  orderPoint: {
    id: 'components.OrderDetails.orderPoint',
    defaultMessage: 'Order Point'
  },
  cart: {
    id: 'components.OrderDetails.cart',
    defaultMessage: 'Cart'
  },
  updatePayment: {
    id: 'components.OrderDetails.updatePayment',
    defaultMessage: 'Edit Order'
  },
  messageRetail: {
    id: 'components.OrderDetails.messageRetail',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your order and are working on it now. Every detail matters to us. All customized items are made to order and cannot be changed once your order enters the production process. Please double check your order and let us know immediately of any problems or concerns. If you requested a Pro Review, the production process will begin once the Review process has been completed.</p> <p>If you only ordered inline collections items together with customized items, all items will ship together based on the published delivery date. If you only ordered retail collection items, those items typically ship within 2 business days. All orders will be shipped via FedEx International Priority. A signature is required by default for the security of your order. We will send you a fulfillment notice with tracking about 3-4 days prior to your estimated delivery date.</p>'
  },
  messageTeamstore: {
    id: 'components.OrderDetails.messageTeamstore',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your team store order and are working on it now. All customized items are made to order and cannot be changed once the ordering period has closed and your order enters the production process. However, if necessary, you have the opportunity to edit your order during the ordering period. Please note that removing items from your order may affect the pricing for others. Please contact our customer service team with any questions. </p> <p>When ordering on a team store, payment method is validated at the time the order is placed.  Payment, however, will be taken after the ordering period has closed and all eligible discounts have been applied. This way, everyone gets the same low price regardless of when they placed their order during the ordering period.</p> <p>All orders will be shipped via FedEx International Priority. A signature is required by default for the security of your order. We will send you a fulfillment notice with tracking about 2-3 days prior to your estimated delivery date.</p>'
  },
  paymentIssue: {
    id: 'components.OrderDetails.paymentIssue',
    // tslint:disable-next-line:max-line-length
    defaultMessage: `We've encountered a problem when attempting to process your payment. Please contact <a href="mailto:customdesign@jakroousa.com">Customer Support</a> via email or chat within 48 hours or next business day to avoid delays and maintain your original delivery date.`
  },
  paymentIssueTitle: {
    id: 'components.OrderDetails.paymentIssueTitle',
    defaultMessage: 'Payment Issue'
  },
})
