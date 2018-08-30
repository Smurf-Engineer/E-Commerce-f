/**
 * DesignCenter -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'screens.DesignCenter.title',
    defaultMessage: 'DesignCenter'
  },
  inspirationTtitle: {
    id: 'screens.DesignCenter.inspirationTtitle',
    defaultMessage: 'Inspiration'
  },
  addedToCart: {
    id: 'screens.DesignCenter.addedToCart',
    defaultMessage: '"{designName}" added to cart'
  },
  addedToStore: {
    id: 'screens.DesignCenter.addedToStore',
    defaultMessage: '"{designName}" added to "{storeName}"'
  },
  outWithoutSaveModalTitle: {
    id: 'screens.DesignCenter.outWithoutSaveModalTitle',
    defaultMessage: 'SAVE CURRENT DESIGN'
  },
  outWithoutSaveDesignModalMessage: {
    id: 'screens.DesignCenter.outWithoutSaveDesignModalMessage',
    defaultMessage:
      'The design you are working on is not saved yet. Would you like to save it to your locker?'
  },
  outWithoutSaveDesignModalCancel: {
    id: 'screens.DesignCenter.outWithoutSaveDesignModalCancel',
    defaultMessage: 'Cancel'
  },
  outWithoutSaveDesignModalDontSave: {
    id: 'screens.DesignCenter.outWithoutSaveDesignModalDontSave',
    defaultMessage: `Don't Save`
  },
  outWithoutSaveDesignModalSave: {
    id: 'screens.DesignCenter.outWithoutSaveDesignModalSave',
    defaultMessage: 'Save'
  },
  unsupportedDeviceTitle: {
    id: 'screens.DesignCenter.unsupportedDeviceTitle',
    defaultMessage: 'UNSUPPORTED DEVICE'
  },
  unsupportedDeviceContent: {
    id: 'screens.DesignCenter.unsupportedDeviceContent',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'To start customizing this product, you have to be on a device with a larger screen such as tablet or a desktop computer.'
  },
  unsupportedDeviceButton: {
    id: 'screens.DesignCenter.unsupportedDeviceButton',
    defaultMessage: 'Got it!'
  },
  errorMessage: {
    id: 'components.withError.error',
    defaultMessage: 'Something went wrong'
  }
})
