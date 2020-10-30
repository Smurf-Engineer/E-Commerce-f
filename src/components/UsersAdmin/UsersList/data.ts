/**
 * UsersList Queries
 */

import gql from 'graphql-tag'

export const getUsersQuery = gql`
  query getUsers(
    $limit: Int
    $offset: Int
    $order: String
    $orderAs: String
    $searchText: String
    $isAffiliate: Boolean
    $isReseller: Boolean
  ) {
    usersQuery: getUsers(
      limit: $limit
      offset: $offset
      order: $order
      orderAs: $orderAs
      searchText: $searchText
      isAffiliate: $isAffiliate
      isReseller: $isReseller
    ) {
      fullCount
      users {
        id
        email
        firstName: first_name
        lastName: last_name
        socialMethod: social_method
        administrator
        netsuiteId: netsuite_internal
        affiliateId: affiliate_id
        createdAt: created_at
        shortId: short_id
        salesRep {
          shortId: short_id
          firstName: first_name
          lastName: last_name
        }
        accountManager {
          shortId: short_id
          firstName: first_name
          lastName: last_name
        }
      }
    }
  }
`

export const getRepUsers = gql`
  query getRepUsers($text: String) {
    repUsers: getRepUsers(searchText: $text) {
      users {
        id
        shortId: short_id
        firstName: first_name
        lastName: last_name
      }
    }
  }
`

export const getManagers = gql`
  query getManagers($searchText: String) {
    managersQuery: getManagers(searchText: $searchText) {
      id
      shortId: short_id
      firstName: first_name
      lastName: last_name
    }
  }
`
