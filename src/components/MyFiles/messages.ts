/**
 * MyFiles -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  message: {
    id: 'components.MyFiles.message',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'These are the design assets that you have created or uploaded. You will be able to access them from within the design application, after selecting a product.'
  },
  myPalettes: {
    id: 'components.MyFiles.myPalettes',
    defaultMessage: 'My Palettes'
  },
  uploadedImages: {
    id: 'components.MyFiles.uploadedImages',
    defaultMessage: 'Uploaded Files'
  },
  modalTitle: {
    id: 'components.MyFiles.modalTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  paletteMessage: {
    id: 'components.MyFiles.paletteMessage',
    defaultMessage: `You're about to delete this palette`
  },
  imageMessage: {
    id: 'components.MyFiles.imageMessage',
    defaultMessage: `You're about to delete this image`
  }
})
