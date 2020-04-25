/**
 * ShoppingCart Queries
 */
import gql from 'graphql-tag'

export const getTeamDesignTotal = gql`
  query getTeamDesignTotal($teamStoreItem: String!) {
    getTeamDesignTotal(teamStoreItem: $teamStoreItem) {
      total
    }
  }
`
