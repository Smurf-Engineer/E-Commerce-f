/**
 * SymbolTab -  Messages
 */

import { defineMessages } from 'react-intl'

export default defineMessages({
  addSymbol: {
    id: 'components.SymbolTab.addSymbol',
    defaultMessage: 'Add Symbol'
  },
  searchInputPlaceholder: {
    id: 'components.SymbolTab.searchInputPlaceholder',
    defaultMessage: 'Search Symbol Library'
  },
  search: {
    id: 'components.SymbolTab.search',
    defaultMessage: 'Search'
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
