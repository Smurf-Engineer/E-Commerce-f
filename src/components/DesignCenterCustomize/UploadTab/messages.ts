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
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.UploadTab.imageExtensionError',
    defaultMessage:
      'Oh no! Your file has to be an eps, pdf, ai, svg, jpg, jpeg, png, gif, tif, tiff, bmp or psd'
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
  },
  login: {
    id: 'components.UploadTab.login',
    defaultMessage: `Log in / Sign up`
  },
  uploadFile: {
    id: 'components.UploadTab.uploadFile',
    defaultMessage: `+ UPLOAD FILE`
  },
  uploadLayers: {
    id: 'components.UploadTab.uploadLayers',
    defaultMessage: `Upload Layers`
  },
  edit: {
    id: 'components.UploadTab.edit',
    defaultMessage: `Edit`
  },
  delete: {
    id: 'components.UploadTab.delete',
    defaultMessage: `Delete`
  },
  empty: {
    id: 'components.UploadTab.empty',
    defaultMessage: `Here are going to appear your upload layers on your design.
    Add your first Upload layer.`
  }
})
