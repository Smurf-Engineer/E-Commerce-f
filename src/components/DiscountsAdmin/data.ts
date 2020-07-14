import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const upsertDiscountMutation = graphql(
  gql`
    mutation upsertDiscount($discount: DiscountInput!) {
      discount: upsertDiscount(discount: $discount) {
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
  `,
  {
    name: 'upsertDiscount'
  }
)

export const activateDiscountMutation = graphql(
  gql`
    mutation activateDiscount($id: Int!) {
      activateDiscount(id: $id) {
        id
      }
    }
  `,
  {
    name: 'activateDiscount'
  }
)

export const getUsers = gql`
  query GetUsersNameQuery($pattern: String!) {
    userSearch: getUserSearch(pattern: $pattern) {
      id
      name
      email
      shortId: short_id
    }
  }
`

export const getDesignSearchCode = gql`
  query GetDesignSearchCodeQuery($pattern: String!) {
    getDesignSearchCode(pattern: $pattern) {
      id
      code
      name
      image
    }
  }
`
