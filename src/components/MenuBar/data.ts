/**
 * Filters queries
 */

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getSportsQuery = gql`
  query GetSports {
    sports(navbarSports: true) {
      id
      name
      route
    }
  }
`

export const regionsQuery = gql`
  query regions {
    regionsResult: regions {
      id
      label: name
      icon
      code
      currencies {
        id
        name
        shortName: short_name
        abbreviation
      }
      languages {
        id
        name
        shortName: short_name
      }
    }
  }
`

export const notificationsQuery = gql`
  query getNotifications {
    notifications: getNotifications {
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
        url
      }
    }
  }
`

export  const notificationsSubscription = gql`
  subscription newNotification {
    newNotification {
      id
      senderId: user_id
      notificationType: notification_type
      toAdmin: to_admin
      read: user_read
      date: created_at
      title
      message
      url
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
