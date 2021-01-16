import gql from 'graphql-tag'

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      reseller {
        status
      }
    }
  }
`

export const getDesignLabInfo = gql`
  query getDesignLabInfo {
    getDesignLabInfo {
      deliveryDays: delivery_days
      tutorialPlaylist: tutorial_playlist
      cutOffDays: cutoff_settings
    }
  }
`