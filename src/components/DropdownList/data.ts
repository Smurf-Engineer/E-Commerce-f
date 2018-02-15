/**
 * Filters queries
 */

import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query GetCategories {
    categories {
      id
      name
    }
    sports {
      id
      name
    }
  }
`
