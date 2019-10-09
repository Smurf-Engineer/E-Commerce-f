/**
 * TeamStoresAdmin Queries
 */

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const setTeamStoreFeaturedMutation = graphql(
  gql`
    mutation setFeaturedTeamStore($id: Int!) {
      featuredTeamStore: setFeaturedTeamStore(id: $id) {
        id
        shortId: short_id
        name
        featured
        onDemand: on_demand_mode
        userFirstName: first_name
        userLastName: last_name
        cutOffDateString
        display
      }
    }
  `,
  {
    name: 'setTeamStoreFeatured'
  }
)

export const setTeamStorePricesMutation = graphql(
  gql`
    mutation setTeamStorePrices($itemId: Int!, $prices: [ItemPriceInput]) {
      teamStorePrices: setTeamStorePrices(itemId: $itemId, prices: $prices) {
        message
      }
    }
  `,
  {
    name: 'setTeamStorePrices'
  }
)

export const setTeamStoreDisplayMutation = graphql(
  gql`
    mutation setTeamStoreDisplay($id: Int!) {
      displayTeamStore: setDisplayTeamStore(id: $id) {
        id
        shortId: short_id
        name
        featured
        onDemand: on_demand_mode
        userFirstName: first_name
        userLastName: last_name
        cutOffDateString
        display
      }
    }
  `,
  {
    name: 'setTeamStoreDisplay'
  }
)

export const createStoreMutation = graphql(
  gql`
    mutation createTeamStore($teamStore: TeamStoreInput!) {
      store: createTeamStore(teamStore: $teamStore, isAdmin: true) {
        shortId: short_id
      }
    }
  `,
  { name: 'createStore' }
)
