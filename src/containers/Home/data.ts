/**
 * Data query
 */

import gql from 'graphql-tag'

export const usersQuery = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`
