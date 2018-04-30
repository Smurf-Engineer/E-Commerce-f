/**
 * CreateStore queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const createStoreMutation = graphql(
  gql`
    mutation createTeamStore($teamStore: TeamStoreInput!, $file: Upload) {
      store: createTeamStore(teamStore: $teamStore, file: $file) {
        shortId: short_id
      }
    }
  `,
  { name: 'createStore' }
)

export const GetTeamStoreQuery = gql`
  query GetTeamStore($teamstoreId: String!) {
    getTeamStore(teamStoreId: $teamstoreId) {
      id
      short_id
      name
      banner
      cutoff_date {
        day
        dayOrdinal
        month
        year
      }
      delivery_date {
        day
        dayOrdinal
        month
        year
      }
      private
      created_at
      items {
        id
        design_id
        design {
          id
          name
        }
      }
      on_demand_mode
      team_size_id
      teamSize {
        id
      }
      owner
    }
  }
`
