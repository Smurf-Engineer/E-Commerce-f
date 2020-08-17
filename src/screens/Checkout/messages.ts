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
  paymentError: {
    id: 'screens.Checkout.paymentError',
    defaultMessage: 'You cannot use this credit card. Please check with your credit card company for details.'
  }
})
