import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const createUser = graphql(
  gql`
    mutation SignUp($user: UserInput!) {
      testSignup(user: $user) {
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
