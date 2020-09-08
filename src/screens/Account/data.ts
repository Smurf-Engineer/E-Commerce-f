/**
 * Account Screen
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const addTeamStoreItemMutation = graphql(
  gql`
    mutation AddTeamStoreItem(
      $teamStoreItem: TeamStoreItem!
      $teamStoreId: String!
    ) {
      addTeamStoreItem(
        teamStoreItem: $teamStoreItem
        teamStoreId: $teamStoreId
      ) {
        message
      }
    }
  `,
  { name: 'addItemToStore' }
)

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      userProfile {
        firstName: first_name
        lastName: last_name
        email
        affiliateEnabled: affiliate_enabled
        resellerEnabled: reseller_enabled
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