/**
 * MenuSports queries
 */

import gql from 'graphql-tag'

export const categoriesQuery = gql`
  query categories($sportId: Int!) {
    categories: categoriesSport(sportId: $sportId) {
      id
      name
    }
    profileData: getUserProfile {
      reseller {
        status
        comission
        inline
      }
    }
  }
`