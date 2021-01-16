/**
 * CreateStore queries
 */
import gql from 'graphql-tag'

export const userfilesQuery = gql`
  query GetUserFiles {
    images: getUserFiles {
      id
      fileUrl
      type
      size {
        width
        height
      }
      name: fileName
    }
  }
`