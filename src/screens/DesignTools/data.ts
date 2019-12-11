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

export const getColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      colors
      stitchingColors: stitching_colors
    }
  }
`

export const getFonts = gql`
  query GetFonts {
    fonts: getFonts {
      id
      family
      active
    }
  }
`

export const saveDesignConfigMutation = gql`
  mutation saveDesignConfig(
    $colors: Color[],
    $stitchingColors: Color[],
    $symbolsToHide: String[],
    $symbolsToAdd: Clipart[],
    $fontsToUpdate: Font[],
    $fontsToAdd: Font[]
  ) {
    saveDesignConfig(
      colors: $colors,
      stitchingColors: $stitchingColors,
      symbolsToHide: $symbolsToHide,
      symbolsToAdd: $symbolsToAdd,
      fontsToUpdate: $fontsToUpdate,
      fontsToAdd: $fontsToAdd
    ) {
      message
    }
  }
`
