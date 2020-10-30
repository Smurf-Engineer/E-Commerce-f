/**
 * ResellerPayouts Queries
 */

import gql from 'graphql-tag'

export const getResellerPaymentsQuery = gql`
  query getResellerPayments(
    $limit: Int
    $offset: Int
    $searchText: String
  ) {
    paymentsQuery: getResellerPayouts(
      limit: $limit
      offset: $offset
      searchText: $searchText
    ) {
      fullCount
      payments {
        id
        createdAt: created_at
        status
        amount
        name
        receipt
      }
    }
  }
`
