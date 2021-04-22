/**
 * Notifications queries
 */

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const notificationsQuery = gql`
  query getNotifications($isAdmin: Boolean, $limit: Int, $offset: Int) {
    notifications: getNotifications(isAdmin: $isAdmin, limit: $limit, offset: $offset) {
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
`

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

export const deleteMutation = graphql(
  gql`
    mutation deleteNotification($shortId: String!, $isAdmin: Boolean) {
      notification: deleteNotification(shortId: $shortId, isAdmin: $isAdmin) {
        message
      }
    }
  `,
  {
    name: 'deleteNotification'
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