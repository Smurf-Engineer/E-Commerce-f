import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const saveProject = graphql(
  gql`
    mutation createProDesignProject($proDesignProject: ProDesignProjectInput!) {
      createProDesignProject(proDesignProject: $proDesignProject) {
        message
      }
    }
  `,
  {
    name: 'createProject'
  }
)

export const renameFile = graphql(
  gql`
    mutation renameFileName($id: Int, $value: String) {
      renameFileName(id: $id, value: $value) {
        message
      }
    }
  `,
  {
    name: 'renameFileName'
  }
)
