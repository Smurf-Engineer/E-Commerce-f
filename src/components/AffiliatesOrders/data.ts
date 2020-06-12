/**
 * Affiliates Queries
 */

import gql from 'graphql-tag'

export const getAffiliatesPayments = gql`
  query getAffiliateHistory(
      $limit: Int,
      $offset: Int
    ) {
    paymentsResult: getAffiliateHistory(
        limit: $limit,
        offset: $offset
      ) {
      fullCount
      payments {
        id
        createdAt: created_at
        comission
        status
        amount
        orderAmount: order_amount
        orderStatus: order_status
        paidAt: paid_at
        orderId: order_id
      }
    }
  }
`
