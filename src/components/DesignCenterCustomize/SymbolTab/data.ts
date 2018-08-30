/**
 * ClipArt Queries
 */
import gql from 'graphql-tag'

export const clipArtsQuery = gql`
  query GetClipArts($query: String) {
    clipArts: getCliparts(query: $query) {
      id
      url
    }
  }
`
