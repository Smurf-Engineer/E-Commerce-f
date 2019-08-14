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
