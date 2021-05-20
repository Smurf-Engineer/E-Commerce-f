import gql from 'graphql-tag'

export const countriesQuery = gql`
  query getCountries {
    countries: getCountries {
      name: countryName
      code: countryCode
      geonameId
    }
  }
`
