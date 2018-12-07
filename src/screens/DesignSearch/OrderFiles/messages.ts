/**
 * OrderFiles -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  status: {
    id: 'components.OrderFiles.status',
    defaultMessage: 'Status: '
  },
  assets: {
    id: 'components.OrderFiles.assets',
    defaultMessage: 'Assets'
  },
  downloadAll: {
    id: 'components.OrderFiles.downloadAll',
    defaultMessage: 'Download All Files'
  },
  uploadDesign: {
    id: 'components.OrderFiles.uploadDesign',
    defaultMessage: 'Upload Pro Design SVG'
  },
  imageSizeError: {
    id: 'components.OrderFiles.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.OrderFiles.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an svg'
  }
})
