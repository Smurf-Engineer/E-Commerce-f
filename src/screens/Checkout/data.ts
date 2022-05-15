import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const AddAddressMutation = graphql(
  gql`
    mutation createAddress($address: UserAddressInput!) {
      createUserAddress(address: $address) {
        first_name
      }
    }
  `,
  {
    name: 'addNewAddress'
  }
)

export const CreatePaymentIntentMutation = graphql(
  gql`
    mutation createPaymentIntent($orderObj: OrderInput!) {
      createPaymentIntent(order: $orderObj) {
        paymentClientSecret
        intentId
      }
    }
  `,
  {
    name: 'createPaymentIntent'
  }
)

export const PlaceOrderMutation = graphql(
  gql`
    mutation charge($orderObj: OrderInput!) {
      charge(order: $orderObj) {
        id
        short_id
        created_at
        client_secret
      }
    }
  `,
  {
    name: 'placeOrder'
  }
)

export const CurrencyQuery = gql`
  query currency($countryCode: String!) {
    currency: currencyByCountryCode(code: $countryCode)
  }
`

export const AddCardMutation = graphql(
  gql`
    mutation addCardSourceStripeCustomer($token: String!) {
      addCardSourceStripeCustomer(token: $token) {
        id
      }
    }
  `,
  {
    name: 'addNewCard'
  }
)

export const isScaPaymentQuery = gql`
  query isScaPayment($code: String!) {
    subsidiarySCA: isScaPayment(code: $code) {
      subsidiary
      sca
    }
  }
`

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      userProfile {
        firstName: first_name
        lastName: last_name
        email
        phone
        invoiceEnabled: invoice_enabled
        invoiceTerms: invoice_terms
      }
    }
    notificationData: getProfileNotificationSettings {
      notifyOrderPayment: notify_order_payment
      notifyProDesign: notify_pro_design
      notifyProductService: notify_product_service
      notifyTeamStore: notify_team_store
      notifyDesignLab: notify_design_lab
      notifyComments: notify_comments
      newsletterSubscribed: newsletter_subscribed
    }
  }
`

export const getDesignLabInfo = gql`
  query getDesignLabInfo($teamStoreId: String) {
    getDesignLabInfo {
      underMaintenance: under_maintenance
    }
    deliveryDate: getDeliveryDate(teamStoreId: $teamStoreId)
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
