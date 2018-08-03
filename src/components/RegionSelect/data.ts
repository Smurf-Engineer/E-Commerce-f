import gql from 'graphql-tag'

export const regionsQuery = gql`
  query getRegions($country: String!) {
    regions: getRegions(country: $country) {
      region
      country
    }
  }
`
