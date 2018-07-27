/**
 * Account-MyFiles-Images Queries
 */
import gql from 'graphql-tag'

export const imagesQuery = gql`
  query getFiles {
    images: getUserFiles {
      id
      fileUrl
    }
  }
`
