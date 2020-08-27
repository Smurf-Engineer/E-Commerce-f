/**
 * Filters queries
 */

import gql from 'graphql-tag'

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
      id
      senderId: user_id
      notificationType: notification_type
      toAdmin: to_admin
      read: user_read
    }
  }
`

export  const notificationsSubscription = gql`
  subscription newNotification {
    newNotification {
      id
      text
    }
  }
`