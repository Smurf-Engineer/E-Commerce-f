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
  processing: {
    id: 'screens.Checkout.processing',
    defaultMessage: 'Processing order...'
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
  shipTopPoApoLabel: {
    id: 'components.Checkout.shipTopPoApoLabel',
    defaultMessage: 'We do not ship to APO and PO Boxes'
  },
  areYouSure: {
    id: 'screens.Checkout.areYouSure',
    defaultMessage: 'ARE YOU SURE?'
  },
  proceed: {
    id: 'screens.Checkout.proceed',
    defaultMessage: 'Proceed'
  },
  phoneError: {
    id: 'screens.Checkout.phoneError',
    defaultMessage: 'Phone number must be at least 11 characters including the country code'
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
  batchInfo: {
    id: 'screens.Checkout.batchInfo',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Your order has been submitted and is processing. <br /> This may take a few moments due to the quantity of orders being processed. <br /> Your order will show in your <strong>Order History</strong> within a few minutes.'
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
  },
  invalidCity: {
    id: 'screens.Checkout.invalidCity',
    defaultMessage: 'Enter a valid city name'
  },
  invalidZip: {
    id: 'screens.Checkout.invalidZip',
    defaultMessage: 'Enter a valid ZIP Code'
  },
  goToHome: {
    id: 'screens.Checkout.goToHome',
    defaultMessage: 'Back to home page'
  }
})
