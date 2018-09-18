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
  },
  recommendationTitle: {
    id: 'components.UploadTab.recommendationTitle',
    defaultMessage: 'Jakroo Recommends'
  },
  recommendationMessage: {
    id: 'components.UploadTab.recommendationMessage',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'For best results upload .eps, .ai, .svg or .pdf files. Vector files will scale larger without loss resolution or clarity. You can also upload .jpg, .png, .tiff, .gif, and .bmp files. However, these file types are raster graphics. Raster graphics file has a maximum size. Scaling beyond the maximum size will result in pixelation and blurriness of the images.'
  },
  loginMessage: {
    id: 'components.UploadTab.loginMessage',
    defaultMessage: 'Log in to upload an image'
  },
  confirmTitle: {
    id: 'components.MyFiles.modalTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  confirmMessage: {
    id: 'components.MyFiles.imageMessage',
    defaultMessage: `You're about to delete this image`
  }
})