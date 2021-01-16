/**
 * MyFiles -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  message: {
    id: 'components.MyFiles.message',
    defaultMessage:
      // tslint:disable-next-line:max-line-length
      'These are the design assets that you have created or uploaded. You will be able to access them from within the design application, after selecting a product.'
  },
  myPalettes: {
    id: 'components.MyFiles.myPalettes',
    defaultMessage: 'My Palettes'
  },
  uploadedImages: {
    id: 'components.MyFiles.uploadedImages',
    defaultMessage: 'Uploaded Files'
  },
  modalTitle: {
    id: 'components.MyFiles.modalTitle',
    defaultMessage: 'ARE YOU SURE?'
  },
  paletteMessage: {
    id: 'components.MyFiles.paletteMessage',
    defaultMessage: `You're about to delete this palette`
  },
  imageMessage: {
    id: 'components.MyFiles.imageMessage',
    defaultMessage: `You're about to delete this image`
  },
  recommendationTitle: {
    id: 'components.MyFiles.recommendationTitle',
    defaultMessage: 'Jakroo Recommends'
  },
  recommendationMessage: {
    id: 'components.MyFiles.recommendationMessage',
      // tslint:disable-next-line:max-line-length
    defaultMessage: 'For best results upload .eps, .ai, .svg or .pdf files. Vector files will scale larger without loss resolution or clarity. You can also upload .jpg, .png, .tiff, .gif, and .bmp files. However, these file types are raster graphics. Raster graphics file has a maximum size. Scaling beyond the maximum size will result in pixelation and blurriness of the images.'
  },
  imageSizeError: {
    id: 'components.MyFiles.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageCmError: {
    id: 'components.MyFiles.imageCmError',
    defaultMessage: 'Oh no! Image size is limited to 25x25cm'
  },
  imageExtensionError: {
    id: 'components.MyFiles.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an eps, pdf, ai, svg, jpg, jpeg, png, gif, tif, tiff, bmp or psd'
  },
  vectorCheck: {
    id: 'components.MyFiles.vectorCheck',
    defaultMessage: 'VECTOR CHECK'
  },
  gotIt: {
    id: 'components.MyFiles.gotIt',
    defaultMessage: 'Got it!'
  },
  somethingWrong: {
    id: 'components.MyFiles.somethingWrong',
    defaultMessage: 'Oops, something went wrong!'
  },
  sizeBody: {
    id: 'components.MyFiles.sizeBody',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Your file is <strong>{width}cm x {height}cm</strong> and exceeds the allowable size. The maximum dimension must be under 25cm x 25cm. Please reduce the dimensional size of your file and upload again.'
  },
  vectorInfo: {
    id: 'components.MyFiles.vectorInfo',
    // tslint:disable-next-line: max-line-length
    defaultMessage: 'Please ensure your files are as simplified as possible. Adding raster images that are too large, or vector files that are too complex (with many anchor points or effects such as gradients or shadows), may lead to problems with saving your design. This could cause you to lose your work! We recommend saving your work often to avoid losing progress. If you are unsure, you can always use the ProAssist tool; We are happy to help!'
  }
})
