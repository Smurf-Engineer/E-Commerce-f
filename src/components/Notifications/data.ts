/**
 * Notifications queries
 */

import gql from 'graphql-tag'

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
    }
  }
`
