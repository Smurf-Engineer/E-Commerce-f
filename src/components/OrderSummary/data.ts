import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const applyPromoCodeMutation = graphql(
  gql`
    mutation getPromoCode($code: String!, $timeZone: Int) {
      couponCode: getDiscountCode(code: $code, timeZone: $timeZone) {
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
