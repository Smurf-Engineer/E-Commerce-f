import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      userProfile {
        firstName: first_name
        lastName: last_name
        email
        phone
      }
      affiliate {
        status
        paypalAccount: paypal_account
      }
      reseller {
        status
        comission
        inline
        file
        activatedAt: activated_at
      }
      languageSettings: userRegionOptions {
        region {
          id
          name
          icon
          code
        }
        language {
          id
          name
          short_name
        }
        currency {
          id
          name
          short_name
          abbreviation
        }
      }
      measurementSettings: userMeasurementsOptions {
        weight
        heightFirst: height
        heightSecond: height_s
        chest
        waist
        hips
        inseam
        shoulders
        neck
        msrmntSystemSelected: system
        msrmntGenderSelected: gender
      }
      smsSettings: smsPreferences {
        orderConfirmation
        desingUpdates
      }
      emailSettings: emailPreferences {
        newsletter
      }
    }
  }
`

export const regionsQuery = gql`
  query regions {
    regions {
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

export const UpdateMeasurementsMutation = graphql(
  gql`
    mutation updateMeasurements($userMeasurements: UserMeasurementsData!) {
      setMeasurementOptions(userMeasurements: $userMeasurements) {
        message
      }
    }
  `,
  {
    name: 'updateMeasurements'
  }
)

export const UpdateRegionOptionsMutation = graphql(
  gql`
    mutation updateRegionOptions($userRegion: UserRegionData!) {
      setRegionOptions(userRegion: $userRegion) {
        message
      }
    }
  `,
  {
    name: 'updateRegionOptions'
  }
)

export const UpdateUserProfileOptionsMutation = graphql(
  gql`
    mutation updateProfile($userData: UserProfile!) {
      updateUserProfile(userData: $userData) {
        message
      }
    }
  `,
  {
    name: 'updateUserProfile'
  }
)

export const UpdateSmsOptionsMutation = graphql(
  gql`
    mutation updateSmsOptions($smsOptions: SmsOptionInput!) {
      setSmsOption(smsOptions: $smsOptions) {
        message
      }
    }
  `,
  {
    name: 'updateSmsOptions'
  }
)

export const UpdateEmailOptionsMutation = graphql(
  gql`
    mutation updateEmailOptions($subscribed: Boolean!) {
      updateEmailSubscription(subscribed: $subscribed) {
        message
      }
    }
  `,
  {
    name: 'updateEmailOptions'
  }
)

export const ChangePasswordMutation = graphql(
  gql`
    mutation changePassword($currentPassword: String!, $password: String!) {
      changePassword(currentPassword: $currentPassword, password: $password) {
        message
      }
    }
  `,
  {
    name: 'changePassword'
  }
)

export const sendAffiliateMutation = graphql(
  gql`
    mutation sendAffiliateRequest($currency: String!, $file: String!) {
      sendAffiliateRequest(currency: $currency, file: $file) {
        status
      }
    }
  `,
  {
    name: 'sendAffiliateRequest'
  }
)

export const linkPaypalAccountMutation = graphql(
  gql`
    mutation linkPaypalAccount($code: String!) {
      linkPaypalAccount(code: $code) {
        status
        paypalAccount: paypal_account
      }
    }
  `,
  {
    name: 'linkPaypalAccount'
  }
)
