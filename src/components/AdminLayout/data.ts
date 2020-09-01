import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getTeamStoreStatus = graphql(
  gql`
    mutation getTeamStoreStatus {
      getTeamStoreStatus {
        showTeamStores: show_team_stores
      }
    }
  `,
  { name: 'teamStoreStatus' }
)

export const getFonts = graphql(
  gql`
    mutation GetFonts {
      fontsData: getFonts {
        id
        family
        active
      }
    }
  `,
  { name: 'getFontsData' }
)

export const unreadNotificationsQuery = graphql(
  gql`
    query unreadNotifications {
      unread: unreadNotifications
    }
  `,
  { name: 'notifications' }
)
