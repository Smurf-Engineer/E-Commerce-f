import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const profileNotificationSettingsQuery = gql`
  query notificationSettings {
    notificationData: getProfileNotificationSettings {
      notifyOrderPayment: notify_order_payment
      notifyProDesign: notify_pro_design
      notifyProductService: notify_product_service
      notifyTeamStore: notify_team_store
      notifyDesignLab: notify_design_lab
      newsletterSubscribed: newsletter_subscribed
    }
  }
`

export const profilePhoneSettingsQuery = gql`
  query phoneSettings {
    phoneData: getProfilePhoneSettings {
      phone
    }
  }
`

export const UpdateNotificationSettingMutation = graphql(
  gql`
    mutation updateNotification($setting: String!, $value: Int!) {
      setNotificationSetting(setting: $setting, value: $value) {
        message
      }
    }
  `,
  {
    name: 'updateNotification'
  }
)

export const UpdateNewsletterSettingMutation = graphql(
  gql`
    mutation updateNewsletterSubscribed($newsletterSubscribed: Boolean!) {
      setNewsletterSubscribed(newsletterSubscribed: $newsletterSubscribed) {
        message
      }
    }
  `,
  {
    name: 'updateNewsletterSubscribed'
  }
)

export const UpdatePhoneSettingMutation = graphql(
  gql`
    mutation changeUserPhone($userId: String!, $phone: String!) {
      profile: changeUserPhone(userId: $userId, phone: $phone) {
        phone
      }
    }
  `,
  {
    name: 'updatePhone'
  }
)