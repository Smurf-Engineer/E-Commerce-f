/**
 * TeamStoresList Queries
 */

import gql from 'graphql-tag'

export const GetDesigns = gql`
  query GetTeamStoresList(
    $limit: Int
    $offset: Int
    $order: String
    $orderAs: String
    $searchText: String
  ) {
    teamStoresList(
      limit: $limit
      offset: $offset
      withPrivates: true
      onlyFeatured: false
      order: $order
      orderAs: $orderAs
      searchText: $searchText
    ) {
      fullCount
      teamStores {
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
  }
`

export const GetTeamStoreQuery = gql`
  query GetTeamStore($teamStoreId: String!) {
    teamStore: getTeamStore(teamStoreId: $teamStoreId) {
      id
      shortId: short_id
      name
      banner
      featured
      ownerName: owner_name
      userId: user_id
      startDate: cutOffDateString
      endDate: deliveryDateString
      privateStore: private
      created_at
      items {
        id
        visible
        design_id
        totalOrders
        priceRange {
          price
          shortName: short_name
          quantity
          abbreviation
        }
        design {
          id
          code
          image
          name
          shortId: short_id
          product {
            id
            type: name
            description
            shortDescription: short_description
            yotpoId: yotpo_id
            priceRange {
              quantity
              price
              abbreviation
              shortName: short_name
            }
          }
        }
      }
      onDemand: on_demand_mode
      teamSize {
        id
        size
      }
      owner
    }
  }
`
