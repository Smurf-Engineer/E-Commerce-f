import gql from 'graphql-tag'

export const getColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      colors
      stitchingColors: stitching_colors
    }
  }
`

export const saveDesignConfigMutation = gql`
  mutation saveDesignConfig(
    $colors: InputColors
    $symbolsToHide: [String]
    $symbolsToAdd: [String]
    $fontsToUpdate: [InputFont]
    $fontsToAdd: [String]
  ) {
    saveDesignConfig(
      colors: $colors
      symbolsToHide: $symbolsToHide
      symbolsToAdd: $symbolsToAdd
      fontsToUpdate: $fontsToUpdate
      fontsToAdd: $fontsToAdd
    ) {
      message
    }
  }
`
