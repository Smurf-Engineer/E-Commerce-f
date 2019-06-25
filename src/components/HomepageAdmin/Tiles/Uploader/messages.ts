/**
 * Uploader -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  imageSizeError: {
    id: 'components.Uploader.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.Uploader.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an jpg, jpeg or png'
  },
  productTile: {
    id: 'components.Uploader.clickToUpload',
    defaultMessage: ' Product tile {index}'
  },
  title: {
    id: 'components.Uploader.title',
    defaultMessage: 'Title'
  },
  contentTile: {
    id: 'components.Uploader.contentTile',
    defaultMessage: 'Content tile'
  }
})
