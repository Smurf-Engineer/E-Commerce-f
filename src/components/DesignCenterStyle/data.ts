/**
 * Styles queries
 */

import gql from 'graphql-tag'

// TODO: Change to props
export const stylesQuery = gql`
  query GetStyles {
    styles(limit: 50, offset: 0) {
      fullCount
      styles {
        id
        name
        image
        branding
        colors: colorsBlocks {
          image
          color
          colorDesc: colordesc
        }
      }
    }
  }
`
