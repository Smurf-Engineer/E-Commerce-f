/**
 * Uploader -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  imageSizeError: {
    id: 'components.CarouselHeader.Uploader.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.CarouselHeader.Uploader.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an jpg, jpeg or png'
  },
  videoExtensionError: {
    id: 'components.CarouselHeader.Uploader.videoExtensionError',
    defaultMessage: 'Oh no! Your file has to be a mp4'
  },
  clickToUpload: {
    id: 'components.CarouselHeader.Uploader.clickToUpload',
    defaultMessage: '{type} {index}'
  },
  clickToUploadMobile: {
    id: 'components.CarouselHeader.Uploader.clickToUploadMobile',
    defaultMessage: 'Mobile {index}'
  },
  destinationUrl: {
    id: 'components.CarouselHeader.Uploader.destinationUrl',
    defaultMessage: 'Destination URL'
  },
  jakrooUrl: {
    id: 'components.CarouselHeader.Uploader.jakrooUrl',
    defaultMessage: 'http://jakroo.com/'
  },
  saveChanges: {
    id: 'components.CarouselHeader.Uploader.saveChanges',
    defaultMessage: '{type} {index}'
  }
})
