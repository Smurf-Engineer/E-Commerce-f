import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      userProfile {
        firstName: first_name
        lastName: last_name
        email
        phone
      }
      reseller {
        status
        paypalAccount: paypal_account
      }
    }
  }
`

export const sendResellerMutation = graphql(
  gql`
    mutation sendResellerRequest($currency: String!, $file: String!) {
      sendResellerRequest(currency: $currency, file: $file) {
        status
      }
    }
  `,
  {
    name: 'sendResellerRequest'
  }
)