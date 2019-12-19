import gql from 'graphql-tag'

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

export const deleteThemeMutation = gql`
  mutation deleteTheme($id: Int!) {
    deleteTheme(themeId: $id) {
      message
    }
  }
`

export const deleteStyleMutation = gql`
  mutation deleteStyle($id: Int!) {
    deleteStyle(styleId: $id) {
      message
    }
  }
`
