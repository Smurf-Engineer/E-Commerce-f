import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const getVariantsFromProduct = gql`
  query getVariants($id: Int!) {
    getVariants(id: $id) {
      id: short_id
      name
      icon
      default: is_default
      bumpMap: bumpmap
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

export const getPredyedColors = gql`
  query getPredyedColors($id: Int!) {
    getPredyedColors(id: $id) {
      id: short_id
      name
      code
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

export const getProductQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id, onlyActive: false) {
      id
      code
      yotpoId: yotpo_id
      name
    }
  }
`
