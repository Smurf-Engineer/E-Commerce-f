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
    Orders are shipped directly to the member’s assignated shipping address.`
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
    defaultMessage: `Each order is treated individually and enters the production process upon receip. 
    Delivery is within {orderDays} of order placement (excluding Federal Holidays and weekends).
    All orders are shipped via {shippingCompany} with {signature} for the security of your order. 
    In some cases, an alternative carrier such as UPS may be used, based on the shipping address. Members will receive 
    a shipping notification once their order is picked up by the shipping carrier.`
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
      'As team members place their orders and reach the next discount level, the price automatically drops for everyone, even for those who placed their order before the drop.'
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
  stock: {
    id: 'screens.CreateStore.stock',
    defaultMessage: 'Let’s organize your stock'
  },
  bannerMessage: {
    id: 'screens.CreateStore.bannerMessage',
    defaultMessage: 'Add a header banner to your store'
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
    defaultMessage: 'This field is required'
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
    defaultMessage: 'Save'
  },
  cancel: {
    id: 'componentes.StoreForm.cancel',
    defaultMessage: 'Cancel'
  }
})
