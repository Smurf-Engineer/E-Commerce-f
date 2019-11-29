import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const applyPromoCodeMutation = graphql(
  gql`
    mutation getPromoCode($code: String!) {
      couponCode: getDiscountCode(code: $code) {
        code
        discountAmount
        type
        rate
        restrictionType
        products
      }
    }
  `,
  {
    name: 'applyPromoCode'
  }
)
