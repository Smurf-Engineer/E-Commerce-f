/**
 * Payment -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  paymentMethod: {
    id: 'components.Payment.paymentMethod',
    defaultMessage: 'Payment Method'
  },
  methodCreditCard: {
    id: 'components.Payment.methodCreditCard',
    defaultMessage: 'Credit Card'
  },
  methodPaypal: {
    id: 'components.Payment.methodPaypal',
    defaultMessage: 'Paypal'
  },
  invoice: {
    id: 'components.Payment.invoice',
    defaultMessage: 'Invoice'
  },
  reference: {
    id: 'components.Payment.reference',
    defaultMessage: 'Reference number'
  },
  referencesPlaceholder: {
    id: 'components.Payment.referencesPlaceholder',
    defaultMessage: '1234567'
  },
  paymentTerms: {
    id: 'components.Payment.paymentTerms',
    defaultMessage: 'Payment Terms:'
  },
  paymentInfo: {
    id: 'components.Payment.paymentInfo',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Payment for orders will be due in full prior to shipment unless otherwise stated on your order terms and conditions.'
  },
  methodBankTransfer: {
    id: 'components.Payment.methodBankTransfer',
    defaultMessage: 'Bank Transfer'
  }
})
