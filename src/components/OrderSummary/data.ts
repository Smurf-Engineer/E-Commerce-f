import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getTaxQuery = gql`
  query getTaxes(
    $country: String!
    $weight: Float!
    $shipAddress: NetsuiteTaxAddress!
  ) {
    taxes: getTaxesByAddress(
      shipAddress: $shipAddress
      countrySubsidiary: $country
    ) {
      total
      rate
      ratePst: rate_pst
      rateGst: rate_gst
      internalId
      countrySub
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
