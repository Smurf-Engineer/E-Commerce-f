import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const forgotPassword = graphql(
  gql`
    mutation forgotPassword($email: String!) {
      forgotPassword(email: $email) {
        message
      }
    }
  `,
  {
    name: 'sendMailForgotPassword'
  }
)
