/**
 * TeamStoreDetails Queries
 */

import gql from 'graphql-tag'

export const getTeamStoreQuery = gql`
  query GetTeamStore($teamStoreId: String!) {
    teamStoreQuery: getTeamStoreAdmin(teamStoreId: $teamStoreId) {
      id
      shortId: short_id
      onDemandMode: on_demand_mode
      banner
      private
      createdAd: created_at
      managerName: user_name
      name
      email
      featured
      teamstoreType: teamstore_type
    }
  }
`
