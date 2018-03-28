/**
 * Designs queries
 */

import gql from 'graphql-tag'

export const styleQuery = gql`
  query getStyle($designId: Int!) {
    design: sharedDesign(designId: $designId) {
      id
      name
      product {
        name
        id
      }
      colors {
        id
        color
      }
    }
  }
`
