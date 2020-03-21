/**
 * Account-OrdersList Queries
 */

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
