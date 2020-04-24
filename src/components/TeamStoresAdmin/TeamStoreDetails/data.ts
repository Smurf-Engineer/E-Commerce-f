/**
 * TeamStoreDetails Queries
 */

import gql from 'graphql-tag'

export const getTeamStoreQuery = gql`
  query GetTeamStore($teamStoreId: String!) {
    teamStore: getTeamStoreAdmin(teamStoreId: $teamStoreId) {
      id
      shortId: short_id
      onDemand: on_demand_mode
      banner
      private
      createdAd: created_at
      managerName: user_name
      name
      email
      featured
      teamstoreType: teamstore_type
      cutoffDate: cutOffDateString
      deliveryDate: deliveryDateString
      items {
        id
        priceRange {
          price
          shortName: short_name
          quantity
          abbreviation
        }
        design {
          name
          image
          product {
            name
            description: short_description
          }
        }
      }
    }
    currencies: getCurrencies {
      id
      shortName: short_name
    }
  }
`
