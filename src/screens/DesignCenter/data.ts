/**
 * DesignCenter Product
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const getProductQuery = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      name
    }
  }
`

export const addTeamStoreItemMutation = graphql(
  gql`
    mutation AddTeamStore(
      $teamStoreItem: TeamStoreItem!
      $teamStoreId: string!
    ) {
      addTeamStoreItem(teamStoreItem: teamStoreItem, teamStoreId: teamStoreId) {
        message
      }
    }
  `,
  { name: 'addItemToStore' }
)
