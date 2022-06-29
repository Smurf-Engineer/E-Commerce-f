/**
 * MyAddresses -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.MyAddresses.tittle',
    defaultMessage: 'MyAddresses',
  },
  addAddress: {
    id: 'components.MyAddresses.addAddress',
    defaultMessage: '+ ADD ADDRESS',
  },
  modalTitle: {
    id: 'components.MyAddresses.modalTitle',
    defaultMessage: 'Shipping Address',
  },
  defaultShippingAddress: {
    id: 'components.MyAddresses.defaultShippingAddress',
    defaultMessage: 'Make default shipping address',
  },
  defaultBillingAddress: {
    id: 'components.MyAddresses.defaultBillingAddress',
    defaultMessage: 'Make default billing address',
  },
  saveAddress: {
    id: 'components.MyAddresses.saveAddress',
    defaultMessage: 'Save',
  },
  invalidCity: {
    id: 'components.MyAddresses.invalidCity',
    defaultMessage: 'Enter a valid city name',
  },
  invalidZip: {
    id: 'components.MyAddresses.invalidZip',
    defaultMessage: 'Enter a valid ZIP Code',
  },
  invalidPhone: {
    id: 'components.MyAddresses.invalidPhone',
    defaultMessage:
      'Phone number must be at least {phone_length} characters including the country code',
  },
})
