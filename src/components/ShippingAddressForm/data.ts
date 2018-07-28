import gql from 'graphql-tag'

export const countriesQuery = gql`
  query getCountries {
    countries: getCountries {
      name
      code
    }
  }
`

export const regionsQuery = gql`
  query getRegions($country: String!) {
    states: getRegions(country: $country) {
      region
      country
    }
  }
`

export const citiesQuery = gql`
  query getCities($country: String!, $region: String!) {
    getCities(country: $country, region: $region) {
      city
      region
      country
      latitude
      longitude
    }
  }
`
