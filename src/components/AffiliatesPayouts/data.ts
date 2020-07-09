/**
 * AffiliatesPayouts Queries
 */

import gql from 'graphql-tag'

export const getAffiliatePaymentsQuery = gql`
  query getAffiliatePayments(
    $limit: Int
    $offset: Int
    $searchText: String
  ) {
    paymentsQuery: getPayouts(
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
