import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const GetProductsByIdQuery = gql`
  query GetProductByID($code: String!) {
    productFromCode(code: $code) {
      id
      code
      modelSize: model_size
      mpn
      flatlock
      branding
      bibBrace {
        white
        black
      }
      binding {
        white
        black
      }
      zipper {
        white
        black
      }
      obj
      mtl
      bumpMap: bump_map
    }
  }
`

export const saveProDesignMutation = graphql(
  gql`
    mutation saveProDesign($design: ProDesignInput) {
      saveProDesign(design: $design) {
        message
      }
    }
  `,
  { name: 'saveDesign' }
)
