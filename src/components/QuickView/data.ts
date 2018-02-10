/**
 * Home queries
 */

import gql from 'graphql-tag'

export const QuickViewQuery = gql`
  query GetProduct {
    product {
      data
    }
  }
`
