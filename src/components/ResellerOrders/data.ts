/**
 * Affiliates Queries
 */

import gql from 'graphql-tag'

export const getResellerPayments = gql`
  query getResellerHistory(
      $limit: Int,
      $offset: Int,
      $start: String,
      $end: String,
      $status: String,
      $orderPoint: String
    ) {
    paymentsResult: getResellerHistory(
        limit: $limit,
        offset: $offset,
        start: $start,
        end: $end,
        status: $status,
        orderPoint: $orderPoint
      ) {
      fullCount
      payments {
        id
        createdAt: created_at
        comission
        status
        amount
        store
        netsuite: netsuite_order {
          orderStatus {
            orderStatus
          }
        }
        orderAmount: order_amount
        orderStatus: order_status
        paidAt: paid_at
        orderId: order_id
      }
    }
  }
`
