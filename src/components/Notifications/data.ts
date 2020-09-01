/**
 * Notifications queries
 */

import gql from 'graphql-tag'

export const notificationsQuery = gql`
  query getNotifications {
    notifications: getNotifications {
      id
      senderId: user_id
      notificationType: notification_type
      toAdmin: to_admin
      read: user_read
      date: created_at
      title
      message
    }
  }
`
