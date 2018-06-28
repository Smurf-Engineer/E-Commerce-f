/**
 * ClipArt Queries
 */
import { graphql } from 'graphql'
import gql from 'graphql-tag'

export const clipArtsQuery = graphql(gql`
  query GetClipArts {
    getCliparts {
      id
      url
    }
  }
`)
