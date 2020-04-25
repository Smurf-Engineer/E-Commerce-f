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
  ) {
    ordersQuery: getOrdersStatus(
      limit: $limit
      offset: $offset
      order: $order
      orderAs: $orderAs
      searchText: $searchText
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
        lastName: last_name
        pendingChecks: pending_checks
        source
        netsuite: netsuit_order {
          orderStatus {
            orderStatus
            fulfillments {
              packages
            }
          }
        }
        netsuiteAttempts: netsuite_attempts
        cutoffDate: cutoff_date
      }
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
