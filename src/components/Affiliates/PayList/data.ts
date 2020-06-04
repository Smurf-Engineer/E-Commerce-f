/**
 * Affiliates Queries
 */

import gql from 'graphql-tag'

export const getAffiliatesPayments = gql`
  query getPaymenstHistory($limit: Int, $offset: Int, $text: String, $start: String, $end: String) {
    paymentsResult: getPaymenstHistory(limit: $limit, offset: $offset, searchText: $text, start: $start, end: $end) {
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
        customerId: customer_id
        customerName: customer_name
        orderId: order_id
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
