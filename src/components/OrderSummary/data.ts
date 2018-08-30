import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getTaxQuery = gql`
  query getTaxes(
    $country: String!
    $weight: Float!
    $shipAddress: NetsuiteTaxAddress!
  ) {
    taxes: getTaxesByAddress(shipAddress: $shipAddress) {
      total
      rate
      rate_pst
      rate_gst
      internalId
    }

    shipping: getShippingByCountry(country: $country, weight: $weight) {
      id
      total
      internalId
      carrier
    }
  }
`

export const applyPromoCodeMutation = graphql(
  gql`
    mutation getPromoCode($code: String!) {
      couponCode: getDiscountCode(code: $code) {
        code
        discountAmount
        type
        rate
      }
    }
  `,
  {
    name: 'applyPromoCode'
  }
)
