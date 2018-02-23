import gql from 'graphql-tag'
export const facebookLoginQuery = gql`
  mutation facebookSignIn($code: String!) {
    facebookSignIn(code: $code) {
      user {
        id
        email
        name
      }
      session {
        token
      }
    }
  }
`
