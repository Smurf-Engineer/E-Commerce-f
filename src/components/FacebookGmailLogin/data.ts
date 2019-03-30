import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const facebooklLogin = graphql(
  gql`
    mutation FacebookSignIn($token: String!, $countryCode: String!) {
      facebookSignIn(token: $token, countryCode: $countryCode) {
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
    mutation GoogleSignIn($token: String!, $countryCode: String!) {
      googleSignIn(token: $token, countryCode: $countryCode) {
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
