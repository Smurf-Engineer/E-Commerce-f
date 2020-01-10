/**
 * ClipArt Queries
 */
import gql from 'graphql-tag'

export const clipArtsQuery = gql`
  query GetAdminClipArts($query: String) {
    clipArts: getAdminCliparts(query: $query) {
      id
      url
      hidden
    }
  }
`
