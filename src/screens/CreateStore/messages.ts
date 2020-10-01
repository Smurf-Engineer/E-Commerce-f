/**
 * CreateStore -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'screens.CreateStore.title',
    defaultMessage: 'Let’s build your team store!'
  },
  buildCustom: {
    id: 'screens.CreateStore.buildCustom',
    defaultMessage: 'Let’s build your custom store!'
  },
  teamSizeTitle: {
    id: 'screens.CreateStore.teamSizeTitle',
    defaultMessage: 'Estimated Team Size'
  },
  teamSizeMessage: {
    id: 'screens.CreateStore.teamSizeMessage',
    defaultMessage:
      'Select estimated size of your team to display the estimated (target) pricing for each item.'
  },
  passFormat: {
    id: 'screens.CreateStore.passFormat',
    defaultMessage: `Access codes must be between 4-10 characters and can only contain numbers and letters and 
      are not case sensitive and cannot contain special characters (#+&@)`
  },
  priceDropTitle: {
    id: 'screens.CreateStore.priceDropTitle',
    defaultMessage: 'DYNAMIC PRICE DROP'
  },
  passcode: {
    id: 'screens.CreateStore.passcode',
    defaultMessage: 'Access Code'
  },
  onDemandTeamStore: {
    id: 'screens.CreateStore.onDemandTeamStore',
    defaultMessage: 'On-Demand Team Stores'
  },
  pricingCheckout: {
    id: 'screens.CreateStore.pricingCheckout',
    defaultMessage: 'PRICING & CHECKOUT'
  },
  percent: {
    id: 'screens.CreateStore.percent',
    defaultMessage: 'save 20% on their order'
  },
  pricingCheckoutContent: {
    id: 'screens.CreateStore.pricingCheckoutContent',
    defaultMessage: `With {onDemandTeam}, default pricing is fixed and all members
    {discount}, regardless of the quantity ordered. 
    Additional discounts may be available through seasonal promotional offers.
    Each member will be able to individually place their order and checkout using their preferred payment method. 
    Orders are shipped directly to the member’s designated shipping address.`
  },
  orderDays: {
    id: 'screens.CreateStore.orderDays',
    defaultMessage: '10 days'
  },
  shippingCompany: {
    id: 'screens.CreateStore.shippingCompany',
    defaultMessage: 'Fedex International Priority'
  },
  signature: {
    id: 'screens.CreateStore.signature',
    defaultMessage: 'signature required'
  },
  productionDeliveryContent: {
    id: 'screens.CreateStore.productionDeliveryContent',
    defaultMessage: `Each order is treated individually and enters the production process upon receipt. 
    Delivery to your designated address is typically within {orderDays} days of order placement 
    (excluding Federal Holidays and weekends).
    For the security of your order, all orders are shipped via {shippingCompany} with signature required.
    In some cases, when products are shipped from multiple facilities, a secondary carrier such as UPS may be used.
    Members will receive a shipping notification once their order is picked up by the shipping carrier.`
  },
  productionDelivery: {
    id: 'screens.CreateStore.productionDelivery',
    defaultMessage: 'PRODUCTION & DELIVERY'
  },
  priceDropMessage: {
    id: 'screens.CreateStore.priceDropMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>With JAKROO’s Dynamic Price Drop, everyone wins!</p> <p>The starting discount level for all team members is 20%.  As team members place their orders and reach the next discount level, <strong>the price automatically drops for everyone, even for those who placed their order before the drop.</strong></p> <p>Final pricing for each item will be based on the highest discount level achieved for that item. Payment is processed after the close of the order period so <strong>everyone receives the same low price, regardless of when your order was placed.</strong> Yes, its that cool!</p>'
  },
  priceDropReseller: {
    id: 'screens.CreateStore.priceDropReseller',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      '<p>With on-demand Direct Fulfilment stores, you are able to set your preferred selling price for each item. Default reseller margin is set at 20% off the MSRP. However, you can increase your profit by increasing the selling price.</p><p>Each member will be able to individually place their order and checkout using their preferred payment method from the available payment options. All transaction fees and any applicable custom duties are covered by Jakroo.</p>'
  },
  deliveryReseller: {
    id: 'screens.CreateStore.deliveryReseller',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'Direct Fulfillment store orders are produced on demand upon receipt of order and typically ship direct to the customer within 7-12 days of receipt (excluding Federal holidays). Estimated delivery times are displayed on the store page and in the order confirmation email. Delivery times may occasionally vary due to periodic shipping carrier or production facility closures. We use our best efforts to initiate shipment and meet scheduled delivery dates but cannot guarantee the actual delivery date of the order. For security reasons, all orders are shipped via Fedex International Priority with signature required. In some cases, when products are shipped from multiple facilities, a secondary carrier such as UPS may be used. Customers will receive a shipping notification once their order is picked up by the shipping carrier.'
  },
  storeItemsTitle: {
    id: 'screens.CreateStore.storeItemsTitle',
    defaultMessage: 'Add Store Items'
  },
  storeItemsMessage: {
    id: 'screens.CreateStore.storeItemsMessage',
    defaultMessage: 'Select designs from your Locker'
  },
  addItem: {
    id: 'screens.CreateStore.addItem',
    defaultMessage: '+ ADD ITEM'
  },
  bannerMessage: {
    id: 'screens.CreateStore.bannerMessage',
    defaultMessage: 'Add a header banner to your store'
  },
  bulletin: {
    id: 'screens.CreateStore.bulletin',
    defaultMessage:
      'Add a Bulletin or Important Message for your Team to see on the stores page'
  },
  bulletinStore: {
    id: 'screens.CreateStore.bulletinStore',
    defaultMessage:
      'Add a bulletin or important message for your customers to see on the store page'
  },
  bulletinPlaceholder: {
    id: 'screens.CreateStore.bulletinPlaceholder',
    defaultMessage: 'Type your bulletin message...'
  },
  optional: {
    id: 'screens.CreateStore.optional',
    defaultMessage: '(Optional)'
  },
  privateLabel: {
    id: 'screens.CreateStore.privateLabel',
    defaultMessage: 'Make your store private'
  },
  privateMessage: {
    id: 'screens.CreateStore.privateMessage',
    defaultMessage:
      'Making your store private will allow ONLY people with the direct link and access code to view the store.'
  },
  onDemandLabel: {
    id: 'screens.CreateStore.onDemandLabel',
    defaultMessage: '14 Day On-Demand Mode'
  },
  onDemandMessage: {
    id: 'screens.CreateStore.onDemandMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'On-Demand Mode is  available ONLY after initial ordering has been completed. Existing new members will be able to place fill-in orders anytime  and receive within 14 days or order placement. '
  },
  buttonBuild: {
    id: 'screens.CreateStore.buttonBuild',
    defaultMessage: 'Build Team Store'
  },
  buttonSave: {
    id: 'screens.CreateStore.buttonSave',
    defaultMessage: 'Save Changes'
  },
  requiredFieldLabel: {
    id: 'components.StoreForm.requiredFieldLabel',
    defaultMessage: 'This field is required or has invalid value'
  },
  changeLabel: {
    id: 'components.StoreForm.changeLabel',
    defaultMessage: 'Edit'
  },
  deleteLabel: {
    id: 'componentes.StoreForm.deleteLabel',
    defaultMessage: 'Delete'
  },
  save: {
    id: 'componentes.StoreForm.save',
    defaultMessage: 'Save Changes'
  },
  cancel: {
    id: 'componentes.StoreForm.cancel',
    defaultMessage: 'Cancel'
  },
  emptyList: {
    id: 'componentes.StoreForm.emptyList',
    defaultMessage: 'You need to add items to your store!'
  },
  gotIt: {
    id: 'components.StoreForm.gotIt',
    defaultMessage: 'Got it!'
  },
  batchOrderTitle: {
    id: 'components.StoreForm.batchOrderTitle',
    defaultMessage: 'Batch Order Mode'
  },
  batchOrderContent: {
    id: 'components.StoreForm.batchOrderContent',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'Batch Order stores are ideal for groups with <b>more than 5 members</b>. When you switch your store to Batch Order Mode, you set up a specific ordering window for the team to place their orders and pricing for all items becomes dynamic. Members can save between 20-40% based on the quantity ordered. Payment is taken at the end of the order period and the estimated delivery is 14 days.'
  },
  switchToBatch: {
    id: 'components.StoreForm.switchToBatch',
    defaultMessage: 'Switch to Batch Order Mode'
  },
  onDemandTitle: {
    id: 'components.StoreForm.onDemandTitle',
    defaultMessage: 'On-Demand Store Mode'
  },
  omDemandContent: {
    id: 'components.StoreForm.omDemandContent',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'When you set your store to On-Demand mode, pricing for all items is fixed and members save 20%. Payment is taken at the time the order is placed. Orders enter the production process upon receipt and are delivered in 10 days.'
  },
  switchToDemand: {
    id: 'components.StoreForm.switchToDemand',
    defaultMessage: 'Switch to On-Demand Mode'
  },
  editDatesTitle: {
    id: 'components.StoreForm.editDatesTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  editDatesMessage: {
    id: 'components.StoreForm.editDatesMessage',
    defaultMessage:
      'You have selected {cutOff} date for the order cut-off and {delivery} for the delivery date.'
  },
  proceed: {
    id: 'components.StoreForm.proceed',
    defaultMessage: 'Yes, proceed.'
  }
})
