/**
 * Menu queries
 */

import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query getCategories($sportId: Int!, $genderId: Int!) {
    categoriesSport(sportId: $sportId, genderId: $genderId) {
      id
      name
    }
  }
`
