/**
 * TeamStoresList Queries
 */

import gql from 'graphql-tag'

export const GetTeamStoresQuery = gql`
  query GetTeamStoresList(
    $limit: Int
    $offset: Int
    $order: String
    $orderAs: String
    $searchText: String
    $filter: String
    $filterText: String
    $startDate: String
    $endDate: String
  ) {
    teamStoresList(
      limit: $limit
      offset: $offset
      withPrivates: true
      onlyFeatured: false
      order: $order
      orderAs: $orderAs
      searchText: $searchText
      filter: $filter
      filterText: $filterText
      startDate: $startDate
      endDate: $endDate
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
        deliveryDate: deliveryDateString
        display
        accountManager {
          firstName: first_name
          lastName: last_name
        }
      }
    }
  }
`
