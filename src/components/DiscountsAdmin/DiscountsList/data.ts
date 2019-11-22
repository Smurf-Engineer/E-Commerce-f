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
        selectedUser: user_id
        user
        selectedUsers: users {
          netsuiteId: netsuite_internal
          firstName: first_name
          lastName: last_name
          email
        }
        items {
          id
          code
          name
          image
          shortId: short_id
          product {
            id
            code
            yotpoId: yotpo_id
            type: name
            weight
            description: short_description
          }
        }
      }
    }
  }
`
