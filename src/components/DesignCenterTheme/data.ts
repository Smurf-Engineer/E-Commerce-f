/**
 * Themes queries
 */

import gql from 'graphql-tag'

// TODO: Change to props
export const themesQuery = gql`
  query GetThemes {
    themes(limit: 50, offset: 0) {
      fullCount
      themes {
        id
        name
        image
      }
    }
  }
`
