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
  },
  name: {
    id: 'components.addToCartButton.name',
    defaultMessage: `Hi {name}`
  },
  resellerPrompt: {
    id: 'components.addToCartButton.resellerPrompt',
    // tslint:disable-next-line: max-line-length
    defaultMessage: `It looks like are you are trying to purchase items from one of your own DirectShip Stores. Please add those items from your Locker to take advantage of your reseller pricing!`
  },
  goToLocker: {
    id: 'components.addToCartButton.goToLocker',
    defaultMessage: `Go to Locker`
  },
  proceed: {
    id: 'components.addToCartButton.proceed',
    defaultMessage: `Proceed as is`
  },
})
