import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const mailLogin = graphql(
  gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
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
    name: 'loginWithEmail'
  }
)

export const createUser = graphql(
  gql`
    mutation SignUp($user: UserInput!, $reseller: ResellerUserInput) {
      signUp(user: $user, reseller: $reseller) {
        user {
          id
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
