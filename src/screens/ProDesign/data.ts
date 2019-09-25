import gql from 'graphql-tag'

export const GetProductsByIdQuery = gql`
  query GetProductByID($id: Int!) {
    product(id: $id) {
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
