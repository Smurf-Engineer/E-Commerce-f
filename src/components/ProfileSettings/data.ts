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
        heightSecond
        chest
        waist
        hips
        inseam
        shoulders
        neck
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
    regionsOptions: regions {
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
