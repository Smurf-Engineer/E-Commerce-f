/**
 * MainHeader -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  imageSizeError: {
    id: 'components.MainHeader.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.MainHeader.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an jpg, jpeg or png'
  },
  clickToUpload: {
    id: 'components.MainHeader.clickToUpload',
    defaultMessage: '{type} {index}'
  },
  clickToUploadMobile: {
    id: 'components.MainHeader.clickToUploadMobile',
    defaultMessage: 'Mobile {index}'
  },
  destinationUrl: {
    id: 'components.MainHeader.destinationUrl',
    defaultMessage: 'Destination URL'
  },
  jakrooUrl: {
    id: 'components.MainHeader.jakrooUrl',
    defaultMessage: 'http://designlab.jakroo.com/'
  },
  saveChanges: {
    id: 'components.MainHeader.saveChanges',
    defaultMessage: 'Save Changes'
  }
})
