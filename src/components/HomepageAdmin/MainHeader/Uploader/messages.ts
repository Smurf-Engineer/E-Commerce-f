/**
 * Uploader -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  imageSizeError: {
    id: 'components.MainHeader.Uploader.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.MainHeader.Uploader.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an jpg, jpeg or png'
  },
  videoExtensionError: {
    id: 'components.MainHeader.Uploader.videoExtensionError',
    defaultMessage: 'Oh no! Your file has to be a mp4'
  },
  clickToUpload: {
    id: 'components.MainHeader.Uploader.clickToUpload',
    defaultMessage: '{type} {index}'
  },
  clickToUploadMobile: {
    id: 'components.MainHeader.Uploader.clickToUpload',
    defaultMessage: 'Mobile {index}'
  },
  destinationUrl: {
    id: 'components.MainHeader.Uploader.destinationUrl',
    defaultMessage: 'Destination URL'
  },
  jakrooUrl: {
    id: 'components.MainHeader.Uploader.jakrooUrl',
    defaultMessage: 'http://designlab.jakroo.com/'
  },
  saveChanges: {
    id: 'components.MainHeader.Uploader.saveChanges',
    defaultMessage: 'Save Changes'
  }
})
