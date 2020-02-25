/**
 * CreateStore -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'screens.CreateStore.title',
    defaultMessage: 'Let’s build your team store!'
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
  priceDropMessageP1: {
    id: 'screens.CreateStore.priceDropMessageP1',
    defaultMessage: 'With JAKROO’s Dynamic Price Drop, everybody wins!'
  },
  priceDropMessageP2: {
    id: 'screens.CreateStore.priceDropMessageP2',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'The starting discount level for all team members is 20%. As team members place their orders and reach the next quantity discount level, the price automatically drops for everyone, even for those who placed their order before the price drop.'
  },
  priceDropMessageP3: {
    id: 'screens.CreateStore.priceDropMessageP3',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'Final Pricing for all items will be based on the highest discount level achieved for one item. Payment is processed after the close of the order period so everybody receives the same low price, regardless of when your order was placed. Yes, it’s that cool!'
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
    defaultMessage: 'ADD ITEM'
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
  bulletinPlaceholder: {
    id: 'screens.CreateStore.bulletinPlaceholder',
    defaultMessage: 'Type your bulletin message...'
  },
  optional: {
    id: 'screens.CreateStore.optional',
    defaultMessage: 'Optional'
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
  }
})
