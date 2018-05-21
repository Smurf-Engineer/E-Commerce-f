/**
 * DesignCenter Product
 */

import gql from 'graphql-tag'

export const getProductQuery = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      name
    }
  }
`
