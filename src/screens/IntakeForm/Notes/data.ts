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

export const getUsers = gql`
  query GetUsersNameQuery($pattern: String!) {
    userSearch: getUserSearch(pattern: $pattern, limit: 50) {
      id
      name
      email
      shortId: short_id
    }
  }
`