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
        paypalAccount: paypal_account
      }
    }
  }
`

export const sendAffiliateMutation = graphql(
  gql`
    mutation sendAffiliateRequest($currency: String!, $file: String!) {
      sendAffiliateRequest(currency: $currency, file: $file) {
        status
      }
    }
  `,
  {
    name: 'sendAffiliateRequest'
  }
)