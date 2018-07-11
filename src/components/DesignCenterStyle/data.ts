/**
 * Styles queries
 */

import gql from 'graphql-tag'

export const stylesQuery = gql`
  query GetStyles {
    styles {
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
