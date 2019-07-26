/**
 * Filters queries
 */

import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query GetCategories {
    genders {
      id
      name: gender
    }
    sports(navbarSports: true, withCategories: true) {
      id
      name
      route
      categories {
        id
        name
      }
    }
  }
`
