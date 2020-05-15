/**
 * Products-ProductsList Queries
 */

import gql from 'graphql-tag'

export const getUserRolesQuery = gql`
  query getUserRolesQuery(
    $limit: Int
    $offset: Int
    $text: String
    $filter: String
  ) {
    getUsers(
      limit: $limit
      offset: $offset
      searchText: $text
      filter: $filter
      orderAs: "DESC"
      order: "id"
    ) {
      fullCount
      users {
        id
        shortId: short_id
        email
        firstName: first_name
        lastName: last_name
        socialMethod: social_method
        role
      }
    }
  }
`

export const getRoles = gql`
  query getRoles {
    roles: getRoles {
      id: short_id
      name
    }
  }
`

export const changeRoleMutation = gql`
  mutation changeRoleUser($userId: Int!, $roleId: String) {
    userResult: changeRoleUser(userId: $userId, roleId: $roleId) {
      id
      role
    }
  }
`
