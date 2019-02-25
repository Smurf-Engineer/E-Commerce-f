/**
 * SymbolTab -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  addSymbol: {
    id: 'components.SymbolTab.addSymbol',
    defaultMessage: 'Add Symbol'
  },
  editSymbol: {
    id: 'components.SymbolTab.editSymbol',
    defaultMessage: 'Edit Symbol'
  },
  fill: {
    id: 'components.SymbolTab.fill',
    defaultMessage: 'Fill'
  },
  outline: {
    id: 'components.SymbolTab.outline',
    defaultMessage: 'Outline'
  },
  searchInputPlaceholder: {
    id: 'components.SymbolTab.searchInputPlaceholder',
    defaultMessage: 'Search Symbol Library'
  },
  notFoundSymbol: {
    id: 'components.SymbolTab.notFoundSymbol',
    defaultMessage: 'Your search did not match with any available symbol'
  },
  imageSizeError: {
    id: 'components.SymbolTab.imageSizeError',
    defaultMessage: 'Oh no! Max file size is limited to 20MB'
  },
  imageExtensionError: {
    id: 'components.SymbolTab.imageExtensionError',
    defaultMessage: 'Oh no! Your file has to be an svg'
  }
})
