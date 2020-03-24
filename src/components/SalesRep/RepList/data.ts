/**
 * SalesRep Queries
 */

import gql from 'graphql-tag'

export const getRepUsers = gql`
  query getRepUsers($limit: Int, $offset: Int, $text: String) {
    repUsers: getRepUsers(limit: $limit, offset: $offset, searchText: $text) {
      fullCount
      users {
        id
        shortId: short_id
        firstName: first_name
        lastName: last_name
      }
    }
  }
`

export const addRepUserMutation = gql`
  mutation addRepUser($firstName: String!, $lastName: String!) {
    userResult: addRepUser(firstName: $firstName, lastName: $lastName) {
      id: short_id
    }
  }
`
