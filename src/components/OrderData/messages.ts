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
    defaultMessage: 'Payment Method'
  },
  referenceNumber: {
    id: 'components.OrderData.referenceNumber',
    defaultMessage: 'Reference Number'
  },
  paymentLink: {
    id: 'components.OrderData.paymentLink',
    defaultMessage: 'Payment Link'
  },
  placedBy: {
    id: 'components.OrderData.placedBy',
    defaultMessage: 'Placed By'
  },
  statusLabel: {
    id: 'components.OrderData.statusLabel',
    defaultMessage: 'Your Order has been received and is being processed'
  },
  orderNumber: {
    id: 'components.OrderData.orderNumber',
    defaultMessage: 'Order Number'
  },
  orderDate: {
    id: 'components.OrderData.orderDate',
    defaultMessage: 'Order Date'
  },
  faqTitle: {
    id: 'components.OrderData.faqTitle',
    defaultMessage: 'FREQUENTLY ASKED QUESTIONS'
  },
  gotIt: {
    id: 'components.OrderData.gotIt',
    defaultMessage: 'Got It'
  },
  copiedLink: {
    id: 'components.OrderData.copiedLink',
    defaultMessage: 'Copied to clipboard!'
  },
  paymentLinkInfo: {
    id: 'components.OrderData.paymentLinkInfo',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'The order has been placed! This is the generated payment link that you can share with the customer:'
  },
  invoice: {
    id: 'components.OrderData.invoice',
    defaultMessage: 'Invoice'
  },
  aboutDynamicPricing: {
    id: 'components.OrderData.aboutDynamicPricing',
    defaultMessage: 'ABOUT DYNAMIC PRICING'
  },
  makeChange: {
    id: 'components.OrderData.makeChange',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'I need to make a change to my order. What can I do?'
  },
  makeChangeDescription: {
    id: 'components.OrderData.makeChangeDescription',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Mistakes happen and we will do our best to help. However time is of the essence as all custom orders are made-to-order and enter the pre-production process immediately upon receipt. Assembly production typically starts within 12-24 hours thereafter and cannot be changed.'
  },
  orderArrive: {
    id: 'components.OrderData.orderArrive',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'When will my order arrive?'
  },
  orderArriveDesc: {
    id: 'components.OrderData.orderArriveDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Delivery dates shown on your order are estimates only. Jakroo prides itself with having the industry’s fastest turnaround times and we will do our best to ensure the timely delivery of your order. However, external events beyond our control such as weather, carrier delays,  or other mitigating factors may result in delivery delays and do not warrant a cancellation the order. Learn more about our delivery terms within our <a href="https://jakroo.com/terms-of-use">terms and conditions</a> policy. Once your order is passed to the carrier,  you will be able to track the shipping status via a tracking link located on this order screen. </p>'
  },
  returnPolicy: {
    id: 'components.OrderData.returnPolicy',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'What is your return or exchange policy?'
  },
  returnPolicyDesc: {
    id: 'components.OrderData.returnPolicyDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>All orders are custom made-to-order on demand and cannot be returned for reasons other than manufacturer error or defect. Visit our <a href="https://jakroo.com/warranty-program">warranty page</a> for more details.</p>'
  },
  arriveQuestion: {
    id: 'components.OrderData.arriveQuestion',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'When will my order arrive?'
  },
  arriveQuestionDesc: {
    id: 'components.OrderData.arriveQuestionDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Delivery dates shown on your order are estimates only. Jakroo prides itself with having the industry’s fastest turnaround times and we will do our best to ensure the timely delivery of your order. However, external events beyond our control such as weather, carrier delays, or other mitigating factors, may result in delivery delays and do not warrant a cancellation the order. Learn more about our delivery terms within our <a href="https://jakroo.com/terms-of-use">terms and conditions</a> policy. Once your order is passed to the carrier,  you will be able to track the shipping status via a tracking link located on this order screen.</p>'
  },
  returnQuestion: {
    id: 'components.OrderData.returnQuestion',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'What is your return or exchange policy?'
  },
  returnQuestionDesc: {
    id: 'components.OrderData.returnQuestionDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>All orders are custom made-to-order on demand and cannot be returned for reasons other than manufacturer error or defect. Visit our <a href="https://jakroo.com/warranty-program">warranty page</a> for more details.</p>'
  },
  paymentTerms: {
    id: 'components.OrderData.paymentTerms',
    defaultMessage: 'Payment Terms:'
  },
  downloadInvoice: {
    id: 'components.OrderData.downloadInvoice',
    defaultMessage: 'Download Invoice'
  },
  priceQuestion: {
    id: 'components.OrderData.priceQuestion',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'The pricing displayed on my order is different than pricing on the Batch Order Team Store Page or checkout.'
  },
  priceAnswer: {
    id: 'components.OrderData.priceAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Batch Order team stores provide the convenience of individual ordering with the benefit of group discounting. During high volume transaction periods, there may be a delay in price updates on screen after placing your order while our price engine reviews and updates all orders. In most cases, your order will be updated and reflect the current pricing as shown on the team store page within 30-60 minutes after the order was placed, or once the next member has placed their order. <u>Payment is NOT taken until after the store closes</u> to ensure everyone gets the same low price no matter when their order was placed.</p>'
  },
  issueQuestion: {
    id: 'components.OrderData.issueQuestion',
    defaultMessage: 'My order status shows <span>payment Issue</span>. What do I do?'
  },
  issueAnswer: {
    id: 'components.OrderData.issueAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Payment issues indicate there was a problem during the payment process. There are several reasons why this could occur including fraud protection by your card issuer, card updates, or discrepancies in transaction amounts in the case of PayPal. In this case, you will receive a notification from us together with link to a secure payment page to resubmit your payment.</p><p>Orders with payment issues are put ON HOLD until payment is received. If payment is received within 24 hours of the original store cut-off date, we will honor the stated estimated delivery date. <u>Delivery dates for payments made after 24 hours are subject to change as we would need to produce your order separately from the bulk order.</u></p><p>If payment is not received within 5 days of the payment issue notice, your order is automatically cancelled and you will need to speak with customer service to reinstate your order with a new delivery date.</p>'
  },
  orderQuestion: {
    id: 'components.OrderData.orderQuestion',
    defaultMessage: 'I need to make a change to my order. What can I do?'
  },
  orderAnswer: {
    id: 'components.OrderData.orderAnswer',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>Mistakes happen and we will do our best to help. However time is of the essence. All custom orders are made to order and enter the pre-production process immediately. Assembly production typically starts within 12-24 hours thereafter.</p><p>If you placed your order through a Batch Order Team Store, you can cancel or make changes to your order <strong>only during the open order period</strong> as shown on the team Store page. Once the store closes, no changes can be made. To change your Batch Team Store order, click the EDIT button at the bottom of the order details screen and follow the prompts.</p>'
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
      '<p>We’ve received your team store order and will begin working on it once the Team Store closes.</p><p>All custom items are made-to-order and cannot be changed or cancelled once the store has closed and the order enters the production process. However, <u>during the open ordering period</u>, If you need to cancel or adjust your order (sizes, quantity, address, payment method, etc.), you can do so by clicking the <strong>EDIT</strong> button above the Order Summary. Doing so will cancel the existing order and repopulate your items back into your cart where you can make any necessary changes.</p><p>All orders will be shipped via FedEx International Priority. A <strong>signature is required</strong> by default for the security of your order. You will receive a shipping notice, including tracking information, about 3-4 days prior to your estimated delivery date.</p>'
  },
  messageTeamstore: {
    id: 'components.OrderData.messageTeamstore',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>We’ve received your team store order and will begin working on it once the Team Store closes.</p><p>All custom items are made-to-order and cannot be changed or cancelled once the store has closed and the order enters the production process. However, <u>during the open ordering period</u>, If you need to cancel or adjust your order (sizes, quantity, address, payment method, etc.), you can do so by clicking the <strong>EDIT</strong> button above the Order Summary. Doing so will cancel the existing order and repopulate your items back into your cart where you can make any necessary changes.</p><p>All orders will be shipped via FedEx International Priority. A <strong>signature is required</strong> by default for the security of your order. You will receive a shipping notice, including tracking information, about 3-4 days prior to your estimated delivery date.</p>'
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
  trackingNumber: {
    id: 'components.OrderData.trackingNumber',
    defaultMessage: 'Tracking Number'
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
  },
  close: {
    id: 'components.OrderData.close',
    defaultMessage: 'Got it'
  },
  dynamicPrice: {
    id: 'components.OrderData.dynamicPrice',
    defaultMessage: 'JAKROO DYNAMIC PRICE DROP'
  },
  dynamicPriceDesc: {
    id: 'components.OrderData.dynamicPriceDesc',
    // tslint:disable-next-line: max-line-length
    defaultMessage: '<p>During high volume transaction periods, there may be a delay in price updates on screen after placing your order while our price engine updates pricing on all orders.</p> <p>Do not worry. Your order will be updated and reflect the current pricing as shown on the team store page within 30 minutes after the order was placed, or once the next member has placed their order.</p> <p>Payment is <strong>NOT</strong> taken until after store closure to ensure everyone gets the same low price no matter when their order was placed.</p>'
  }
})
