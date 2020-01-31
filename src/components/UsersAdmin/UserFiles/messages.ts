/**
 * UserFiles -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  addFiles: {
    id: 'components.UserdsAdmin.UserFiles.addFiles',
    defaultMessage: 'Add Files'
  },
  userFiles: {
    id: 'components.UserdsAdmin.UserFiles.userFiles',
    defaultMessage: '{userName} Files'
  },
  confirmTitle: {
    id: 'components.UserdsAdmin.UserFiles.modalTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  confirmMessage: {
    id: 'components.UserdsAdmin.UserFiles.imageMessage',
    defaultMessage: `You're about to delete this image`
  },
  imageSizeError: {
    id: 'components.UserdsAdmin.UserFiles.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.UserdsAdmin.UserFiles.imageExtensionError',
    defaultMessage:
      'Oh no! Your file has to be an eps, pdf, ai, svg, jpg, jpeg, png, gif, tif, tiff, bmp or psd'
  }
})
