import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const GetTeamMyStoresQuery = gql`
  query MyTeamStoresList($limit: Int, $offset: Int) {
    myTeamstores(limit: $limit, offset: $offset) {
      teamStores {
        id
        shortId: short_id
        name
        banner
        closed
        isOnDemand: on_demand_mode
        fixedPrice: fixed_price
      }
      fullCount
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
