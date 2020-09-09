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
        id
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
  `,
  { name: 'notificationsData' }
)

export  const notificationsSubscription = gql`
  subscription newNotificationAdmin {
    newNotificationAdmin {
      id
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
`

export const setAsRead = graphql(
  gql`
    mutation setNotificationRead($id: Int!, $isAdmin: Boolean) {
      notification: setNotificationRead(id: $id, isAdmin: $isAdmin) {
        id
        read: user_read
      }
    }
  `,
  {
    name: 'readNotification'
  }
)