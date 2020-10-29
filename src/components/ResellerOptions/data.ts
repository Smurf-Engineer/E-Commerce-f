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
        comission
        activatedAt: activated_at
        file
        inline
        margin
        businessName: business_name
        stateProvince: state_province
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
      linkPaypalAccount(code: $code, isReseller: true) {
        status
        paypalAccount: paypal_account
      }
    }
  `,
  {
    name: 'linkPaypalAccount'
  }
)
