import gql from 'graphql-tag'

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

export const getCouponCode = gql`
  query discountCode($code: String!) {
    getDiscountCode(code: $code) {
      code
      discountAmount
      type
      rate
    }
  }
`
