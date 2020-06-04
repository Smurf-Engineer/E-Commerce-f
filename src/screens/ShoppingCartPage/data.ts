/**
 * ShoppingCart Queries
 */
import gql from 'graphql-tag'

export const getTeamDesignTotal = gql`
  query getTeamDesignTotal($teamStoreItemId: String!) {
    getTeamDesignTotal(teamStoreItemId: $teamStoreItemId) {
      total
    }
  }
`
