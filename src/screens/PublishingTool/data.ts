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

export const getColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      colors
      stitchingColors: stitching_colors
    }
  }
`

export const uploadThumbnailMutation = gql`
  mutation SaveStyleImage($image: String!) {
    style: saveStyleImage(image: $image) {
      image
    }
  }
`

export const saveDesignMutation = gql`
  mutation SaveStyle($design: StyleCreation!) {
    design: newProductStyles(styleCreationData: $design) {
      message
      product {
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
  }
`

export const deleteInspirationMutation = gql`
  mutation deleteInspiration($id: Int!) {
    deleteInspiration(id: $id) {
      message
    }
  }
`
