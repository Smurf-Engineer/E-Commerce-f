import gql from 'graphql-tag'

export const citiesQuery = gql`
  query getCities($country: String!, $region: String!) {
    cities: getCities(country: $country, region: $region) {
      city
      region
      country
      latitude
      longitude
    }
  }
`
