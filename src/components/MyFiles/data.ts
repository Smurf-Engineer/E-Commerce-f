/**
 * Account-MyFiles Queries
 */
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const deleteImageMutation = graphql(
  gql`
    mutation deleteImage($fileId: String!) {
      deleteUserFile(fileId: $fileId) {
        message
      }
    }
  `,
  {
    name: 'deleteImage'
  }
)
