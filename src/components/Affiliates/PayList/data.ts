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
      }
    }
  }
`

export const addRepUserMutation = gql`
  mutation addRepUser($firstName: String!, $lastName: String!) {
    userResult: addRepUser(firstName: $firstName, lastName: $lastName) {
      id
      shortId: short_id
      firstName: first_name
      lastName: last_name
    }
  }
`
