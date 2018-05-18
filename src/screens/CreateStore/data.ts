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
  query GetTeamStore($teamStoreId: String!) {
    teamStore: getTeamStore(teamStoreId: $teamStoreId) {
      id
      shortId: short_id
      name
      banner
      startDate: cutOffDateString
      endDate: deliveryDateString
      privateStore: private
      created_at
      items {
        id
        desigId: design_id
        design {
          id
          name
        }
      }
      onDemand: on_demand_mode
      teamSize {
        id
        size
      }
      owner
    }
  }
`
