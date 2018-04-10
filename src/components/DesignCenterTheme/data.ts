/**
 * Themes queries
 */

import gql from 'graphql-tag'

export const themesQuery = gql`
  query GetThemes {
    themes {
      fullCount
      themes {
        id
        name
        image
      }
    }
  }
`
