import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const resetPassword = graphql(
  gql`
    mutation resetPassword($resetToken: String!, $password: String!) {
      resetPassword(resetToken: $resetToken, password: $password) {
        message
      }
    }
  `,
  {
    name: 'changeResetPassword'
  }
)
