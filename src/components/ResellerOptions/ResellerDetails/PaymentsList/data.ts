/**
 * PaymentsList Queries
 */

import gql from 'graphql-tag'

export const getResellerPaymentsQuery = gql`
  query getResellerPayments(
    $limit: Int
    $offset: Int
    $isAdmin: Boolean
    $userId: String
  ) {
    paymentsQuery: getResellerPayments(
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
