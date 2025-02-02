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
    defaultMessage: 'VIEW MORE COLOR COMBOS'
  },
  addedToCart: {
    id: 'screens.DesignCenter.addedToCart',
    defaultMessage: '"{productName}" added to cart'
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
    defaultMessage: 'TO CONTINUE…'
  },
  unsupportedDeviceContent: {
    id: 'screens.DesignCenter.unsupportedDeviceContent',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'For the best 3D design experience adding text and logos, please return on a device with a larger screen such as a laptop or desktop computer.'
  },
  unsupportedDeviceButton: {
    id: 'screens.DesignCenter.unsupportedDeviceButton',
    defaultMessage: 'Got it!'
  },
  errorMessage: {
    id: 'components.withError.error',
    defaultMessage: 'Something went wrong'
  },
  landscapeMessage: {
    id: 'screens.DesignCenter.landscapeMessage',
    defaultMessage:
      'Our design center is optimized for landscape mode, please rotate your device.'
  },
  colorChartRequestFailed: {
    id: 'screens.DesignCenter.colorChartRequestFailed',
    defaultMessage: 'Error requesting chart, please try again.'
  },
  loggedError: {
    id: 'screens.DesignCenter.loggedError',
    defaultMessage: 'You must be logged in.'
  }
})
