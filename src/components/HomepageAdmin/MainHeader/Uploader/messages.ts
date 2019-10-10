/**
 * SecondaryHeader -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  imageSizeError: {
    id: 'components.SecondaryHeader.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.SecondaryHeader.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an jpg, jpeg or png'
  },
  clickToUpload: {
    id: 'components.SecondaryHeader.clickToUpload',
    defaultMessage: '{type} {index}'
  },
  clickToUploadMobile: {
    id: 'components.SecondaryHeader.clickToUpload',
    defaultMessage: 'Mobile {index}'
  },
  destinationUrl: {
    id: 'components.SecondaryHeader.destinationUrl',
    defaultMessage: 'Destination URL'
  },
  jakrooUrl: {
    id: 'components.SecondaryHeader.jakrooUrl',
    defaultMessage: 'http://designlab.jakroo.com/'
  },
  saveChanges: {
    id: 'components.SecondaryHeader.saveChanges',
    defaultMessage: 'Save Changes'
  }
})
