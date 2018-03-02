/**
 * Themes queries
 */

import gql from 'graphql-tag'

export const themesQuery = gql`
  query GetThemes {
    themes {
      id
      name
      image
    }
  }
`
