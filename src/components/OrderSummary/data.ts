import gql from 'graphql-tag'

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
