/**
 * CreateStore queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const createStoreMutation = graphql(
  gql`
    mutation createTeamStore($teamStore: TeamStoreInput!) {
      store: createTeamStore(teamStore: $teamStore) {
        shortId: short_id
      }
    }
  `,
  { name: 'createStore' }
)
