/**
 * Notifications queries
 */

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const notificationsQuery = gql`
  query getNotifications {
    notificationsResult: getNotifications(
      isAdmin: true
    ) {
      fullCount
      notifications {
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
  }
`

export const setAsRead = graphql(
  gql`
    mutation setNotificationRead($id: Int!) {
      notification: setNotificationRead(id: $id) {
        id
        read: user_read
      }
    }
  `,
  {
    name: 'readNotification'
  }
)
