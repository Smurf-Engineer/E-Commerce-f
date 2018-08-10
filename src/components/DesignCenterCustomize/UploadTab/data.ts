/**
 * Upload Tools
 */
import { graphql } from 'react-apollo'
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
    }
  }
`

export const deleteFileMutation = graphql(
  gql`
    mutation deleteImage($fileId: Int!) {
      deleteUserFile(fileId: $fileId) {
        message
      }
    }
  `,
  {
    name: 'deleteFile'
  }
)
