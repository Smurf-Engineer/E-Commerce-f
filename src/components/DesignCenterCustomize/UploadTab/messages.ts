/**
 * UploadTab -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.UploadTab.title',
    defaultMessage: 'Upload Logo and Images'
  },
  imageSizeError: {
    id: 'components.UploadTab.imageSizeError',
    defaultMessage: 'Oh no! Your image has to be Max. 20mb'
  },
  imageExtensionError: {
    id: 'components.UploadTab.imageExtensionError',
    defaultMessage:
      'Oh no! Your file has to be in eps, pdf, ai, svg, jpg, jpeg, png, gif, tif, tiff, bmp or psd'
  }
})
