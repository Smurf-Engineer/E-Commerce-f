import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const addDiscountMutation = graphql(
  gql`
    mutation createDiscount($discount: DiscountInput!) {
      discount: createDiscount(discount: $discount) {
        id
        code: coupon_code
        discountItemId: discount_item_id
        type: discount_type
        rate
        expiry
        active
        restrictionType: restriction_type
        user
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
    name: 'addNewDiscount'
  }
)
export const updateDiscountMutation = graphql(
  gql`
    mutation updateDiscount($discount: DiscountInput!) {
      updateDiscount(discount: $discount) {
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
    name: 'updateDiscount'
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

export const getProducts = gql`
  query getProductInternalsInfo($text: String) {
    productsSearch: getProductInternalsInfo(text: $text) {
      products
    }
  }
`