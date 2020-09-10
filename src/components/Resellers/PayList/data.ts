/**
 * Resellers Queries
 */

import gql from 'graphql-tag'

export const getAffiliatesPayments = gql`
  query getResellersOrders(
      $limit: Int,
      $offset: Int,
      $text: String,
      $start: String,
      $end: String,
      $status: String,
      $orderPoint: String
    ) {
    paymentsResult: getResellersOrders(
        limit: $limit,
        offset: $offset,
        searchText: $text,
        start: $start,
        end: $end,
        status: $status,
        orderPoint: $orderPoint
      ) {
      fullCount
      payments {
        id
        createdAt: created_at
        userId: user_id
        name
        paypalAccount: paypal_account
        comission
        status
        amount
        receipt
        currency
        netsuite: netsuite_order {
          orderStatus {
            orderStatus
          }
        }
        orderAmount: order_amount
        orderCurrency: order_currency
        totalOrigin: total_origin
        orderStatus: order_status
        customerId: customer_id
        customerName: customer_name
        orderId: order_short_id
      }
    }
  }
`

export const makePaymentsMutation = gql`
  mutation makePayments($list: [String]) {
    payments: makePayments(list: $list) {
      id
      createdAt: created_at
      userId: user_id
      name
      paypalAccount: paypal_account
      comission
      status
      amount
      receipt
    }
  }
`
