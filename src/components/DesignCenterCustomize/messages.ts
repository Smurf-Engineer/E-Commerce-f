/**
 * DesignCenterCustomize -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  invalidUser: {
    id: 'components.DesignCenterCustomize.invalidUser',
    defaultMessage: 'You must be logged in to save designs.'
  },
  addArt: {
    id: 'screens.DesignCenterCustomize.addArt',
    defaultMessage: 'Add art'
  },
  save: {
    id: 'screens.DesignCenterCustomize.save',
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
  }
})
