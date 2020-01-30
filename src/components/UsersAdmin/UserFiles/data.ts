/**
 * UserFiles
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const userfilesQuery = gql`
  query GetAdminUserFiles($userId: String) {
    userFiles: getAdminUserFiles(userId: $userId) {
      userName
      images {
        id
        fileUrl
        type
        size {
          width
          height
        }
      }
    }
  }
`

export const deleteFileMutation = graphql(
  gql`
    mutation deleteUserFileAdmin($fileId: Int!) {
      deleteUserFileAdmin(fileId: $fileId) {
        message
      }
    }
  `,
  {
    name: 'deleteFile'
  }
)
