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
      'By editing your order, your items will automatically go to your cart and this previous order will be deleted'
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
  }
})
