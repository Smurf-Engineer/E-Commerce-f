import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const saveDesignName = graphql(
  gql`
    mutation saveDesign($design: DesignInput!, $colors: [String]!) {
      saveDesign(design: $design, colors: $colors) {
        id
        name
        shortId: short_id
        image
      }
    }
  `,
  {
    name: 'saveDesignNameMutation'
  }
)

export const saveDesignChanges = graphql(
  gql`
    mutation saveDesignAs(
      $designId: String!
      $designObj: DesignInput!
      $colors: [String]!
    ) {
      saveDesignAs(
        designId: $designId
        designObj: $designObj
        colors: $colors
      ) {
        message
      }
    }
  `,
  {
    name: 'saveDesignChangesMutation'
  }
)
