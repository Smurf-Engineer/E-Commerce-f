import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const createUser = graphql(
  gql`
    mutation SignUp($user: UserInput!) {
      signUp(user: $user) {
        user {
          id
          shortId: short_id
          email
          administrator
          name: first_name
          lastName: last_name
        }
        token
      }
    }
  `,
  {
    name: 'signUpUser'
  }
)

export const countriesQuery = gql`
  query getCountries {
    countries: getCountries {
      name: countryName
      code: countryCode
      geonameId
    }
  }
`
