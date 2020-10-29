import gql from 'graphql-tag'

export const profileSettingsQuery = gql`
  query profile {
    profileData: getUserProfile {
      reseller {
        status
      }
    }
  }
`