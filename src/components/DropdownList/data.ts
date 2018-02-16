/**
 * Filters queries
 */

import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query GetCategories {
    genders {
      id
      name
    }
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
