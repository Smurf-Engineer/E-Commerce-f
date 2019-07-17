/**
 * TeamStoresList Queries
 */

import gql from 'graphql-tag'

export const GetTeamStoresQuery = gql`
  query GetTeamStoresList {
    teamStoresList {
      fullCount
      teamStores {
        id
        shortId: short_id
        name
        featured
        onDemand: on_demand_mode
        userFirstName: first_name
        userLastName: last_name
        cutOffDateString
      }
    }
  }
`
