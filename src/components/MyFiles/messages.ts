/**
 * MyFiles -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.MyFiles.tittle',
    defaultMessage: 'MyFiles'
  },
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
  emptyImages: {
    id: 'components.MyFiles.emptyImages',
    defaultMessage: 'No images, yet'
  }
})
