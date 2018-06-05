// import { graphql } from 'react-apollo'
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
        height
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

// export const PlaceOrderMutation = graphql(
//   gql`
//     mutation charge($orderObj: OrderInput!) {
//       charge(order: $orderObj) {
//         id
//         short_id
//         created_at
//       }
//     }
//   `,
//   {
//     name: 'placeOrder'
//   }
// )
