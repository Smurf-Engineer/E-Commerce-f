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

export const updateClipartMutation = gql`
  mutation UpdateClipart($id: Int!) {
    updateClipart(id: $id) {
      id
      url
      hidden
    }
  }
`
