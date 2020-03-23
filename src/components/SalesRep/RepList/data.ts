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

export const changeRoleMutation = gql`
  mutation changeRoleUser($userId: Int!, $roleId: String!) {
    userResult: changeRoleUser(userId: $userId, roleId: $roleId) {
      id
      role
    }
  }
`
