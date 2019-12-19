/**
 * Theme Modal queries
 */
import gql from 'graphql-tag'

export const addDesignMutation = gql`
  mutation AddDesign($design: StyleInput!) {
    theme: addDesign(designData: $design) {
      id
      name
      image
    }
  }
`
