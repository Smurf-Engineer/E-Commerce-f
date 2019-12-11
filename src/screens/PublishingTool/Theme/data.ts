import gql from 'graphql-tag'

export const GetProductsByCodeQuery = gql`
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
        itemOrder: item_order
        styles {
          id
          name
          image
          width
          height
          branding
          brandingPng: branding_png
          colorblock1
          colorblock2
          colorblock3
          colorblock4
          colorblock5
          colorIdeas: inspiration {
            id
            name
            image
            colors
          }
          colors: colorsBlocks {
            id
            color
            image
          }
          itemOrder: item_order
          canvas
        }
      }
    }
  }
`
