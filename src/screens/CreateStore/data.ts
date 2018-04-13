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
