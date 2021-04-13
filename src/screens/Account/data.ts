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
        userId: id
        firstName: first_name
        lastName: last_name
        email
        affiliateEnabled: affiliate_enabled
        showProDesign: show_pro_design
        resellerEnabled: reseller_enabled
        phone
      }
      reseller {
        status
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