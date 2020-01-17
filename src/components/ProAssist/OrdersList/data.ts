/**
 * OrdersList Queries
 */

import gql from 'graphql-tag'

export const getProAssistQuery = gql`
  query getProAssistList(
    $limit: Int
    $offset: Int
    $order: String
    $orderAs: String
    $searchText: String
  ) {
    proAssistQuery: getProAssistList(
      limit: $limit
      offset: $offset
      order: $order
      orderAs: $orderAs
      searchText: $searchText
    ) {
      fullCount
      proAssist {
        shortId: short_id
      }
    }
  }
`
