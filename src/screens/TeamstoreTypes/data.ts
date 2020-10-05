import gql from 'graphql-tag'

export const getDesignLabInfo = gql`
  query getDesignLabInfo {
    getDesignLabInfo {
      deliveryDays: delivery_days
      tutorialPlaylist: tutorial_playlist
      cutOffDays: cutoff_settings
    }
  }
`