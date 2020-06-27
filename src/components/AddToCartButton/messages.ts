/**
 * AddToCartButton -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  validationMessage: {
    id: 'components.addToCartButton.validationMessage',
    defaultMessage: 'Please select gender, color, size and fit style!'
  },
  validationMessageProdPage: {
    id: 'components.addToCartButton.validationMessageProdPage',
    defaultMessage: 'Please select gender, size and fit style!'
  },
  successfulAddMessage: {
    id: 'components.addToCartButton.successfulAddMessage',
    defaultMessage: '{name} has been successfully added to cart!'
  },
  cantMix: {
    id: 'components.addToCartButton.cantMix',
    defaultMessage: `Can't mix teamstore design with one from the locker`
  }
})
