/**
 * Account-OrdersList Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getOrdersQuery = gql`
  query getOrdersStatus(
    $limit: Int
    $offset: Int
    $order: String
    $orderAs: String
    $searchText: String
    $startDate: String
    $endDate: String
    $status: String
    $orderPoint: String
  ) {
    ordersQuery: getOrdersStatus(
      limit: $limit
      offset: $offset
      order: $order
      orderAs: $orderAs
      searchText: $searchText
      startDate: $startDate
      endDate: $endDate
      status: $status
      orderPoint: $orderPoint
    ) {
      fullCount
      orders {
        id
        shortId: short_id
        date: created_at
        estimatedDate: estimated_date
        status
        clientId: user_id
        firstName: first_name
        total: total_amount
        currency {
          abbreviation
        }
        netsuite: netsuit_order {
          orderStatus {
            orderStatus
            fulfillments {
              packages
            }
          }
        }
        lastName: last_name
        source
        netsuiteAttempts: netsuite_attempts
        cutoffDate: cutoff_date
      }
    }
  }
`

export const getOrdersPreflight = gql`
  query getOrdersPreflight($ordersIds: [Int]!) {
    preflight: getOrdersPreflight(ordersIds: $ordersIds) {
      id
      pendingChecks: pending_checks
    }
  }
`

export const updateStatusMutation = graphql(
  gql`
    mutation changeOrderStatus($status: String!, $orderId: String!) {
      changeOrderStatus(status: $status, orderId: $orderId) {
        message
      }
    }
  `,
  {
    name: 'updateStatus'
  }
)
