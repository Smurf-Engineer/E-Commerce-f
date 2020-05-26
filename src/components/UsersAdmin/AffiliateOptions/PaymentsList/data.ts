/**
 * PaymentsList Queries
 */

import gql from 'graphql-tag'

export const getAffiliatePaymentsQuery = gql`
  query getAffiliatePayments(
    $limit: Int
    $offset: Int
    $isAdmin: Boolean
    $userId: String
  ) {
    paymentsQuery: getAffiliatePayments(
      limit: $limit
      offset: $offset
      isAdmin: $isAdmin
      userId: $userId
    ) {
      fullCount
      payments {
        id
        createdAt: created_at
        status
        amount
        receipt
      }
    }
  }
`
