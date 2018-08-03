import gql from 'graphql-tag'

export const getTaxQuery = gql`
  query getTaxes($country: String!) {
    taxes: getNetsuiteTaxes {
      internalId
      rate
      countryCode
      state
      zip
      rateGST
      ratePST
    }

    shipping: getShippingByCountry(country: $country) {
      internal_id
      subsidiary
      name
      flat_rate
      rate_type
    }
  }
`
