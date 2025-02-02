/**
 * Menu queries
 */

import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query categories($sportId: Int!, $genderId: Int) {
    categories: categoriesSport(sportId: $sportId) {
      id
      name
    }
  }
`
