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