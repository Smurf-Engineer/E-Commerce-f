import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const facebooklLogin = graphql(
  gql`
    mutation FacebookSignIn($token: String!) {
      facebookSignIn(token: $token) {
        user {
          id
          shortId: short_id
          name: first_name
          lastName: last_name
          email
        }
        token
      }
    }
  `,
  {
    name: 'loginWithFacebook'
  }
)

export const googleLogin = graphql(
  gql`
    mutation GoogleSignIn($token: String!) {
      googleSignIn(token: $token) {
        user {
          id
          shortId: short_id
          name: first_name
          lastName: last_name
          email
        }
        token
      }
    }
  `,
  {
    name: 'loginWithGoogle'
  }
)
