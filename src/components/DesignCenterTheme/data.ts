/**
 * Themes queries
 */

import gql from 'graphql-tag'

export const themesQuery = gql`
  query GetThemesByProduct($id: Int!) {
    themes: getThemesByProduct(productId: $id) {
      id
      image
      name
    }
  }
`
