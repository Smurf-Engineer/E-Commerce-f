/**
 * Designer Tool - Queries
 */

import gql from 'graphql-tag'

export const getProductFromCode = gql`
  query GetProductFromCode($code: String!) {
    product: productFromCode(code: $code) {
      id
      name
      obj
      mtl
      themes {
        id
        name
        image
        styles {
          id
          name
          image
          colorsBlocks {
            id
            color
            image
          }
        }
      }
    }
  }
`
