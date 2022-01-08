/**
 * Shippping -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.Shippping.tittle',
    defaultMessage: 'Shipping Address'
  },
  seeAllAddressesLabel: {
    id: 'components.Shippping.seeAllAddressesLabel',
    defaultMessage: 'See All'
  },
  saveAddress: {
    id: 'components.Shippping.saveAddress',
    defaultMessage: 'Save'
  },
  invalidCity: {
    id: 'components.Shippping.invalidCity',
    defaultMessage: 'Enter a valid city name'
  },
  invalidZip: {
    id: 'components.Shippping.invalidZip',
    defaultMessage: 'Enter a valid ZIP Code'
  },
  invalidPhone: {
    id: 'components.Shippping.invalidPhone',
    defaultMessage: 'Phone number must be at least 11 characters including the country code'
  }
})
