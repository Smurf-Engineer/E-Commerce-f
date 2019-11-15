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
