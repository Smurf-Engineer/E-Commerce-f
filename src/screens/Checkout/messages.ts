/**
 * Checkout -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'screens.Checkout.tittle',
    defaultMessage: 'Checkout'
  },
  continueButtonLabel: {
    id: 'screens.Checkout.continueButtonLabel',
    defaultMessage: 'Continue'
  },
  confirm: {
    id: 'screens.Checkout.confirm',
    defaultMessage: 'Confirm'
  },
  correctCurrency: {
    id: 'screens.Checkout.correctCurrency',
    defaultMessage:
      'Your selected Currency is {currentCurrency}. Is this the currency you wish to proceed?'
  },
  errorSavingCart: {
    id: 'screens.Checkout.errorSavingCart',
    defaultMessage: 'Error trying to save card information'
  },
  areYouSure: {
    id: 'screens.Checkout.areYouSure',
    defaultMessage: 'ARE YOU SURE?'
  },
  gotIt: {
    id: 'screens.Checkout.gotIt',
    defaultMessage: 'Got it!'
  },
  infoOrder: {
    id: 'screens.Checkout.infoOrder',
    defaultMessage: `<p>In order to provide the world's fastest delivery times, orders enter the production
    stage immediately upon receipt. All orders are custom made to order and <b>cannot be changed</b> once
    the order enters production.</p>
    <p>Prior to placing your order, please be sure to double check the following:</p>`
  },
  shippingBilling: {
    id: 'screens.Checkout.shippingBilling',
    defaultMessage: 'Shipping and Billing Address'
  },
  itemQuantities: {
    id: 'screens.Checkout.itemQuantities',
    defaultMessage: 'Item quantities'
  },
  itemSizes: {
    id: 'screens.Checkout.itemSizes',
    defaultMessage: 'Item sizes, genders, fit styles (where applicable)'
  },
})
