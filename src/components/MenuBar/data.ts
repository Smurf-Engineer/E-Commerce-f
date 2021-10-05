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

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      reseller {
        status
        paypalAccount: paypal_account
      }
      userProfile {
        email
        showProDesign: show_pro_design
        resellerEnabled: reseller_enabled
        affiliateEnabled: affiliate_enabled
      }
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
      list: notifications {
        id: short_id
        senderId: user_id
        notificationType: notification_type
        toAdmin: to_admin
        read: user_read
        date: created_at
        title
        metaMessage: meta_message
        message
        user: sender_name
        email: sender_email
        url
      }
    }
  }
`

export const notificationsSubscription = gql`
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
    mutation setNotificationRead($shortId: String!) {
      notification: setNotificationRead(shortId: $shortId) {
        id
        read: user_read
      }
    }
  `,
  {
    name: 'readNotification'
  }
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

export const setAllAsRead = graphql(
  gql`
    mutation setAllNotificationRead {
      setAllNotificationRead {
        message
      }
    }
  `,
  {
    name: 'readAllNotifications'
  }
)

export const deleteNotificationMutation = graphql(
  gql`
    mutation deleteNotification($shortId: String!) {
      notification: deleteNotification(shortId: $shortId, isAdmin: false) {
        message
      }
    }
  `,
  {
    name: 'deleteNotification'
  }
)