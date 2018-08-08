import gql from 'graphql-tag'

export const getTaxQuery = gql`
  query getTaxes($country: String!, $weight: Float!) {
    taxes: getNetsuiteTaxes {
      internalId
      rate
      countryCode
      state
      zip
      rateGST
      ratePST
    }

    shipping: getShippingByCountry(country: $country, weight: $weight) {
      id
      total
      internalId
    }
  }
`
