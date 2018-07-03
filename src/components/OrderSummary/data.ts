import gql from 'graphql-tag'

export const getTaxQuery = gql`
  query getTaxes {
    taxes: getNetsuiteTaxes {
      internalId
      rate
      countryCode
      state
      zip
      rateGST
      ratePST
    }

    shipping: getNetsuiteShipping {
      internalId
      subsidiary
      name
      flatRate
      rateType
      restrictions {
        limitOrExcludeCountries
        limitOrExcludeStates
        countries
        states
      }
      weightTable {
        minimum
        amount
      }
    }
  }
`
