import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const updateStylesOrderMutation = graphql(
  gql`
    mutation updateStyles($styles: [StyleToOrderInput]!, $themeId: Int) {
      updateStylesOrder(styles: $styles, themeId: $themeId) {
        message
      }
    }
  `,
  {
    name: 'updateStylesOrder'
  }
)
