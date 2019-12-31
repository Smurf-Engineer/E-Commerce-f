/**
 * Account-OrdersList Queries
 */

import gql from 'graphql-tag'

export const getDiscountsQuery = gql`
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
        id
        code: coupon_code
        discountItemId: discount_item_id
        type: discount_type
        rate
        expiry
        active
        restrictionType: restriction_type
        usageNumber: usage_limit
        selectedUsers: users {
          netsuiteId: netsuite_internal
          name: full_name
          email
          value: short_id
        }
        selectedProducts: items
      }
    }
  }
`
