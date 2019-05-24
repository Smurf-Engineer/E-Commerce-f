/**
 * Account-OrdersList Queries
 */

import gql from 'graphql-tag'

export const getOrdersQuery = gql`
  query getDiscounts(
    $limit: Int
    $offset: Int
    $order: String
    $orderAs: String
    $searchText: String
  ) {
    discountsQuery: getDiscounts(
      limit: $limit
      offset: $offset
      order: $order
      orderAs: $orderAs
      searchText: $searchText
    ) {
      fullCount
      discounts {
        code: coupon_code
        discountItemId: discount_item_id
        type: discount_type
        rate
        expiry
      }
    }
  }
`
