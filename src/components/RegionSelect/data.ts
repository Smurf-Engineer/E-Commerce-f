import gql from 'graphql-tag'

export const regionsQuery = gql`
  query getRegions($country: String!) {
    regions: getRegions(country: $country) {
      region: name
      country
      code: adminCodes1 {
        shortCode: ISO3166_2
      }
    }
  }
`
