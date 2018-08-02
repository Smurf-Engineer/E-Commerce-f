import gql from 'graphql-tag'

export const subsidiaryQuery = gql`
  query GetCountriesSubsidiaries {
    countriesSubsidiaries {
      id
      country
      subsidiary
      countryCode: country_code
    }
  }
`
