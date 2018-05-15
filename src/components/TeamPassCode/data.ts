import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getTeamStore = graphql(
  gql`
    mutation getTeamStore($teamStoreId: String!, $passCode: String) {
      getTeamStore(teamStoreId: $teamStoreId, passCode: $passCode) {
        id
      }
    }
  `,
  {
    name: 'getTeamStoreMutation'
  }
)
