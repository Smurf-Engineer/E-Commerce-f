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
  warningQuantity: {
    id: 'screens.Checkout.warningQuantity',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'This may take time due the quantity of orders already placed, Please be patient (Verify your order history for more info)'
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
  proceed: {
    id: 'screens.Checkout.proceed',
    defaultMessage: 'Proceed'
  },
  goBack: {
    id: 'screens.Checkout.goBack',
    defaultMessage: 'Go Back'
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
  paymentError: {
    id: 'screens.Checkout.paymentError',
    defaultMessage: 'You cannot use this credit card. Please check with your credit card company for details.'
  }
})
