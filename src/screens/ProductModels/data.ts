import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getVariantsFromProduct = gql`
  query getVariants($id: Int!) {
    getVariants(id: $id) {
      id: short_id
      name
      icon
      default: is_default
      bumpmap
      obj
      label
      mtl
      branding
      flatlock
      bibraceWhite: bibrace_white
      bibraceBlack: bibrace_black
      zipperWhite: zipper_white
      zipperBlack: zipper_black
      bindingWhite: binding_white
      bindingBlack: binding_black
    }
  }
`

export const saveProductsMutation = graphql(
  gql`
    mutation saveProductModels(
      $variants: [InputModelVariant]
      $productId: Int
    ) {
      saveProductModels(variants: $variants, productId: $productId) {
        message
      }
    }
  `,
  { name: 'saveProductModels' }
)
