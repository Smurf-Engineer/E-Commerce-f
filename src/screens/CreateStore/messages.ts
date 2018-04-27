/**
 * CreateStore -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'screens.CreateStore.title',
    defaultMessage: 'Let’s build a team store!'
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
    defaultMessage: 'Add a banner for your store'
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
      'Making the store private will allow people with direct link and access code to view your store.'
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
    defaultMessage: 'Change'
  },
  deleteLabel: {
    id: 'componentes.StoreForm.deleteLabel',
    defaultMessage: 'Delete'
  }
})
