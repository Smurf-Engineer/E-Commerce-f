import gql from 'graphql-tag'

export const GetColorPalettes = gql`
  query getProDesignPalettes {
    rows: getProDesignPalettes {
      id
      name
      primary: primary_color
      accent1: accent_1
      accent2: accent_2
      accent3: accent_3
      fromAdmin: from_admin
    }
  }
`

export const GetColorsQuery = gql`
  query GetColors {
    colorsResult: getColors {
      colors
    }
  }
`
