import gql from 'graphql-tag'

export const getSubsidiaryQuery = gql`
  query subsidiaryByCountryCode($code: String!) {
    subsidiary: subsidiaryByCountryCode(code: $code)
  }
`