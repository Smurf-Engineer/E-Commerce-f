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
        invoice
        invoiceTerms: invoice_terms
      }
    }
  }
`

export const getDesignLabInfo = gql`
  query getDesignLabInfo {
    getDesignLabInfo {
      underMaintenance: under_maintenance
    }
  }
`