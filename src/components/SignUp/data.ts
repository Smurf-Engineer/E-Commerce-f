import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const createUser = graphql(
  gql`
    mutation SignUp($email: String!, $password: String!) {
      login(email: $email, password: $password) {
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
    name: 'loginWithEmail'
  }
)
