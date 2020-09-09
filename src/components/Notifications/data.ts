/**
 * Notifications queries
 */

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const notificationsQuery = gql`
  query getNotifications($isAdmin: Boolean) {
    notifications: getNotifications(isAdmin: $isAdmin) {
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

export const setAllAsRead = graphql(
  gql`
    mutation setAllNotificationRead($isAdmin: Boolean) {
      setAllNotificationRead(isAdmin: $isAdmin) {
        message
      }
    }
  `,
  {
    name: 'readNAllotification'
  }
)