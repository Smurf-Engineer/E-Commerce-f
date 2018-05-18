import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const GetTeamMyStoresQuery = gql`
  query MyTeamStoresList {
    myTeamstores {
      teamStores {
        id
        shortId: short_id
        name
        banner
      }
    }
  }
`

export const DeleteTeamStoreMutation = graphql(
  gql`
    mutation deleteTeamStore($id: String!) {
      deleteTeamStore(teamStoreId: $id) {
        message
      }
    }
  `,
  {
    name: 'deleteTeamStore'
  }
)
