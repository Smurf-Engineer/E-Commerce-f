/**
 * ClipArt Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const clipArtsQuery = graphql(gql`
  query GetClipArts {
    clipArts: getCliparts {
      id
      url
    }
  }
`)
