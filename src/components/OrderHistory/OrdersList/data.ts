/**
 * Account-OrdersList Queries
 */

import gql from 'graphql-tag'

export const getOrdersQuery = gql`
  query getOrders($limit: Int, $offset: Int, $order: String, $orderAs: String) {
    ordersQuery: getOrders(
      limit: $limit
      offset: $offset
      order: $order
      orderAs: $orderAs
    ) {
      fullCount
      orders {
        id
        userId: user_id
        shortId: short_id
        date: created_at
        service
        estimatedDate: estimated_date
        status
        canUpdatePayment
        teamStoreId: teamstore_id
        currency {
          shortName: short_name
        }
        totalAmount: total_amount
        teamstoreId: teamstore_id
        netsuite: netsuit_order {
          orderStatus {
            orderStatus
            fulfillments {
              packages
            }
          }
        }
      }
    }
  }
`
