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
  referenceNumber: {
    id: 'components.OrderDetails.referenceNumber',
    defaultMessage: 'Reference Number'
  },
  gotIt: {
    id: 'components.OrderDetails.gotIt',
    defaultMessage: 'Got it!'
  },
  cancel: {
    id: 'components.OrderDetails.cancel',
    defaultMessage: 'Cancel'
  },
  makeChange: {
    id: 'components.OrderDetails.makeChange',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'I need to make a change to my order. What can I do?'
  },
  makeChangeDescription: {
    id: 'components.OrderDetails.makeChangeDescription',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Mistakes happen and we will do our best to help. However time is of the essence as all custom orders are made-to-order and enter the pre-production process immediately upon receipt. Assembly production typically starts within 12-24 hours thereafter and cannot be changed.'
  },
  orderArrive: {
    id: 'components.OrderDetails.orderArrive',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'When will my order arrive?'
  },
  orderArriveDesc: {
    id: 'components.OrderDetails.orderArriveDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Delivery dates shown on your order are estimates only. Jakroo prides itself with having the industry’s fastest turnaround times and we will do our best to ensure the timely delivery of your order. However, external events beyond our control such as weather, carrier delays,  or other mitigating factors may result in delivery delays and do not warrant a cancellation the order. Learn more about our delivery terms within our <a href="https://jakroo.com/terms-of-use">terms and conditions</a> policy. Once your order is passed to the carrier,  you will be able to track the shipping status via a tracking link located on this order screen. </p>'
  },
  returnPolicy: {
    id: 'components.OrderDetails.returnPolicy',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'What is your return or exchange policy?'
  },
  returnPolicyDesc: {
    id: 'components.OrderDetails.returnPolicyDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>All orders are custom made-to-order on demand and cannot be returned for reasons other than manufacturer error or defect. Visit our <a href="https://jakroo.com/warranty-program">warranty page</a> for more details.</p>'
  },
  arriveQuestion: {
    id: 'components.OrderDetails.arriveQuestion',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'When will my order arrive?'
  },
  arriveQuestionDesc: {
    id: 'components.OrderDetails.arriveQuestionDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Delivery dates shown on your order are estimates only. Jakroo prides itself with having the industry’s fastest turnaround times and we will do our best to ensure the timely delivery of your order. However, external events beyond our control such as weather, carrier delays, or other mitigating factors, may result in delivery delays and do not warrant a cancellation the order. Learn more about our delivery terms within our <a href="https://jakroo.com/terms-of-use">terms and conditions</a> policy. Once your order is passed to the carrier,  you will be able to track the shipping status via a tracking link located on this order screen.</p>'
  },
  returnQuestion: {
    id: 'components.OrderDetails.returnQuestion',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'What is your return or exchange policy?'
  },
  returnQuestionDesc: {
    id: 'components.OrderDetails.returnQuestionDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>All orders are custom made-to-order on demand and cannot be returned for reasons other than manufacturer error or defect. Visit our <a href="https://jakroo.com/warranty-program">warranty page</a> for more details.</p>'
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
    defaultMessage: '<p>Batch Order team stores provide the convenience of individual ordering with the benefit of group discounting. During high volume transaction periods, there may be a delay in price updates on screen after placing your order while our price engine reviews and updates all orders. In most cases, your order will be updated and reflect the current pricing as shown on the team store page within 30-60 minutes after the order was placed, or once the next member has placed their order. <u>Payment is NOT taken until after the store closes</u> to ensure everyone gets the same low price no matter when their order was placed.</p>'
  },
  statusLabel: {
    id: 'components.OrderDetails.statusLabel',
    defaultMessage: 'Your Order has been received and is being processed'
  },
  issueQuestion: {
    id: 'components.OrderDetails.issueQuestion',
    defaultMessage: 'My order status shows <span>payment Issue</span>. What do I do?'
  },
  issueAnswer: {
    id: 'components.OrderDetails.issueAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Payment issues indicate there was a problem during the payment process. There are several reasons why this could occur including fraud protection by your card issuer, card updates, or discrepancies in transaction amounts in the case of PayPal. In this case, you will receive a notification from us together with link to a secure payment page to resubmit your payment.</p><p>Orders with payment issues are put ON HOLD until payment is received. If payment is received within 24 hours of the original store cut-off date, we will honor the stated estimated delivery date. <u>Delivery dates for payments made after 24 hours are subject to change as we would need to produce your order separately from the bulk order.</u></p><p>If payment is not received within 5 days of the payment issue notice, your order is automatically cancelled and you will need to speak with customer service to reinstate your order with a new delivery date.</p>'
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
    defaultMessage: '<p>Mistakes happen and we will do our best to help. However time is of the essence. All custom orders are made to order and enter the pre-production process immediately. Assembly production typically starts within 12-24 hours thereafter.</p><p>If you placed your order through a Batch Order Team Store, you can cancel or make changes to your order <strong>only during the open order period</strong> as shown on the team Store page. Once the store closes, no changes can be made. To change your Batch Team Store order, click the EDIT button at the bottom of the order details screen and follow the prompts.</p>'
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
    defaultMessage: 'Payment Method'
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
    defaultMessage: 'Edit'
  },
  editOrderTitle: {
    id: 'components.OrderDetails.editOrderTitle',
    defaultMessage: 'EDITING YOUR ORDER'
  },
  editOrderMessage: {
    id: 'components.OrderDetails.editOrderMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>Editing your order will place ALL the original items back to the shopping cart and the <u>original order will be cancelled.</u></p> <p>You can then make changes to the items in the cart, including deleting or adding more items from the Team Store.</p> <p><strong>You will need to confirm your payment information and complete the checkout in order to resubmit the order.</strong></p>'
  },
  proceed: {
    id: 'components.OrderDetails.proceed',
    defaultMessage: 'Yes, Proceed'
  },
  deleteTeamstoreTitle: {
    id: 'components.OrderDetails.deleteTeamstoreTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  deleteTeamstoreMessage: {
    id: 'components.OrderDetails.deleteTeamstoreMessage',
    defaultMessage:
      // tslint:disable-next-line: max-line-length
      'Cancelled orders will no longer count towards team quantities but you can always place a new order during the open ordering period to count towards the team totals.'
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
  placedBy: {
    id: 'components.OrderDetails.placedBy',
    defaultMessage: 'Placed By'
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
      '<p>We have received your order details and are working on it now. Please note that all custom items are made-to-order and cannot be changed once the order enters production, so please double check all details of your order (items, sizes, shipping address)  and <strong>let us know immediately</strong> if there are any problems or concerns. If you opted for the Design Check during checkout, your order will be put into production after your item(s) have been reviewed by one of our designers and any issues they have discovered have been resolved.</p><p>All orders will be shipped via FedEx International Priority. A <strong>signature is required</strong> by default for the security of your order. You will receive a shipping notice, including tracking information, about 3-4 days prior to your estimated delivery date.</p>'
  },
  messageRetailShipped: {
    id: 'components.OrderDetails.messageRetailShipped',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>All orders will be shipped via FedEx International Priority. A <strong>signature is required</strong> by default for the security of your order. You will receive a shipping notice, including tracking information, about 3-4 days prior to your estimated delivery date.</p>'
  },
  messageTeamstore: {
    id: 'components.OrderDetails.messageTeamstore',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your team store order and will begin working on it once the Team Store closes.</p><p>All custom items are made-to-order and cannot be changed or cancelled once the store has closed and the order enters the production process. However, <u>during the open ordering period</u>, If you need to cancel or adjust your order (sizes, quantity, address, payment method, etc.), you can do so by clicking the <strong>EDIT</strong> button above the Order Summary. Doing so will cancel the existing order and repopulate your items back into your cart where you can make any necessary changes.</p><p>All orders will be shipped via FedEx International Priority. A <strong>signature is required</strong> by default for the security of your order. You will receive a shipping notice, including tracking information, about 3-4 days prior to your estimated delivery date.</p>'
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
  aboutDynamicPricing: {
    id: 'components.OrderDetails.aboutDynamicPricing',
    defaultMessage: 'ABOUT DYNAMIC PRICING'
  },
  close: {
    id: 'components.OrderDetails.close',
    defaultMessage: 'Close'
  },
  dynamicPrice: {
    id: 'components.OrderDetails.dynamicPrice',
    defaultMessage: 'JAKROO DYNAMIC PRICE DROP'
  },
  dynamicPriceDesc: {
    id: 'components.OrderDetails.dynamicPriceDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>During high volume transaction periods, there may be a delay in price updates on screen after placing your order while our price engine updates pricing on all orders.</p> <p>Do not worry. Your order will be updated and reflect the current pricing as shown on the team store page within 30 minutes after the order was placed, or once the next member has placed their order.</p> <p>Payment is <strong>NOT</strong> taken until after store closure to ensure everyone gets the same low price no matter when their order was placed.</p>'
  }
})
