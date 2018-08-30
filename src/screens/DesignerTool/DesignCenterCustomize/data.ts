/**
 * Designer Tool - Queries
 */

import gql from 'graphql-tag'

export const getProductFromCode = gql`
  query GetProductFromCode($code: String!) {
    product: productFromCode(code: $code) {
      id
      name
      obj
      mtl
      label
      bumpMap: bump_map
      flatlock
      binding {
        white
        black
      }
      zipper {
        white
        black
      }
      bibBrace {
        white
        black
      }
      themes {
        id
        name
        image
        styles {
          id
          name
          image
          branding
          brandingPng: branding_png
          colorblock1
          colorblock2
          colorblock3
          colorblock4
          colorblock5
          colors: colorsBlocks {
            id
            color
            image
          }
        }
      }
    }
  }
`
