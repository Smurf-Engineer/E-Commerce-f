import gql from 'graphql-tag'

export const getTaxQuery = gql`
  query getTaxes(
    $country: String!
    $weight: Float!
    $shipAddress: NetsuiteTaxAddress!
  ) {
    taxes: getTaxesByAddress(shipAddress: $shipAddress) {
      total
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
