/**
 * Styles queries
 */

import gql from 'graphql-tag'

export const stylesQuery = gql`
  query GetStyles {
    styles {
      id
      name
      image
      colors: colorsBlocks {
        image
        color
        colorDesc: colordesc
      }
    }
  }
`
