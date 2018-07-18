/**
 * Designer Tool - Queries
 */

import gql from 'graphql-tag'

export const getProductFromCode = gql`
  query GetProductFromCode($code: String!) {
    product: productFromCode(code: $code) {
      obj
      mtl
      themes {
        id
        name
        styles {
          id
          name
        }
      }
    }
  }
`
