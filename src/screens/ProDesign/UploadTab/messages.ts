/**
 * UploadTab -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'screens.UploadTab.title',
    defaultMessage: 'Model and Design'
  },
  baseProduct: {
    id: 'screens.UploadTab.baseProduct',
    defaultMessage: 'Select base product'
  },
  productCode: {
    id: 'screens.UploadTab.productCode',
    defaultMessage: 'Product code or product name'
  },
  selectBase: {
    id: 'screens.UploadTab.selectBase',
    defaultMessage: 'Select base product'
  },
  uploadDesign: {
    id: 'components.ProDesign.uploadDesign',
    defaultMessage: 'Upload Pro Design SVG'
  },
  addDesignPNG: {
    id: 'components.ProDesign.addDesignPNG',
    defaultMessage: 'Add Design PNG File'
  },
  imageSizeError: {
    id: 'components.ProDesign.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.ProDesign.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be a png'
  }
})
