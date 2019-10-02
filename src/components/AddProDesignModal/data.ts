/**
 * AddProDesignModal Queries
 */
import gql from 'graphql-tag'

export const getUsers = gql`
  query GetUsersNameQuery($pattern: String!) {
    getUserSearch(pattern: $pattern) {
      id
      name
      email
    }
  }
`
