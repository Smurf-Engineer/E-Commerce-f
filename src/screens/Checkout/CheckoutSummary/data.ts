import gql from 'graphql-tag'

export const getTaxQuery = gql`
  query getTaxes(
    $country: String!
    $shipAddress: NetsuiteTaxAddress!
    $cart: [SimpleCartInput]!
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

    shipping: getShippingByCountry(country: $country, cart: $cart) {
      id
      total
      internalId
      carrier
    }
  }
`

export const getSubsidiaryQuery = gql`
  query subsidiaryByCountryCode($code: String!) {
    subsidiary: subsidiaryByCountryCode(code: $code)
  }
`
