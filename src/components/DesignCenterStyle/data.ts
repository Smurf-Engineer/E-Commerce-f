/**
 * Styles queries
 */

import gql from 'graphql-tag'

export const stylesQuery = gql`
  query GetStyles {
    styles(limit: 12, offset: 3) {
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
