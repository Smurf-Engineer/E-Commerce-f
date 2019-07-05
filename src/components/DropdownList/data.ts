/**
 * Filters queries
 */

import gql from 'graphql-tag'

export const getSportsQuery = gql`
  query GetSports {
    sports(navbarSports: true) {
      id
      name
    }
  }
`
