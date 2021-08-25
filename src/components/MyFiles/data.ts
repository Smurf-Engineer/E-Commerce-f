/**
 * Account-MyFiles Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const imagesQuery = gql`
  query getFiles {
    images: getUserFiles {
      id
      fileUrl
      lowQuality: low_quality
    }
  }
`

export const deleteImageMutation = graphql(
  gql`
    mutation deleteImage($fileId: Int!) {
      deleteUserFile(fileId: $fileId) {
        message
      }
    }
  `,
  {
    name: 'deleteImage'
  }
)
