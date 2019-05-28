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
