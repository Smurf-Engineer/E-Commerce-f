/**
 * ProductInternalsAdmin -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'components.ProductInternalsAdmin.title',
    defaultMessage: 'Product Internal List'
  },
  search: {
    id: 'components.ProductInternalsAdmin.search',
    defaultMessage: 'Search for a internal id or product code'
  },
  addInternalLabel: {
    id: 'components.ProductInternalsAdmin.addInternalLabel',
    defaultMessage: '+ ADD NEW PRODUCT INTERNAL'
  },
  download: {
    id: 'components.ProductInternalsAdmin.download',
    defaultMessage: 'DOWNLOAD CSV'
  },
  alreadyExist: {
    id: 'components.ProductInternalsAdmin.alreadyExist',
    defaultMessage: 'Product internal already exists.'
  },
  unexpectedError: {
    id: 'components.ProductInternalsAdmin.unexpectedError',
    defaultMessage: 'Oops! Something went wrong.'
  },
  confirmTitle: {
    id: 'components.ProductInternalsAdmin.confirmTitle',
    defaultMessage: `Delete product internal`
  },
  confirmMessage: {
    id: 'components.ProductInternalsAdmin.confirmMessage',
    defaultMessage: `You are about to delete the internal ID no. {internalId}.`
  },
  invalidFormat: {
    id: 'components.ProductInternalsAdmin.invalidFormat',
    defaultMessage: `Invalid file format`
  },
  uploadCsv: {
    id: 'components.ProductInternalsAdmin.uploadCsv',
    defaultMessage: `Upload CSV`
  }
})
