/**
 * Themes queries
 */

import gql from 'graphql-tag'

export const themesQuery = gql`
  query GetThemesByProduct($id: Int!, $placeholders: Boolean) {
    themes: getThemesByProduct(productId: $id, placeholders: $placeholders) {
      id
      image
      name
    }
  }
`
