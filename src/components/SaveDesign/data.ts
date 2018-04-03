import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const saveDesignName = graphql(
  gql`
    mutation saveDesign($design: DesignInput!, $colors: [String]!) {
      saveDesign(design: $design, colors: $colors) {
        id
        name
        shortId: short_id
      }
    }
  `,
  {
    name: 'saveDesignNameMutation'
  }
)
