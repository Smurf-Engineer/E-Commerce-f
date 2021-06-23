/**
 * StoreFrontContentContent -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'screens.StoreFrontContent.tittle',
    defaultMessage: 'My team store'
  },
  orderTitle: {
    id: 'screens.StoreFrontContent.orderTitle',
    defaultMessage: 'Order by'
  },
  orderTitle2: {
    id: 'screens.StoreFrontContent.orderTitle2',
    defaultMessage: 'and receive your order by'
  },
  aboutDirectship: {
    id: 'screens.StoreFrontContent.aboutDirectship',
    defaultMessage: 'About Directship Ordering'
  },
  priceDropTitle: {
    id: 'screens.StoreFrontContent.priceDropTitle',
    defaultMessage: 'DYNAMIC PRICE DROP'
  },
  welcome: {
    id: 'screens.StoreFrontContent.welcome',
    defaultMessage: 'Welcome to {teamStoreName} store'
  },
  needAssistance: {
    id: 'screens.StoreFrontContent.needAssistance',
    defaultMessage: 'Need help determining your size?'
  },
  tryFreeService: {
    id: 'screens.StoreFrontContent.tryFreeService',
    defaultMessage: 'Try our free Size Recommendation Service'
  },
  storeOpen: {
    id: 'screens.StoreFrontContent.storeOpen',
    defaultMessage: 'STORE OPEN'
  },
  storeClosed: {
    id: 'screens.StoreFrontContent.storeClosed',
    defaultMessage: 'STORE CLOSED'
  },
  priceDropMessage: {
    id: 'screens.StoreFrontContent.priceDropMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>With JAKROO’s Dynamic Price Drop, everyone wins!</p> <p>The starting discount level for all team members is 20%.  As team members place their orders and reach the next discount level, <strong>the price automatically drops for everyone, even for those who placed their order before the drop.</strong></p> <p>Final pricing for each item will be based on the highest discount level achieved for that item. Payment is processed after the close of the order period so <strong>everyone receives the same low price, regardless of when your order was placed.</strong> Yes, it’s that cool!</p>'
  },
  tierTitle: {
    id: 'screens.StoreFrontContent.tierTitle',
    defaultMessage: 'This store’s estimate price tier is '
  },
  tierDescription: {
    id: 'screens.StoreFrontContent.tierDescription',
    defaultMessage:
      'To get to the target price, at least one item has to be over 25 orders'
  },
  aboutOrdering: {
    id: 'screens.StoreFrontContent.aboutOrdering',
    defaultMessage: 'About {teamType}'
  },
  howMuchTitle: {
    id: 'screens.StoreFrontContent.howMuchTitle',
    defaultMessage: 'How much will I pay?'
  },
  howMuchDesc: {
    id: 'screens.StoreFrontContent.howMuchDesc',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>When ordering through an On-Demand Store, pricing for each item starts at the 2-5pc pricing tier (20% off the single item price) and drops automatically based on the quantity ordered. Orders placed by other members do not combine for volume pricing in this mode Additional discounts may be available through seasonal and special promotions using a promo code.</p>'
  },
  howMuchDescBatch: {
    id: 'screens.StoreFrontContent.howMuchDescBatch',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>When ordering from a JAKROO Batch Order Team Store, members will save a minimum of 20% off the regular price the items. With Dynamic Price Drop, the price you pay at the time of placing your order will be displayed as the ‘current price’.  However, as other members place orders for the same items, the total quantity ordered increases and higher discount levels are achieved. Pricing is automatically adjusted for everyone. </p> <p>The final price for any item is based on the highest discount level achieved at the time the Team Store closes. All orders are updated to ensure everyone gets the same low price, regardless of when they placed their order.</p>'
  },
  whenTitle: {
    id: 'screens.StoreFrontContent.whenTitle',
    defaultMessage: 'When will payment be processed?'
  },
  whenDesc: {
    id: 'screens.StoreFrontContent.whenDesc',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>With team ordering, the payment method is validated and processed at the time the order is placed. Available payments for On-Demand Team Store currently are credit card and PayPal.</p>'
  },
  whenDescBatch: {
    id: 'screens.StoreFrontContent.whenDescBatch',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>When ordering through a Team Store with a defined ordering period, the payment method is only validated at the time the order is placed. Once the ordering period for the store closes, payment is processed through a secure and encrypted processor. We do NOT store any credit card information on our servers. If a card is declined for any reason, you will receive a notification to re-enter your payment information and complete the checkout process.</p>'
  },
  changeOrderTitle: {
    id: 'screens.StoreFrontContent.changeOrderTitle',
    defaultMessage: 'Can I change or cancel my order?'
  },
  changeOrderDesc: {
    id: 'screens.StoreFrontContent.changeOrderDesc',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>All items on Team Stores are custom made to order and therefore cannot be cancelled after the order enters the production cycle. However, you can cancel or change your order <b>during the ordering period</b> by logging into your Jakroo account and going to the order page. Once the ordering period has closed, however, you will not be able to make any changes. Please note that since your order is part of the team bulk order, changing or canceling it may affect the quantity discount achieved for the rest of the team.</p>'
  },
  howLongTitle: {
    id: 'screens.StoreFrontContent.howLongTitle',
    defaultMessage: 'How long will it take to receive my order?'
  },
  howLongDesc: {
    id: 'screens.StoreFrontContent.howLongDesc',
    defaultMessage:
      `<p>JAKROO has the fastest delivery time for technical apparel in the world. Orders through typically take only 
      2 weeks from the day you place your order until delivery at your door. Order times may vary based on the quantity 
      ordered, and in many cases, may even be delivered in less than 14 days. Estimated delivery dates are posted on 
      our website and on your Order Detail record in “My Account”. We strongly encourage customers to allow for a few 
      additional delivery days when planning for a date specific event.</p>
      <p>While we have optimized our design, ordering and manufacturing processes, we have little to no control over 
      carrier shipping times and potential delays related to customs clearance, weather, or force majeure. We use our 
      best efforts to initiate shipment and meet scheduled delivery dates <u>but cannot guarantee the actual
       delivery date of your order.</u></p>`
  },
  howLongDescBatch: {
    id: 'screens.StoreFrontContent.howLongDescBatch',
    defaultMessage:
      `<p>Estimated delivery times for all orders are displayed on the Team Store page (right side) and during 
      checkout. Final delivery date will be set at the close of the ordering period. Orders will enter the production 
      process upon receipt and review and typically ship out within 10-12 days from receipt. In the case of large 
      volume orders exceeding 100 pieces, delivery times may be slightly longer. Contact our staff to confirm the 
      delivery time of your order, if it exceeds 100 pieces.</p>
      <p>While we have optimized our design, ordering and manufacturing processes, we have little to no control over 
      carrier shipping times and potential delays related to customs clearance, weather, or force majeure. We use our 
      best efforts to initiate shipment and meet scheduled delivery dates but cannot guarantee the actual delivery date 
      of your order.</p>
      `
  },
  canIORder: {
    id: 'screens.StoreFrontContent.canIORder',
    defaultMessage: 'My Team Store is CLOSED. How do I order?'
  },
  canIORderDesc: {
    id: 'screens.StoreFrontContent.canIORderDesc',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>If your Team Store is closed, you can contact the Team Store Manager and request it to be reopened. You can use the message box at the top of the Team Store page to contact the person, or directly if you have their contact information.</p>'
  },
  canIORderDescBatch: {
    id: 'screens.StoreFrontContent.canIORderDescBatch',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>If your Team Store is closed, you can contact the Team Store Manager and request it to be reopened. You can use the message box at the top of the Team Store page to contact the person, or directly if you have their contact information.</p>'
  },
  returnMessage: {
    id: 'screens.StoreFrontContent.returnMessage',
    defaultMessage: 'Can I return or exchange my product?'
  },
  returnMessageDesc: {
    id: 'screens.StoreFrontContent.returnMessageDesc',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'All Jakroo products are covered by a limited 1 year manufacturer warranty covering defects in materials and workmanship. This warranty does not cover normal wear and tear. All custom products are made-to-order on demand and thus not returnable for reasons other than manufacturer defect. All retail collection items (non-customized) are returnable for a full refund or exchange, provided that the products are unworn and accompanied by the receipt. With our size exchange program, however, you have the option to keep your original item and order a different size at a cost of 50% of the original item price. Contact our customer service team for more details about warranty and exchange policy.'
  },
  share: {
    id: 'screens.StoreFrontContent.share',
    defaultMessage: 'Share'
  },
  edit: {
    id: 'screens.StoreFrontContent.edit',
    defaultMessage: 'Edit'
  },
  cutOff: {
    id: 'screens.StoreFrontContent.cutOff',
    defaultMessage: 'Cut-off date'
  },
  estimatedArrival: {
    id: 'screens.StoreFrontContent.estimatedArrival',
    defaultMessage: 'Estimated arrival'
  },
  shareModalTitle: {
    id: 'screen.StoreFrontContent.shareModalTitle',
    defaultMessage: 'SHARE YOUR TEAMSTORE!'
  },
  contactManager: {
    id: 'screen.StoreFrontContent.contactManager',
    defaultMessage: 'Contact store manager'
  },
  invalidPass: {
    id: 'screen.StoreFrontContent.invalidPass',
    defaultMessage: 'Invalid passcode value.'
  },
  passcodeNeeded: {
    id: 'screen.StoreFrontContent.passcodeNeeded',
    defaultMessage: 'Passcode needed.'
  },
  targetPrice: {
    id: 'screen.StoreFrontContent.targetPrice',
    defaultMessage: 'Target Price'
  },
  quantityPrice: {
    id: 'screen.StoreFrontContent.quantityPrice',
    defaultMessage: 'Quantity Price Schedule'
  },
  orderNow: {
    id: 'screen.StoreFrontContent.orderNow',
    defaultMessage: 'Order today and receive by {deliveryMonth} {dayOrdinal}'
  }
})
