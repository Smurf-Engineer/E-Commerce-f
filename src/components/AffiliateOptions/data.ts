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
      affiliate {
        status
        comission
        activatedAt: activated_at
        file
        currency
        region
        paypalAccount: paypal_account
      }
    }
  }
`

export const linkPaypalAccountMutation = graphql(
  gql`
    mutation linkPaypalAccount($code: String!) {
      linkPaypalAccount(code: $code) {
        status
        paypalAccount: paypal_account
      }
    }
  `,
  {
    name: 'linkPaypalAccount'
  }
)
