import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getDesignLabInfo = gql`
  query getDesignLabInfo {
    getDesignLabInfo {
      deliveryDays: delivery_days
      tutorialPlaylist: tutorial_playlist
    }
  }
`

export const setDeliveryDaysMutation = graphql(
  gql`
    mutation setDeliveryDays($deliveryDays: Int!) {
      setDeliveryDays(deliveryDays: $deliveryDays) {
        message
      }
    }
  `,
  { name: 'setDeliveryDays' }
)

export const setPlaylistMutation = graphql(
  gql`
    mutation setPlaylist($playlist: String) {
      setPlaylist(playlist: $playlist) {
        message
      }
    }
  `,
  { name: 'setPlaylist' }
)
