/**
 * InternalsList Queries
 */

import gql from 'graphql-tag'

export const getProductInternalsQuery = gql`
  query getProductInternals(
    $limit: Int
    $offset: Int
    $order: String
    $orderAs: String
    $searchText: String
  ) {
    productInternalsQuery: getProductInternals(
      limit: $limit
      offset: $offset
      order: $order
      orderAs: $orderAs
      searchText: $searchText
    ) {
      fullCount
      internals {
        id
        internalId: internal_id
        productCode: product_code
        gender
        size
        fitStyle: fit_style
        color
        frontZipper: front_zipper
        pocketZipper: pocket_zipper
        binding
        bibBrace: bib_brace
        collection
      }
    }
  }
`
