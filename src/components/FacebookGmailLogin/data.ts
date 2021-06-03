import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const facebooklLogin = graphql(
  gql`
    mutation FacebookSignIn(
      $token: String!,
      $countryCode: String!,
      $countryName: String, 
      $regionName: String,
      $city: String
    ) {
      facebookSignIn(
        token: $token,
        countryCode: $countryCode,
        countryName: $countryName,
        regionName: $regionName,
        city: $city
      ) {
        user {
          id
          shortId: short_id
          name: first_name
          lastName: last_name
          email
          administrator
        }
        token
        newUser
      }
    }
  `,
  {
    name: 'loginWithFacebook'
  }
)

export const googleLogin = graphql(
  gql`
    mutation GoogleSignIn(
      $token: String!
      $countryCode: String!
      $isAdmin: Boolean!
      $countryName: String
      $regionName: String
      $city: String
    ) {
      googleSignIn(
        token: $token
        countryCode: $countryCode
        isAdmin: $isAdmin
        countryName: $countryName
        regionName: $regionName
        city: $city
      ) {
        user {
          id
          shortId: short_id
          name: first_name
          lastName: last_name
          email
          administrator
        }
        token
        newUser
      }
    }
  `,
  {
    name: 'loginWithGoogle'
  }
)
