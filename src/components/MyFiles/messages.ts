/**
 * MyFiles -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  message: {
    id: 'components.MyFiles.message',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'These are the assets that you have used in your designs. You will be able to use it and edit them in our design app.'
  },
  myPalettes: {
    id: 'components.MyFiles.myPalettes',
    defaultMessage: 'My Palettes'
  },
  uploadedImages: {
    id: 'components.MyFiles.uploadedImages',
    defaultMessage: 'Uploaded Images'
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
