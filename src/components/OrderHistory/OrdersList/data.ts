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
        shortId: short_id
        date: updated_at
        status
        netsuite: netsuit_order {
          orderStatus {
            internalId
            deliveryDate: orderDate
            orderStatus
            fulfillments {
              date
              status
              packages
              items {
                itemId
                designNumber
                quantity
              }
            }
          }
        }
      }
    }
  }
`
