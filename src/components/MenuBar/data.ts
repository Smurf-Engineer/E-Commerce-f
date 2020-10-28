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

export const profileDataQuery = gql`
  query profile {
    profileData: getUserProfile {
      userProfile {
        email
        affiliateEnabled: affiliate_enabled
      }
    }
  }
`
