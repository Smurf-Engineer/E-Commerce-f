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

export const notificationsQuery = graphql(
  gql`
    query getNotifications {
      notifications: getNotifications(isAdmin: true) {
        fullCount
        list: notifications {
          id: short_id
          senderId: user_id
          notificationType: notification_type
          toAdmin: to_admin
          read: user_read
          date: created_at
          title
          message
          user: sender_name
          email: sender_email
          url
        }
      }
    }
  `,
  { name: 'notificationsData' }
)

export const upsertNotificationToken = graphql(
  gql`
    mutation upsertNotificationToken($token: String!) {
      notification: upsertNotificationToken(token: $token) {
        message
      }
    }
  `,
  {
    name: 'upsertNotification'
  }
)

export const setAsRead = graphql(
  gql`
    mutation setNotificationRead($shortId: String!, $isAdmin: Boolean) {
      notification: setNotificationRead(shortId: $shortId, isAdmin: $isAdmin) {
        id
        read: user_read
      }
    }
  `,
  {
    name: 'readNotification'
  }
)